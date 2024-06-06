export default function SearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="movieName"
        placeholder="Enter movie"
        autoComplete="off"
        autoFocus
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
