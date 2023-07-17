import React, { useState } from "react";
import addAvatar from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const defaultImage = "https://i.stack.imgur.com/l60Hf.png";
const Register = () => {
  const [error, setError] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading === false) {
      setIsLoading(true);
      const name = e.target[0].value.trim();
      const displayName = name.toLowerCase(); // check it before
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
      if (email !== "" && password !== "" && displayName !== "") {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (file) {
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL ? downloadURL : null,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } else {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: defaultImage,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: defaultImage,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setError(true);
        }
      } else {
        setEmptyFieldMessage(true);
      }
    }
  };
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat app v3</span>
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
            {isLoading && <span>loading ...</span>}
            {emptyFieldMessage && (
              <span className="errorMessage">
                Please fill out all fields before submitting.
              </span>
            )}
          </form>
          <p>
            You have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
