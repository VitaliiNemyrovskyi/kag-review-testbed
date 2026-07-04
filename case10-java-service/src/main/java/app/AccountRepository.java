package app;

import java.util.HashMap;
import java.util.Map;

/** In-memory account store (stand-in for the real persistence layer). */
public class AccountRepository {
    private final Map<Long, String> emails = new HashMap<>();

    public void setEmail(long accountId, String email) {
        emails.put(accountId, email);
    }

    public void close(long accountId) {
        emails.remove(accountId);
    }
}
