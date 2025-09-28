// src/components/SearchBar/SearchBar.ts
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // React Form Action – приймає FormData
  async function action(formData: FormData) {
    const query = String(formData.get("query") ?? "").trim();
    if (query) onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by TMDB
        </a>

        <form className={styles.form} action={action}>
          <input
            className={styles.input}
            name="query"
            type="text"
            placeholder="Search movies..."
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
