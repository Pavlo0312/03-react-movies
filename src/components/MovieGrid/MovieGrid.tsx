import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { posterUrl } from "../../services/movieService";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id} className={styles.card}>
          <button className={styles.cardBtn} onClick={() => onSelect(m)}>
            {m.poster_path ? (
              <img
                className={styles.poster}
                src={posterUrl(m.poster_path)}
                alt={m.title}
              />
            ) : (
              <div className={styles.noPoster}>No poster</div>
            )}
            <div className={styles.meta}>
              <div className={styles.title}>{m.title}</div>
              <div className={styles.sub}>
                {m.release_date?.slice(0, 4) || "—"} • ⭐{" "}
                {m.vote_average.toFixed(1)}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
