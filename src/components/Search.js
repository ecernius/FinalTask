import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";

const Search = () => {
  const { likedUsers, setLikedUsers, otherUsers } = useContext(MainContext);
  const nav = useNavigate();

  const [searchText, setSearchText] = React.useState("");
  const [count, setCount] = useState(0);

  // function like() {
  //   setLikedUsers((current) => [...current, otherUsers[count]]);

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(likedUsers),
  //   };

  //   fetch("http://localhost:4000/likedUsers", options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(likedUsers);
  //     });
  // }
  function counter() {
    setCount(count + 1);
    if (count === otherUsers.length - 1) {
      setCount(0);
    }
    console.log(count);
  }
  function like() {
    setLikedUsers((current) => [...current, otherUsers[count]]);
  }
  function like2(otherUsers, key) {
    // setLikedUsers((current) => [...current, otherUsers[key]]);
    console.log(otherUsers[key]);
  }

  const filteredUsers = otherUsers.filter(
    ({ img, name, age, city, gender }) =>
      img.toLowerCase().includes(searchText.toLowerCase()) ||
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      gender.toLowerCase().includes(searchText.toLowerCase()) ||
      city.toLowerCase().includes(searchText.toLowerCase()) ||
      age.toString().toLowerCase().includes(searchText.toLowerCase())
  );
  function navFav() {
    nav("/profileFavorites");
  }

  return (
    <div className="search">
      <div className="toolbar">
        <h1 onClick={navFav}>Go to Favorites</h1>
      </div>
      <div className="singleUser">
        <img className="img" src={otherUsers[count].img} alt="pic" />
        <h3>{otherUsers[count].name}</h3>
        <h3>{otherUsers[count].age}</h3>
        <h3>{otherUsers[count].gender}</h3>
        <h3>{otherUsers[count].city}</h3>
        <button onClick={counter}>next</button>
        <button onClick={like}>Like </button>
      </div>

      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
      />
      <div className="filteredUsers">
        {filteredUsers.map((x, i) => (
          <div onClick={like2} className="singeFiltrUser" key={i}>
            <img className="img" src={x.img} alt="pic" />
            <h3>{x.name}</h3>
            <h3>{x.age}</h3>
            <h3>{x.gender}</h3>
            <h3>{x.city}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
