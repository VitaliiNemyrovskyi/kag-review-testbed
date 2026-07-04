package shop;
public class StripeGateway implements PaymentGateway {
    public boolean charge(long amountCents) { return amountCents > 0; }
}
