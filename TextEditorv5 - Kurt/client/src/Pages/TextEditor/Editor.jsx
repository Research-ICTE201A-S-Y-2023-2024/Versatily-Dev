import React, { useCallback } from "react";
import { Box, Typography, TextField, FormControl } from "@mui/material";
import { LinkBubbleMenu, RichTextEditor, RichTextReadOnly, TableBubbleMenu, insertImages } from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

const exampleContent = `<h1><strong>This is a sample heading!</strong></h1><hr><p>This is a sample content.</p>`;

function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

function Editor({ isEditable, showMenuBar, submittedContent, setSubmittedContent, rteRef, title, setTitle, selectedTag, setSelectedTag }) {
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

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        {/* What i am referring to */}
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Post Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Instead of this being a text field, lets just use a drop down menu to specify */}
        <TextField
          margin="dense"
          id="tag"
          label="Post Tag"
          type="text"
          fullWidth
          variant="standard"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        />
      </FormControl>
      <Box sx={{ "& .ProseMirror": { "& h1, & h2, & h3, & h4, & h5, & h6": { scrollMarginTop: showMenuBar ? 50 : 0 } } }}>
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
