// src/components/Dashboard/Welcome/Welcome.jsx

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/authThunks";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  console.log("✅ Welcome BEFORE - user:", user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]); 


  const handleSave = () => {
    // Save the edited user data to the server
    dispatch(updateUserProfile({ firstName, lastName }))
      .unwrap()
      .then(() => {
        console.log("✅ Profile updated successfully");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

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
    console.log("✅ Welcome user:", user);
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