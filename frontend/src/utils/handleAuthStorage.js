const handleAuthStorage = {
  /**
   * Stores authentication data in localStorage.
   * @param {string} token - The authentication token to store.
   * @param {object} [user] - Optional user data to store.
   */
  set: (authData) => {
    if (authData?.token) {
      localStorage.setItem('token', authData.token);
      console.debug('✅ Token saved to localStorage:', authData.token);
    }
    if (authData?.user) {
      localStorage.setItem('user', JSON.stringify(authData.user));
      console.debug('👤 User data saved to localStorage:', authData.user);
    }
  },

  /**
   * Retrieves user data from localStorage.
   * @returns {object|null} Parsed user object or null if not found.
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error('❌ Error parsing user data', e);
      return null;
    }
  },

  /**
   * Clears authentication data from localStorage.
   */
  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.debug('🗑️ Auth data cleared from localStorage');
  },

  /**
   * Retrieves the token from localStorage.
   * @returns {string|null} The stored token or null if not found.
   */
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default handleAuthStorage;