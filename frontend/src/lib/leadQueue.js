import api from '../services/api'

// ---------------------------------------------------------------------------
// Offline / retry queue for lead & audit submissions.
//
// Problem: the contact/audit forms used to swallow network errors and show a
// "thank you" even when the backend was unreachable, so the submission was
// lost forever. This queue stores any failed submission in localStorage and
// retries it automatically the next time the app loads (or when the backend
// comes back online), so NO client message is ever lost.
// ---------------------------------------------------------------------------

const QUEUE_KEY = 'sellhive_pending_submissions'

export function getQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch (e) {
    console.warn('Could not persist pending submissions queue:', e)
  }
}

/**
 * Store a submission for later retry.
 * @param {'lead'|'audit'} type
 * @param {object} payload
 */
export function enqueueSubmission(type, payload) {
  const queue = getQueue()
  queue.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  })
  saveQueue(queue)
}

function removeFromQueue(id) {
  saveQueue(getQueue().filter((item) => item.id !== id))
}

async function sendItem(item) {
  if (item.type === 'audit') {
    return api.post('/audit-requests', item.payload)
  }
  return api.post('/leads', item.payload)
}

/**
 * Attempt to flush all pending submissions. Returns true if every item
 * succeeded. Failed items remain in the queue for the next retry.
 */
export async function flushQueue() {
  const queue = getQueue()
  if (queue.length === 0) return true

  // Copy the list so new enqueues during the flush aren't clobbered.
  const items = [...queue]
  let allSucceeded = true

  for (const item of items) {
    try {
      await sendItem(item)
      removeFromQueue(item.id)
    } catch (error) {
      // A 422 means the payload is invalid — retrying won't help, drop it.
      if (error?.response?.status === 422) {
        removeFromQueue(item.id)
      } else {
        // Backend down / network issue — keep it for the next retry.
        allSucceeded = false
      }
    }
  }

  return allSucceeded
}

/**
 * Best-effort flush used on app startup. Never blocks rendering and never
 * throws. Only attempts when the browser reports an internet connection.
 */
export function flushQueueOnLoad() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return
  // Give the app a moment to settle before pinging the backend.
  setTimeout(() => {
    flushQueue().catch(() => {
      /* keep items queued; will retry next time */
    })
  }, 1500)
}

