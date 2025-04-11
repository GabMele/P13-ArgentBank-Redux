// src/pages/ProfilePage/index.jsx

/**
 * The ProfilePage component serves as the user profile page.
 * It renders the Welcome component, which can include personalized 
 * information or a greeting based on the user's profile.
 * This component can be expanded in the future to display more profile 
 * details or user-specific content.
 * 
 * @component
 * @returns {JSX.Element} The ProfilePage component with a Welcome section.
 */

import Welcome from "@/components/Welcome/Welcome.jsx";

const ProfilePage = () => {
  return (
    <div> 
      {/* Welcome component renders personalized or greeting content */}
      <Welcome /> 
    </div>
  );
};

export default ProfilePage;
