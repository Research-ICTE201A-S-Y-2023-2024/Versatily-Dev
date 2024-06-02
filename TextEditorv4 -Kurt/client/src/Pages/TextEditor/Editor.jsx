import React, { useCallback } from "react";
import { Box, Button, Stack, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { LinkBubbleMenu, RichTextEditor, RichTextReadOnly, TableBubbleMenu, insertImages } from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

const exampleContent = `<h1><strong>This is a sample title!</strong></h1><hr><p>This is a sample content.</p>`;

function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

function Editor({ isEditable, showMenuBar, submittedContent, setSubmittedContent, rteRef, selectedTag, setSelectedTag }) {
  const extensions = useExtensions({ placeholder: "Add your own content here..." });

  const handleNewImageFiles = useCallback(
    (files, insertPosition) => {
      if (!rteRef.current?.editor) {
        return;
      }

      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        insertPosition,
      });
    },
    [rteRef]
  );

  const handleDrop = useCallback(
    (view, event, _slice, _moved) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) {
        return false;
      }

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        const insertPosition = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        handleNewImageFiles(imageFiles, insertPosition);

        event.preventDefault();
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  const handlePaste = useCallback(
    (_view, event, _slice) => {
      if (!event.clipboardData) {
        return false;
      }

      const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
      if (pastedImageFiles.length > 0) {
        handleNewImageFiles(pastedImageFiles);
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  const handleSave = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";
    setSubmittedContent(content);

    try {
      const response = await fetch("http://localhost:3001/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, tag: selectedTag }),
      });

      if (response.ok) {
        console.log("Content saved successfully");
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <>
      <Box sx={{ "& .ProseMirror": { "& h1, & h2, & h3, & h4, & h5, & h6": { scrollMarginTop: showMenuBar ? 50 : 0 } } }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tag</InputLabel>
        </FormControl>
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={exampleContent}
          editable={isEditable}
          editorProps={{ handleDrop: handleDrop, handlePaste: handlePaste }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: { hide: !showMenuBar },
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
      <Typography variant="h5" sx={{ mt: 5 }}>Saved result:</Typography>
      {submittedContent ? (
        <>
          <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
            <code>{submittedContent}</code>
          </pre>
          <Box mt={3}>
            <Typography variant="overline" sx={{ mb: 2 }}>Read-only saved snapshot:</Typography>
            <RichTextReadOnly content={submittedContent} extensions={extensions} />
          </Box>
        </>
      ) : (
        <>Press “Save” above to show the HTML markup for the editor content. Typically you’d use a similar <code>editor.getHTML()</code> approach to save your data in a form.</>
      )}
    </>
  );
}

export default Editor;
