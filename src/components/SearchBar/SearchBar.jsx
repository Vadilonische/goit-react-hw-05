import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <form className={css.searchBarForm} onSubmit={onSubmit}>
      <input
        type="text"
        name="movieName"
        placeholder="Enter movie"
        autoComplete="off"
        autoFocus
        required
        className={css.searchBarInput}
      />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}
