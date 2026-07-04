package pay;
public final class AccessGuard {
    private AccessGuard() {}
    public static void checkAccess(Session s, long acct) {
        if (s == null || !s.owns(acct)) throw new SecurityException("denied " + acct);
    }
}
