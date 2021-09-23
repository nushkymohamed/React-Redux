import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Note } from '../../../redux/viewDocument/viewDocumentReducer';
import ButtonWithAnimation from '../../ButtonWithAnimation/ButtonWithAnimation';
import NoteItem from './NoteItem';

interface propsType {
  notes: Note[];
  saveNote: (text: string) => void;
  submitLoading: boolean;
}
const NotesComponent: FC<propsType> = ({ notes, saveNote, submitLoading }) => {
  const { t } = useTranslation();

  const [noteText, setNoteText] = useState('');

  const onSubmitClick = () => {
    noteText && saveNote(noteText);
    setNoteText('');
  };

  return (
    <div className="documentPopUp__container">
      <h4>{t('Notes')}</h4>
      <div className="documentPopUp__section notes">
        <div className="documentPopUp__content">
          <div className="documentPopUp__section--title">
            <h3>{t('Notes')}</h3>
          </div>
          <div className="documentPopUp__section--body">
            <div className="documentPopUp__section--textInputArea">
              <textarea
                placeholder="Type here..."
                onChange={e => setNoteText(e.target.value)}
                value={noteText}
              ></textarea>
              {submitLoading ? (
                <ButtonWithAnimation
                  onTransitionEnd={() => {}}
                  animationClassName="btn btn--primary btn--loader active"
                />
              ) : (
                <button
                  className={`btn btn--primary ${
                    submitLoading ? 'disable' : ''
                  }`}
                  type="button"
                  onClick={onSubmitClick}
                  disabled={submitLoading}
                >
                  {t('Submit')}
                </button>
              )}
            </div>
            <div className="documentPopUp__section--notes">
              {notes.map((note, index) => (
                <NoteItem note={note} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotesComponent;
