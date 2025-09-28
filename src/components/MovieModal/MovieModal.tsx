import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import type { Movie } from "../../types/movie";
import { backdropUrl } from "../../services/movieService";
import styles from "./MovieModal.module.css";

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Закриваємо по Esc + блокуємо скрол під модалкою
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Закриття по кліку на бекдроп
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const bg = backdropUrl(movie.backdrop_path);

  // Рендеримо через портал у body
  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <header className={styles.header}>
          <div
            className={styles.cover}
            style={{ backgroundImage: `url(${bg})` }}
          />
        </header>

        <div className={styles.content}>
          <h2 id="movie-title" className={styles.title}>
            {movie.title}
          </h2>

          <p className={styles.overview}>{movie.overview}</p>

          <p className={styles.meta}>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p className={styles.meta}>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
