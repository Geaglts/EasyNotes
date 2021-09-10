import { useContext } from 'react';

import '../styles/Components/Note.scss';

import { Note as NoteType } from '../types';

import { Context } from '../Context';
import Button from './Button';

import { noteStorage } from '../storage';

function Note({ content, title, _id = '' }: NoteType) {
  const { updateNotes } = useContext(Context);

  const handleDelete = () => {
    noteStorage.remove(_id);
    updateNotes();
  };

  const handleCopy = () => {
    noteStorage.copy({ title, content });
  };

  return (
    <div className="Note">
      <div className="Note__Header">
        <p className="Note__Header--title">{title}</p>
        <div className="Note__Header--buttons">
          <Button
            label="Delete"
            onClick={handleDelete}
            style={{ color: '#FFDF75', backgroundColor: '#ED4747', width: 100 }}
          />
          <Button
            label="Copy"
            onClick={handleCopy}
            style={{ color: '#FFDF75', backgroundColor: '#475DED', width: 100 }}
          />
        </div>
      </div>
      <div className="Note__Content">
        {content.split('\n').map((line, index) => {
          return (
            <p className="Note__Content--text" key={index}>
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Note;
