import '../styles/Components/Toggle.scss';

interface ToggleProps {
  status: boolean;
  onClick: () => void;
}

function Toggle(props: ToggleProps) {
  return (
    <div className="Toggle" onClick={props.onClick}>
      <div
        className="Toggle__Circle"
        style={props.status ? { transform: 'translateX(25px)' } : {}}
      />
    </div>
  );
}

export { Toggle };
