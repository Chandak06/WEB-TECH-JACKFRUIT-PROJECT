import { Link, useNavigate } from "react-router-dom";
import "../styles/NavHeader.css";

const NavHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-header">
      <button className="btn-back" onClick={() => navigate(-1)} title="Go back">
        ← Back
      </button>
      <Link to="/" className="btn-home" title="Go to home">
        🏠 Home
      </Link>
    </div>
  );
};

export default NavHeader;