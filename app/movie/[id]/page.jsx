import { notFound } from "next/navigation";
import MovieDetailPage from "../../../src/views/MovieDetail";
import { getMovieById, getRecommendationsForMovie } from "../../../src/lib/movies";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    return { title: "Movie Not Found" };
  }

  return {
    title: movie.title,
    description: movie.description,
  };
}

export default async function MovieRoutePage({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  const recommendations = getRecommendationsForMovie(movie, 5);

  return <MovieDetailPage movie={movie} recommendations={recommendations} />;
}
