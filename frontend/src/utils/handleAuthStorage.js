/**
 * Utility for handling the authentication token in localStorage.
 * - Stores, retrieves, and clears the token
 */
const handleAuthStorage = {
  /**
   * Saves the authentication token to localStorage.
   *
   * @param {{ token: string }} authData - Object containing the token.
   */
  set: (authData) => {
    if (authData?.token) {
      localStorage.setItem('token', authData.token);
      console.debug('✅ Token saved to localStorage:', authData.token);
    }
  },

  /**
   * Retrieves the stored authentication token from localStorage.
   *
   * @returns {string|null} The stored token, or null if not found.
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Clears the authentication token from localStorage.
   */
  clear: () => {
    localStorage.removeItem('token');
    console.debug('🗑️ Token cleared from localStorage');
  },
};

export default handleAuthStorage;
