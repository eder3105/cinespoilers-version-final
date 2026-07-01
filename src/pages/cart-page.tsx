import { Link, useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/cart-store";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <PageContainer>
        <h1 className="mb-4 text-3xl font-bold">Your cart</h1>
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/movies"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Browse movies
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold">Your cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.movie.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-semibold">{item.movie.title}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity} · ${item.movie.price} each
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeFromCart(item.movie.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <p className="text-lg font-bold">Total: ${getTotalPrice()}</p>
        <Button onClick={() => navigate("/checkout")}>Checkout</Button>
      </div>
    </PageContainer>
  );
};

export default CartPage;