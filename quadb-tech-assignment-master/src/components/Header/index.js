import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { useLocation } from "react-router-dom";

import "./index.css";

const Header = (props) => {
  const navigate = useLocation();
  console.log(navigate);

  const isLogin = localStorage.getItem("jwt_token") !== undefined;

  const onLogoutOrLogin = () => {
    if (isLogin) {
      localStorage.removeItem("jwt_token");
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </div>
        <ul className="icons-container">
          <Link to="/" className="link">
            <li>
              <AiFillHome color="white" size={20} />
            </li>
          </Link>
          <Link to="/jobs" className="link">
            <li>
              <BsBriefcaseFill color="white" size={20} />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-icon"
              onClick={onLogoutOrLogin}
            >
              <FiLogOut color="white" size={20} />
            </button>
          </li>
        </ul>
        <div className="buttons-container">
          <div className="menu-container">
            <Link to="/" className="link">
              <p className="header-heading">Home</p>
            </Link>
            <Link to="/jobs" className="link">
              <p className="header-heading">Jobs</p>
            </Link>
          </div>
          <button
            type="button"
            className="logout-btn"
            onClick={onLogoutOrLogin}
          >
            {isLogin ? "Logout" : "Login/Signup"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
