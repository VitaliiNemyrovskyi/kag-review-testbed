package app;

/** Authenticated user session. */
public class Session {
    private final long userId;

    public Session(long userId) {
        this.userId = userId;
    }

    public boolean ownsAccount(long accountId) {
        return userId == accountId;
    }
}
