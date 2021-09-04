import Container from '../components/Container';
import AddNoteForm from '../containers/AddNoteForm';
import NoteList from '../containers/NoteList';

function Home() {
  return (
    <Container>
      <AddNoteForm />
      <NoteList limit={5} />
    </Container>
  );
}

export default Home;
