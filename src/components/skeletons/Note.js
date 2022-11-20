import { useContext } from 'react';
import { Context } from '../../Context';
import '../../styles/Components/skeletons/Note.scss';

function NoteSkeleton() {
  const { darkTheme } = useContext(Context);

  return (
    <div className={`NoteSkeleton${darkTheme ? ' NoteSkeleton--Dark' : ''}`}>
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
