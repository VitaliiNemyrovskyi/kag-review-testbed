# Auth module

Every incoming request must be authenticated before processing.

Call `validateSession` with the bearer token to check that the session is
valid. `handleRequest` uses it internally and returns `401` when the token
fails `validateSession`. Downstream services rely on this contract.
