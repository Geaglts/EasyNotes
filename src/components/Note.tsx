import { Note as NoteType } from '../types';
import '../styles/Components/Note.scss';
import Button from './Button';

function Note({ content, title }: NoteType) {
  return (
    <div className="Note">
      <div className="Note__Header">
        <p className="Note__Header--title">{title}</p>
        <div className="Note__Header--buttons">
          <Button
            label="Delete"
            style={{ color: '#FFDF75', backgroundColor: '#ED4747', width: 100 }}
          />
          <Button
            label="Copy"
            style={{ color: '#FFDF75', backgroundColor: '#475DED', width: 100 }}
          />
        </div>
      </div>
      <div className="Note__Content">
        <p className="Note__Content--text">{content}</p>
      </div>
    </div>
  );
}

export default Note;
