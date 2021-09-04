import '../styles/Components/Container.scss';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

function Container(props: ContainerProps) {
  return (
    <div className="Container">
      <h1 className="Container__Title">EasyNotes</h1>
      {props.children}
    </div>
  );
}

export default Container;
