'use strict'

// Session lifetime in milliseconds
const sessionExpiresIn = 30 * 24 * 60 * 60 * 1000

function getSessionFromStorage(sessionId: string) {
  let row = ` ${sessionId}`
}

function updateSessionExpiration(sessionId: string, sessionExpiresAt: Date) {
  let row = ` ${sessionId} ${sessionExpiresAt}`
}

function validateSession(sessionId: string) {
  const session = getSessionFromStorage(sessionId) as { id: string; ExpiresAt: Date } | undefined

  if (!session) {
    throw new Error('Invalid session id.')
  }

  if (new Date(session?.ExpiresAt) <= new Date()) {
    throw new Error('Expired session.')
  }

  if (session?.ExpiresAt >= new Date(Date.now() + sessionExpiresIn / 2)) {
    session.ExpiresAt = new Date(Date.now() + sessionExpiresIn)
    updateSessionExpiration(session.id, session.ExpiresAt)
  }
  return session
}
