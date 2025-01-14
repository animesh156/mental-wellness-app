import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState("bg-transparent");

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleClick = () => setClick(!click);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        setNavbarBackground("bg-neutral-800 shadow-md");
      } else {
        setNavbarBackground("bg-neutral-800");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar  top-0 w-full z-50 transition-all duration-300 ${navbarBackground}`}>
      <div className="nav-container flex justify-between items-center p-4">
        <div className="nav-logo">
          <p className="text-white text-xl font-bold">MindWell</p>
        </div>

        <ul
          className={`${
            click ? "nav-menu active" : "nav-menu"
          } text-gray-300 font-normal  bg-neutral-800 text-base`}
        >
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links text-gray-300"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/features"
              activeClassName="active"
              className="nav-links text-gray-300"
              onClick={handleClick}
            >
              Features
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/testimonials"
              activeClassName="active"
              className="nav-links text-gray-300"
              onClick={handleClick}
            >
              Testimonials
            </NavLink>
          </li>
          {user ? (
            <li className="nav-item">
              <button onClick={onLogout} className="text-gray-300">
                LogOut
              </button>
            </li>
          ) : null}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <IoClose size={28} className="text-red-500" />
            </span>
          ) : (
            <span className="icon">
              <BsList size={28} className="text-yellow-500" />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
