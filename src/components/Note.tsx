import { Note as NoteType } from '../types';
import '../styles/Components/Note.scss';
import Button from './Button';

function Note({ content, title }: NoteType) {
  return (
    <div className="Note">
      <div className="Note__Header">
        <p className="Note__Header--title">{title}</p>
        <Button label="Copy" />
      </div>
      <div className="Note__Content">
        <p className="Note__Content--text">{content}</p>
      </div>
    </div>
  );
}

export default Note;
