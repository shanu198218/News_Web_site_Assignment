import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import "./style.scss"
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import NewsHome from "./pages/NewsHome";
import Auth from "./pages/Auth";
import { signOut } from "firebase/auth";
import { auth } from "./util/firebase";

import AddEditNews from "./pages/AddEditNews";
import AdminHomeNews from "./pages/AdminHomeNews";
import NewsDetails from "./pages/NewsDetails";
import UpdateNews from "./pages/UpdateNews";
import NotFounded from "./pages/NotFounded";

function App() {

  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null)
      }
    });
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <ToastContainer />
      <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<NewsHome />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="/*" element={<NotFounded />} />
        <Route path="/create" element={user?.uid ? <AddEditNews user={user} /> : <Navigate to="/*" />} />
        <Route path="/adminHome" element={user?.uid ? <AdminHomeNews user={user} setActive={setActive} /> : <Navigate to="/*" />} />
        <Route path="/detail/:id" element={<NewsDetails setActive={setActive} />} />
        <Route path="/update/:id" element={<UpdateNews setActive={setActive} />} />

      </Routes>
    </div>
  );
}

export default App;
