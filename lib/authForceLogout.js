// Force-logout gate.
//
// Bump LOGOUT_VERSION to sign EVERY user out on their next visit. On load, the
// app compares this number against the value each browser has stored; if they
// differ, the app signs that session out exactly once and records the new
// number — so a bump logs a user out a single time, not on every page load.
//
// LOGOUT_VERSION = 1 is the initial mass logout: no browser has the marker yet,
// so every signed-in user is logged out once the next time they open the site.
// Increment to 2, 3, … whenever you need to force everyone out again.
export const LOGOUT_VERSION = 1;

const STORAGE_KEY = 'lp_logout_v';

// True if this browser still needs to be logged out for the current
// LOGOUT_VERSION. Safe when storage is disabled/blocked (private windows, etc.).
export function needsForcedLogout() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== String(LOGOUT_VERSION);
  } catch {
    return false;
  }
}

// Record that this browser has been logged out for the current LOGOUT_VERSION,
// so we don't sign it out again until the next bump.
export function markForcedLogoutDone() {
  try {
    localStorage.setItem(STORAGE_KEY, String(LOGOUT_VERSION));
  } catch {
    /* ignore storage errors */
  }
}
