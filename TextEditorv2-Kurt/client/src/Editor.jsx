// Importing icons from Material UI for various functionalities
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
// Importing components and hooks from Material UI
import { Box, Button, Stack, Typography } from "@mui/material";
// Importing hooks from React
import { useCallback, useRef, useState } from "react";
// Importing components and functions from mui-tiptap
import { LinkBubbleMenu, MenuButton, RichTextEditor, RichTextReadOnly, TableBubbleMenu, insertImages, } from "mui-tiptap";
// Importing custom components and hooks
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtentions";

// Example content for the editor
const exampleContent = `<h1>Hey there</h1><hr><p>This is a <em>basic</em> example of a <code>post</code>, which uses <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> 
with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> 
of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="1" data-label="Kurt Baybay">@Kurt Baybay</span> mentions and lists:</p>
<ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: rgb(255, 153, 0)">But wait, </span>
<span style="color: rgb(64, 49, 1)"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong></p><p></p><p>That’s only the tip of the iceberg. 
Feel free to add and resize images:</p><img height="auto" style="text-align: center; aspect-ratio: 1.5 / 1" src="../src/assets/bliss.jpg" alt="bliss.jpg" width="584"><p style="text-align: center">
<sup>(this is an image you probably recognize)</sup></p><p>Organize information in tables:</p><table style="minWidth: 141px"><colgroup><col><col><col style="width: 91px"></colgroup><tbody><tr>
<th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1" colwidth="91"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Kurt</p></td>
<td colspan="1" rowspan="1"><p>Front end</p></td><td colspan="1" rowspan="1" colwidth="91"><p>Versatily</p></td></tr><tr><td colspan="1" rowspan="1"><p>Ian</p></td><td colspan="1" rowspan="1">
<p>Back end</p></td><td colspan="1" rowspan="1" colwidth="91"><p>Versatily</p></td></tr></tbody></table><p></p><p>Or write down your things to do:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem">
<label><input type="checkbox" checked="checked"><span></span></label><div><p>Develop</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Exercise</p></div></li>
<li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><s>Sleep</s></p></div></li></ul><blockquote><p>This is made by the developers of Versatily. Good work! 👏</p>
<p><span data-type="mention" data-id="0" data-label="Kurt Baybay">@Kurt Baybay</span> </p><p><span data-type="mention" data-id="1" data-label="Ian De Guzman">@Ian De Guzman</span> </p><p><span data-type="mention" data-id="3" 
data-label="Argie Delgado">@Argie Delgado</span> </p><p><span data-type="mention" data-id="4" data-label="Christopher Fegalan">@Christopher Fegalan</span> </p><p><span data-type="mention" data-id="5" 
data-label="Fernando Villanueva">@Fernando Villanueva</span> </p></blockquote><p>Give it a try and click around!</p>`;

// Function to filter image files from a FileList
function fileListToImageFiles(fileList) {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

// Main editor component
function Editor() {
  // Using the custom hook to get editor extensions
  const extensions = useExtensions({ placeholder: "Add your own content here...",});
  // Reference to the Rich Text Editor
  const rteRef = useRef(null);
  // State to manage editability of the editor
  const [isEditable, setIsEditable] = useState(true);
  // State to manage visibility of the menu bar
  const [showMenuBar, setShowMenuBar] = useState(true);
  // State to manage submitted content
  const [submittedContent, setSubmittedContent] = useState("");

  // Handler for inserting new image files
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
    []
  );

  // Handler for image drop events
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

  // Handler for image paste events
  const handlePaste = useCallback(
    (_view, event, _slice) => {
      if (!event.clipboardData) {
        return false;
      }

      const pastedImageFiles = fileListToImageFiles(
        event.clipboardData.files
      );
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
        body: JSON.stringify({ content }),
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
            footer: (
              <Stack direction="row" spacing={2} sx={{ borderTopStyle: "solid", borderTopWidth: 1, borderTopColor: (theme) => theme.palette.divider, py: 1, px: 1.5 }}>
                <MenuButton value="formatting" tooltipLabel={showMenuBar ? "Hide formatting" : "Show formatting"} size="small" onClick={() => setShowMenuBar((currentState) => !currentState)} selected={showMenuBar} IconComponent={TextFields} />
                <MenuButton value="formatting" tooltipLabel={isEditable ? "Prevent edits (use read-only mode)" : "Allow edits"} size="small" onClick={() => setIsEditable((currentState) => !currentState)} selected={!isEditable} IconComponent={isEditable ? Lock : LockOpen} />
                <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
              </Stack>
            ),
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