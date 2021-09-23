import { connect } from 'react-redux';
import { useContext } from 'react';
// redux
import { removeNote } from '../redux/actions/NotesActions';

import '../styles/Components/Note.scss';

import { RenderCss } from '../types';

import { Context } from '../Context';
import Button from './Button';

import { noteStorage } from '../storage';

interface NoteProps {
  content?: string;
  title?: string;
  _id?: string;
  removeNote?: (id: string) => void;
}

function Note({ content = '', title = '', _id = '', removeNote }: NoteProps) {
  const { darkTheme } = useContext(Context);

  const handleDelete = () => {
    if (removeNote) removeNote(_id);
  };

  const handleCopy = () => {
    noteStorage.copy({ title, content });
  };

  return (
    <div className={`Note ${darkTheme ? 'NoteDark' : ''}`}>
      <div className="Note__Header">
        <p className="Note__Header--title">{title}</p>
        <div className="Note__Header--buttons">
          <Button
            label="Delete"
            onClick={handleDelete}
            style={deleteButtonStyles(darkTheme)}
          />
          <Button
            label="Copy"
            onClick={handleCopy}
            style={copyButtonStyles(darkTheme)}
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

const deleteButtonStyles: RenderCss = (darkMode) => {
  if (darkMode) {
    return {
      color: '#ED4747',
      backgroundColor: '#141414',
      border: '1px solid #ED4747',
      width: 100,
    };
  } else {
    return { color: '#FFDF75', backgroundColor: '#ED4747', width: 100 };
  }
};

const copyButtonStyles: RenderCss = (darkMode) => {
  if (darkMode) {
    return {
      color: '#f8f8f8',
      backgroundColor: '#141414',
      border: '1px solid #f8f8f8',
      width: 100,
    };
  } else {
    return { color: '#FFDF75', backgroundColor: '#475ded', width: 100 };
  }
};

export default connect(null, { removeNote })(Note);
