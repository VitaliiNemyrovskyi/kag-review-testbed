package app;

/** Central authorization check for account-scoped operations. */
public final class AccessGuard {
    private AccessGuard() {}

    /**
     * Verifies that the session owner may act on the given account.
     * Throws {@link SecurityException} when access is denied.
     */
    public static void checkAccess(Session session, long accountId) {
        if (session == null || !session.ownsAccount(accountId)) {
            throw new SecurityException("access denied for account " + accountId);
        }
    }
}
