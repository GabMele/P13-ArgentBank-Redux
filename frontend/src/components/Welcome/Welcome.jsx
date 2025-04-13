// src/components/Dashboard/Welcome/Welcome.jsx

/**
 * Welcome component displays a personalized greeting and user profile information.
 * 
 * @module Welcome
 * @description This component serves as the dashboard welcome section that:
 * - Displays a personalized welcome message with the user's first and last name
 * - Provides functionality to edit and update the user's name
 * - Manages local state for editing mode and form inputs
 * - Integrates with Redux for user data and profile updates
 * - Handles loading and error states gracefully
 * 
 * @example
 * // Import and use in a parent component
 * import Welcome from './Welcome/Welcome';
 * 
 * function Dashboard() {
 *   return (
 *     <div>
 *       <Welcome />
 *     </div>
 *   );
 * }
 * 
 * @returns {React.ReactElement} The Welcome component JSX
 */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/authThunks";
import styles from "./Welcome.module.scss";
const Welcome = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  /**
   * Effect hook to synchronize local state with Redux user data.
   * @listens user
   */
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]); 

  /**
   * Handles saving the edited user profile.
   * @function handleSave
   * @async
   * @description Dispatches the updateUserProfile action with new name values,
   * handles success/error cases, and exits edit mode.
   */
  const handleSave = () => {
    // Save the edited user data to the server
    dispatch(updateUserProfile({ firstName, lastName }))
      .unwrap()
      .then(() => {
        console.debug("✅ Profile updated successfully");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });

    setIsEditing(false);
  };

  /**
   * Handles canceling the edit operation.
   * @function handleCancel
   * @description Resets the name fields to their original values and exits edit mode.
   */
  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  /**
   * Handles entering edit mode.
   * @function handleEdit
   * @description Enables the edit mode for user name fields.
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {  
    return <h2>Loading...</h2>;
  }

  if (!user) {  // Check if user is null or undefined
    return <div className={styles.error}>Error: User not found</div>;  
  }

  if (user) {
    return (
      <div className={styles.welcome}>
        <h1>
          Welcome back<br />
          {!isEditing ? (
            <>
              <div className={styles.userNames}>
                {user.firstName} {user.lastName}
              </div>
              <button className={styles.editButton}
                onClick={handleEdit}>Edit Name
              </button>
            </>
          ) : (
            <>
            <div className={styles.editInputs}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.editButtons}>
              <div className={styles.saveOrCancelButtons}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
            </>
          )}
        </h1>
      </div>
    )
  }
};

export default Welcome