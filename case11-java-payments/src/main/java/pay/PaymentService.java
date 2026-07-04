package pay;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/** Handles refunds and card display. Every money operation must pass AccessGuard. */
public class PaymentService {
    private final Ledger ledger;

    public PaymentService(Ledger ledger) { this.ledger = ledger; }

    /** Refunds an amount after authorizing the session against the account. */
    public boolean refund(Session session, long account, long cents) {
        AccessGuard.checkAccess(session, account);
        return ledger.credit(account, cents);
    }

    /** Masks all but the last 4 digits of a card number. */
    public String maskCard(String number) {
        if (number == null) return "";
        return "****" + number.substring(number.length() - 4);
    }

    /** True if two ISO currency codes are the same. */
    public boolean sameCurrency(String a, String b) {
        return a.equals(b);
    }

    /** Loads config, propagating read failures so startup aborts on a bad file. */
    public Config load(Path file) throws IOException {
        return Config.parse(Files.readString(file));
    }
}
