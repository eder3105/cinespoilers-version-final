import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "@/store/cart-store";

import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isFormValid =
    cardName.trim().length > 0 &&
    cardNumber.trim().length >= 12 &&
    expiry.trim().length > 0 &&
    cvv.trim().length >= 3;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsProcessing(true);

    // Simulación de pasarela de pago (no se conecta a ningún servicio real)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <PageContainer>
        <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => navigate("/movies")}>
          Browse movies
        </Button>
      </PageContainer>
    );
  }

  if (isSuccess) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 text-5xl">✅</div>
          <h1 className="mb-2 text-3xl font-bold">Payment successful!</h1>
          <p className="mb-6 text-muted-foreground">
            Your simulated purchase was completed. Enjoy the movies!
          </p>
          <Button onClick={() => navigate("/movies")}>
            Back to movies
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Order summary</h2>

          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.movie.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{item.movie.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ${item.movie.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-bold">${getTotalPrice()}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Payment details</h2>

          <p className="mb-4 text-xs text-muted-foreground">
            This is a simulated payment form. No real transaction is made.
          </p>

          <form onSubmit={handlePay} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Cardholder name
              </label>
              <Input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Card number
              </label>
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Expiry
                </label>
                <Input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  CVV
                </label>
                <Input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className="mt-2"
            >
              {isProcessing ? "Processing..." : `Pay $${getTotalPrice()}`}
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;