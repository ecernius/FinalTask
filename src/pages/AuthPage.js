import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ setUser }) => {
  const nav = useNavigate();

  const usernameRef = useRef();
  const regPass1Ref = useRef();
  const regPass2Ref = useRef();
  const cityRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();

  const usernameLoginRef = useRef();
  const passLoginRef = useRef();

  function register() {
    const user = {
      username: usernameRef.current.value,
      passOne: regPass1Ref.current.value,
      passTwo: regPass2Ref.current.value,
      city: cityRef.current.value,
      gender: genderRef.current.value,
      age: ageRef.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch("http://localhost:4000/register", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function login() {
    const user = {
      username: usernameLoginRef.current.value,
      password: passLoginRef.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    };

    fetch("http://localhost:4000/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser(data.data.user);
          nav("/profile");
        }
        console.log(data);
      });
  }

  function autoLoginTrigger(e) {
    localStorage.setItem("autologin", String(e.target.checked));
  }

  useEffect(() => {
    const autologin = localStorage.getItem("autologin");

    if (autologin === "true") {
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      };

      fetch("http://localhost:4000/autologin", options)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setUser(data.data.user);
            nav("/profile");
          }
          console.log(data);
        });
    }
  }, []);

  return (
    <div className="authDivs">
      <div className="register">
        <h1>REGISTER</h1>
        <input ref={usernameRef} type="text" placeholder="username" />
        <input ref={regPass1Ref} type="text" placeholder="pass1" />
        <input ref={regPass2Ref} type="text" placeholder="pass2" />
        <input ref={cityRef} type="text" placeholder="city" />
        <input ref={genderRef} type="text" placeholder="gender" />
        <input ref={ageRef} type="text" placeholder="age" />
        <button onClick={register}>REGISTER</button>
      </div>

      <div className="login">
        <h1>LOGIN</h1>
        <input ref={usernameLoginRef} type="text" placeholder="username" />
        <input ref={passLoginRef} type="text" placeholder="pass" />
        <div>
          <label htmlFor="check">Stay logged in</label>
          <input onChange={autoLoginTrigger} type="checkbox" id="check" />
        </div>
        <button onClick={login}>LOGIN</button>
      </div>
    </div>
  );
};

export default AuthPage;
