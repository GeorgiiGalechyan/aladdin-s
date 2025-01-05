'use strict'

function invalidateSession(sessionId: string) {
  console.log('invalidateSession', sessionId)
}

function singOut(sessionId: string) {
  invalidateSession(sessionId)
}
