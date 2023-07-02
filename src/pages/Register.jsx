import React, { useState } from "react";
import addAvatar from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // navigate to home page
          });
        }
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat app</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input className="fileInput" type="file" id="file" />
            <label htmlFor="file">
              <img src={addAvatar} alt="" />
              <span>Add avatar</span>
            </label>
            <button>Sign up</button>
            {error && (
              <span className="errorMessage">!! Something went wrong</span>
            )}
          </form>
          <p>You have an account? Login</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
