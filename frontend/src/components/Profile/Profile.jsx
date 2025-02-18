// src/components/Profile.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '@/features/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profile && (
        <div>
          <p>Name: {profile.firstName} {profile.lastName}</p>
          <p>Email: {profile.email}</p>
          {/* Display other profile information */}
        </div>
      )}
    </div>
  );
};

export default Profile;
