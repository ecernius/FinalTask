import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const [userPic, setUserPic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  const nav = useNavigate();
  const picture = useRef();
  function logout() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    };

    fetch("http://localhost:4000/logout", options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("autologin", "false");
          nav("/");
          console.log(data);
        }
      });
  }
  // function updatePic({ user }) {
  //   user.picture = picture.current.value;

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   };

  //   fetch("http://localhost:4000/updatePic", options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }
  function navSearch() {
    nav("/profileSearch");
  }
  function navFav() {
    nav("/profileFavorites");
  }
  function updatePic() {
    setUserPic(picture.current.value);
  }
  return (
    <div>
      <div className="toolbar">
        <h1 onClick={navSearch}>Search</h1>
        <h1 onClick={navFav}>Favorites</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="profile">
        <h1>{user.username}</h1>
        <img className="img" src={userPic} alt="a" />
        <input ref={picture} type="text" placeholder="Picture url" />
        <button onClick={updatePic}>Change profile picture</button>
      </div>
    </div>
  );
};

export default ProfilePage;
