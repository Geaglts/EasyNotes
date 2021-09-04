import '../styles/Containers/NoteList.scss';

interface NoteListProps {
  limit?: number;
}

const notes = [1, 2, 3, 4, 5, 6];

function NoteList({ limit }: NoteListProps) {
  return (
    <div className="NoteList">
      <h1 className="NoteList__Title">NoteList</h1>
      {notes.splice(0, limit || notes.length).map((item) => {
        return <p>{item}</p>;
      })}
    </div>
  );
}

export default NoteList;
