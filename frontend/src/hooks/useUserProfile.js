import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = (token) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data.body); // Assuming the response body contains the user data
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]); // Runs when token changes

  return {
    loading,
    error,
    profileData,
  };
};

export default useUserProfile;
