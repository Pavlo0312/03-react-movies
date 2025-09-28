import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { backdropUrl, posterUrl } from "../../services/movieService";

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {movie.backdrop_path && (
          <img
            className={styles.backdropImg}
            src={backdropUrl(movie.backdrop_path)}
            alt={movie.title}
          />
        )}
        <div className={styles.body}>
          <img
            className={styles.poster}
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
          />
          <div className={styles.info}>
            <h2 className={styles.title}>{movie.title}</h2>
            <div className={styles.sub}>
              {movie.release_date?.slice(0, 4) || "—"} • ⭐{" "}
              {movie.vote_average.toFixed(1)}
            </div>
            <p className={styles.overview}>
              {movie.overview || "No overview."}
            </p>
            <button className={styles.close} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
