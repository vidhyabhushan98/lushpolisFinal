import ReactQuill from "react-quill";
import { useRef,useEffect } from "react";

import "react-quill/dist/quill.snow.css";

export default function Editor({value,onChange }) {
  const quillRef = useRef(null);
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      ['link', 'image'],
      ['clean']   
    ],
  };
  return (
    <div className="content">
      <ReactQuill
        quillRef={quillRef}
        value={value}
        theme="snow"
        onChange={onChange}
        placeholder="Write something awesome..."
        modules={modules}
      />
    </div>
  );
}