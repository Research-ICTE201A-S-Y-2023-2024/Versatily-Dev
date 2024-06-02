import React, { useCallback, useState } from "react";
import { Box, Typography, TextField, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { LinkBubbleMenu, RichTextEditor, RichTextReadOnly, TableBubbleMenu, insertImages } from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";
import { EditorContent, useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';


// Custom Document with Heading and Paragraph
const CustomDocument = Document.extend({
  content: 'heading paragraph+',
});

// main template of the text editor
const exampleContent = `<h1><strong>Lorem ipsum </strong></h1><hr><p><strong>Lorem ipsum </strong>dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Metus aliquam eleifend mi in nulla posuere sollicitudin. Tortor at auctor urna nunc id cursus. A scelerisque purus semper eget duis. Leo urna molestie at elementum eu facilisis. Arcu vitae elementum curabitur vitae 
nunc sed velit dignissim. At augue eget arcu dictum varius duis. Quisque non tellus orci ac auctor. Senectus et netus et malesuada fames ac turpis egestas. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. 
Malesuada pellentesque elit eget gravida cum sociis natoque. In dictum non consectetur a erat nam at. Massa id neque aliquam vestibulum morbi blandit cursus risus. Pretium lectus quam id leo in vitae. Volutpat diam ut venenatis 
tellus in metus vulputate eu scelerisque. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Senectus et netus et malesuada fames ac turpis. Egestas egestas fringilla phasellus faucibus scelerisque. 
Mattis vulputate enim nulla aliquet. Lacus sed viverra tellus in hac habitasse platea.</p><p style="text-align: start">Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Ac orci phasellus egestas tellus rutrum 
tellus. Turpis massa tincidunt dui ut. Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Purus in massa tempor nec. Ante metus dictum at tempor commodo. Tristique magna sit amet purus 
gravida quis blandit. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.
 Nibh ipsum consequat nisl vel pretium lectus. Egestas erat imperdiet sed euismod nisi. Sed risus ultricies tristique nulla aliquet enim tortor at auctor. Risus viverra adipiscing at in tellus integer. 
 Vestibulum sed arcu non odio euismod lacinia at quis risus. Quam quisque id diam vel. Eget egestas purus viverra accumsan in nisl nisi scelerisque. 
 Facilisi etiam dignissim diam quis enim lobortis.</p><p style="text-align: start">Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor.
  Eget lorem dolor sed viverra ipsum nunc. Viverra nam libero justo laoreet sit. Viverra nam libero justo laoreet sit amet cursus sit amet. Gravida neque convallis a cras semper auctor neque vitae. 
  Dolor purus non enim praesent elementum facilisis. Eu ultrices vitae auctor eu augue ut lectus arcu. Ullamcorper a lacus vestibulum sed. Tempus iaculis urna id volutpat. 
  Massa massa ultricies mi quis hendrerit dolor magna eget est. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Et malesuada fames ac turpis egestas sed tempus. 
  Lobortis feugiat vivamus at augue eget arcu dictum.</p><p style="text-align: start">Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Enim nunc faucibus a pellentesque. 
  Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Ullamcorper morbi tincidunt ornare massa eget egestas. Viverra nam libero justo laoreet sit amet. 
  Posuere sollicitudin aliquam ultrices sagittis. Habitant morbi tristique senectus et netus et malesuada. Quam nulla porttitor massa id neque aliquam. At quis risus sed vulputate odio. 
  Sociis natoque penatibus et magnis dis parturient montes nascetur. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Dui nunc mattis enim ut. Turpis massa tincidunt dui ut ornare lectus sit. 
  Diam in arcu cursus euismod quis viverra nibh cras pulvinar.</p><p style="text-align: start">Ultrices eros in cursus turpis massa. Orci nulla pellentesque dignissim enim sit amet venenatis. Gravida rutrum quisque non 
  tellus orci. Dolor sed viverra ipsum nunc. Accumsan lacus vel facilisis volutpat est velit egestas dui. Ac ut consequat semper viverra nam libero. Tincidunt arcu non sodales neque sodales ut etiam sit. 
  Placerat duis ultricies lacus sed turpis tincidunt id. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Vitae suscipit tellus mauris a diam maecenas sed. Nulla facilisi nullam vehicula ipsum.</p>`;

function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

function Editor({ isEditable, showMenuBar, submittedContent, setSubmittedContent, rteRef, title, setTitle, selectedTag, setSelectedTag }) {
  // Add it here 
  const extensions = useExtensions({ placeholder: "Add your own content here..." });
  // add other tags here
  const [tags] = useState(["Food", "Drink", "Post"]);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Paragraph,
      Text,
      Heading,
    ],
    content: exampleContent,
    editable: isEditable,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setSubmittedContent(content);
    },
  });

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
        <FormControl fullWidth margin="dense">
          <InputLabel id="tag-label">Post Tag</InputLabel>
          <Select
            labelId="tag-label"
            id="tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            label="Post Tag"
            variant="standard"
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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