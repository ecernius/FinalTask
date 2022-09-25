import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";

const Favorites = () => {
  const { likedUsers } = useContext(MainContext);

  const nav = useNavigate();
  // useEffect(() => {
  //   fetch("http://localhost:4000/otherUsers")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setLikedUsers(data);
  //     });
  // }, []);
  function navSearch() {
    nav("/profileSearch");
  }
  return (
    <div className="filteredUsers">
      <div className="toolbar">
        <h1 onClick={navSearch}>go to Search</h1>
      </div>
      {likedUsers.map((x, i) => (
        <div className="singeFiltrUser">
          <img className="img" src={x.img} alt={x.name} />
          <h3>{x.name}</h3>
          <h3>{x.gender}</h3>
          <h3>{x.city}</h3>
          <h3>{x.age}</h3>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
