package shop;

/** Places orders. */
public class OrderService {
    private final PaymentGateway gateway = new StripeGateway();

    public OrderService() {
    }

    public boolean checkout(long amountCents) {
        return gateway.charge(amountCents);
    }
}
