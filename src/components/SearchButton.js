import { MdSearch } from 'react-icons/md';

import '../styles/Components/SearchButton.scss';

function SearchButton({
  inputPlaceholder = 'Buscar',
  value = '',
  onClick = () => {},
  onChange = () => {},
} = {}) {
  return (
    <div className="SearchButton">
      <input
        type="text"
        className="SearchButton__input"
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <button className="SearchButton__button" onClick={onClick}>
        <MdSearch />
      </button>
    </div>
  );
}

export default SearchButton;
