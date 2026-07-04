package shop;

/** Places orders. Depends on the PaymentGateway abstraction (injected). */
public class OrderService {
    private final PaymentGateway gateway;

    public OrderService(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public boolean checkout(long amountCents) {
        return gateway.charge(amountCents);
    }
}
