package shop;
public interface PaymentGateway {
    boolean charge(long amountCents);
}
