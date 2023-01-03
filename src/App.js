import React, { useState, useEffect } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
// @ts-ignore
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import TagBlog from "./pages/TagBlog";
import CategoryBlog from "./pages/CategoryBlog";
import ScrollToTop from "./components/ScrollToTop";
import Blogs from "./pages/Blogs";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // @ts-ignore
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          // @ts-ignore
          element={<Home setActive={setActive} active={active} user={user} />}
        />
        <Route
          path="/search"
          // @ts-ignore
          element={<Home setActive={setActive} user={user} />}
        />
        <Route
          path="/detail/:id"
          // @ts-ignore
          element={<Detail setActive={setActive} user={user} />}
        />
        <Route
          path="/create"
          // @ts-ignore
          element={
            // @ts-ignore
            user?.uid ? <AddEditBlog user={user} setActive={setActive} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          // @ts-ignore
          element={
            // @ts-ignore
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/blogs" 
// @ts-ignore
        element={<Blogs setActive={setActive} />} />
        <Route path="/tag/:tag" 
// @ts-ignore
        element={<TagBlog setActive={setActive} />} />
        <Route path="/category/:category" 
// @ts-ignore
        element={<CategoryBlog setActive={setActive}  />} />
        <Route path="/about" 
// @ts-ignore
        element={<About />} />
        <Route
          path="/auth"
          // @ts-ignore
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" 
// @ts-ignore
        element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
