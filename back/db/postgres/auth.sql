CREATE TABLE IF NOT EXISTS app_user (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, 
    email CITEXT NOT NULL DEFAULT '0',
    emailVerified INTEGER NOT NULL DEFAULT 0,
	registeredTOTP INTEGER NOT NULL DEFAULT 0,
	registeredPasskey INTEGER NOT NULL DEFAULT 0,
	registeredSecurityKey INTEGER NOT NULL DEFAULT 0,
	registered2FA BOOLEAN DEFAULT false
);

CREATE TABLE user_session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES app_user(id),
    expires_at INTEGER NOT NULL,
    two_factor_verified INTEGER NOT NULL DEFAULT 0
);

INSERT INTO app_user(username, password_hash, email)

INSERT INTO user_session ( id, user_id , expires_at , two_factor_verified) VALUES ('test_alkjflakfjh', 000100, 1739286370013, false);