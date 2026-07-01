import { Link } from "react-router-dom";

import type { Movie } from "@/types/movie";

import { useCartStore } from "@/store/cart-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article>
      <Card className="overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />

        <CardHeader className="gap-3">
          <Badge variant="secondary" className="w-fit">
            {movie.genre}
          </Badge>

          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            {movie.synopsis}
          </p>

          <div className="flex items-center justify-between">
            <Link
              to={`/movies/${movie.id}`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View details
            </Link>

            <Button size="sm" onClick={() => addToCart(movie)}>
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;