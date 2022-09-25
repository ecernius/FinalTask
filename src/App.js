import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Favorites from "./components/Favorites";
import Search from "./components/Search";

import { useState, useEffect } from "react";

import MainContext from "./context/MainContext";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [otherUsers, setOtherUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/otherUsers")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOtherUsers(data);
      });
  }, []);

  return (
    <div className="App">
      <MainContext.Provider
        value={{ user, setUser, likedUsers, setLikedUsers, otherUsers }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage setUser={setUser} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/profileSearch" element={<Search />} />
            <Route path="/profileFavorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
