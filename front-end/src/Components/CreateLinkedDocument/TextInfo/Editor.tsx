import React, { FC } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface editorProps {
  output: (arg: string) => void;
  modules?: any;
}

const Editor: FC<editorProps> = ({ output, modules }) => {
  const defaultModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['blockquote'],
    ],
  };

  const onHandle = (text: string) => {
    output(text);
  };

  return (
    <div>
      <ReactQuill
        onChange={onHandle}
        theme="snow"
        modules={modules ? modules : defaultModules}
      />
    </div>
  );
};

export default Editor;
