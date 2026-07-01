import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMovieById } from "@/services/tmdb-service";
import { useCartStore } from "@/store/cart-store";

import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId!),
    enabled: Boolean(movieId),
  });

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-muted-foreground">Loading movie...</p>
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <p className="text-destructive">Movie not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full rounded-lg object-cover"
        />

        <div>
          <Badge variant="secondary" className="mb-3 w-fit">
            {movie.genre}
          </Badge>

          <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>

          <p className="mb-6 text-muted-foreground">{movie.synopsis}</p>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">${movie.price}</p>

            <Button onClick={() => addToCart(movie)}>Add to cart</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}