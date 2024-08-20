import React from "react";
import styles from "./UserProfile.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const url = "https://randomuser.me/api/";
    try {
      const response = await axios.get(url);
      setUser(response.data.results[0]);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching user data", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.userCard}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          user && (
            <div className={styles.userCardContent}>
              <img src={user.picture.large}></img>
              <h2>{`${user.name.first} ${user.name.last}`}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <button onClick={fetchUser}>Load New User</button>
            </div>
          )
        )}
      </div>
    </>
  );
}
