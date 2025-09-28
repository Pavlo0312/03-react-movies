import axios from "axios";
import type { Movie } from "../types/movie";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  const { data } = await api.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return (data?.results ?? []) as Movie[];
}

export const posterUrl = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export const backdropUrl = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";
