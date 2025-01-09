CREATE TABLE app_user (
    id big PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
);

CREATE TABLE user_session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES app_user(id),
    expires_at TIMESTAMPTZ NOT NULL,
);