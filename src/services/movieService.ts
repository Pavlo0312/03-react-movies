import axios from "axios";
import type { Movie } from "../types/movie";

/** Публічні утиліти для зображень (безпечні до null/undefined) */
export const posterUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export const backdropUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";

/** Очікувана форма відповіді TMDB для списків */
interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Токен з .env (Vite) */
const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
if (!token) {
  // Не кидаємо помилку одразу, щоб dev-сервер піднявся,
  // але отримаємо зрозумілий фейл при запиті.
  // eslint-disable-next-line no-console
  console.warn("VITE_TMDB_TOKEN is not set in .env");
}

/** Налаштований інстанс axios */
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: token
    ? { Authorization: `Bearer ${token}` }
    : undefined,
  // Можна додати інші параметри за потребою (timeout тощо)
});

/**
 * Пошук фільмів на TMDB.
 * @param query Пошуковий рядок
 * @returns список фільмів (Movie[])
 */
export async function fetchMovies(query: string): Promise<Movie[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const { data } = await api.get<TmdbListResponse<Movie>>(
      "/search/movie",
      {
        params: {
          query: q,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      }
    );

    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("TMDB fetchMovies error:", err);
    // Проксюємо контрольоване повідомлення для UI
    throw new Error("Failed to fetch movies");
  }
}
