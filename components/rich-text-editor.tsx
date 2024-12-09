// "use client";
// import "./tiptab.css";
// import dynamic from "next/dynamic";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { MenuBar } from "./text-editor/nav-menu";

// const Tiptap = ({
//   description,
//   onChange,
// }: {
//   description: string;
//   onChange: (richText: string) => void;
// }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         orderedList: { HTMLAttributes: { class: "list-decimal pl-4" } },
//         bulletList: { HTMLAttributes: { class: "list-disc pl-4" } },
//       }),

//     ],
//     content: description,
//     editorProps: {
//       attributes: {
//         className:
//           "min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto",
//       },
//     },
//     onUpdate({ editor }) {
//       onChange(editor.getHTML());
//     },
//   });

//   return (
//     <div className="flex flex-col justify-stretch min-h-[250px]">
//       {editor && <MenuBar editor={editor} />}
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(Tiptap), { ssr: false });
"use client";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading1,
  Heading3,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import dynamic from "next/dynamic";
const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-h-[150px] text-black  w-full rounded-md mb-1 border border-input bg-transparent px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        HTMLAttributes: { class: "text-xl" },
        levels: [2],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border border-input bg-transparent rounded-t-md  p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className=" size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
export default dynamic(() => Promise.resolve(RichTextEditor), { ssr: false });
