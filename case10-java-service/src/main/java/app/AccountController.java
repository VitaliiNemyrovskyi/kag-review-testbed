package app;

/** Handles account profile operations. Every mutation must pass AccessGuard. */
public class AccountController {
    private final AccountRepository accounts;

    public AccountController(AccountRepository accounts) {
        this.accounts = accounts;
    }

    /** Updates the account email after authorization and validation. */
    public boolean updateEmail(Session session, long accountId, String newEmail) {
        AccessGuard.checkAccess(session, accountId);
        if (!Validation.isValidEmail(newEmail)) {
            return false;
        }
        accounts.setEmail(accountId, newEmail);
        return true;
    }

    /** Closes the account after authorization. */
    public boolean closeAccount(Session session, long accountId) {
        AccessGuard.checkAccess(session, accountId);
        accounts.close(accountId);
        return true;
    }
}
