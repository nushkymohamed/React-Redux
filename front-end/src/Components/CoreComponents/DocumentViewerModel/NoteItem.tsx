import React, { FC } from 'react';
import { Note } from '../../../redux/viewDocument/viewDocumentReducer';

type NoteItemProps = {
  note: Note;
};

const NoteItem: FC<NoteItemProps> = ({ note: { createdDate, text } }) => {
  return (
    <div className="documentPopUp__section--note">
      <div className="documentPopUp__section--note-date">
        {createdDate ? new Date(createdDate).toLocaleDateString() : null}
      </div>
      <div className="documentPopUp__section--note-content">{text}</div>
    </div>
  );
};

export default NoteItem;
