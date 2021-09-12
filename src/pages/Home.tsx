import Container from '../components/Container';
import AddNoteForm from '../containers/AddNoteForm';
import { Menu } from '../containers/Menu';
import NoteList from '../containers/NoteList';

function Home() {
  return (
    <>
      <Menu />
      <Container>
        <AddNoteForm />
        <NoteList limit={5} />
      </Container>
    </>
  );
}

export default Home;
