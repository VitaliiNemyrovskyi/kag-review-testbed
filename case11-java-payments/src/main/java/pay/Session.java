package pay;
public class Session {
    private final long uid;
    public Session(long uid) { this.uid = uid; }
    public boolean owns(long acct) { return uid == acct; }
}
