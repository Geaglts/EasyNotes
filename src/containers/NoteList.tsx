import { useState } from 'react';
import '../styles/Containers/NoteList.scss';

import { noteStorage } from '../storage';

interface NoteListProps {
  limit?: number;
}

function NoteList({ limit }: NoteListProps) {
  const [notes] = useState(noteStorage.get());

  return (
    <div className="NoteList">
      <h1 className="NoteList__Title">NoteList</h1>
      {notes.splice(0, limit || notes.length).map((item) => {
        return (
          <div key={item._id}>
            <p>{item.title}</p>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;
