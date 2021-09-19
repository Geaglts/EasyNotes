import '../../styles/Components/skeletons/Note.scss';

function NoteSkeleton() {
  return (
    <div className="NoteSkeleton">
      <div className="NoteSkeleton__Head">
        <h1></h1>
        <div>
          <button></button>
          <button></button>
        </div>
      </div>
      <div className="NoteSkeleton__Content">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export { NoteSkeleton };
