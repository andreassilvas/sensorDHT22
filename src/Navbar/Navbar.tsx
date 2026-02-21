import { NavLink } from "react-router-dom";
import brandLogo from "../assets/images/brand.webp";

export const Navbar = () => {
  return (
    <nav
      className="nav flex-column vh-100 p-2 rounded-end-2"
      style={{ backgroundColor: "#1E075C", width: "280px" }}
    >
      <div>
        <a className="navbar-brand" href="#">
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="mb-5"
            height={40}
            width={40}
          />
        </a>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link rounded d-flex align-items-center gap-2 nav-hover-lightViolet mb-2 me-2 ${isActive ? "active fw-bold" : ""}`
          }
        >
          <i className="bi bi-graph-up fs-5 text-white"></i>
          <span className="text-white">Dashboard capteurs</span>
        </NavLink>

        <NavLink
          to="/historique"
          className={({ isActive }) =>
            `nav-link rounded d-flex align-items-center gap-2 nav-hover-lightViolet mb-2 me-2 ${isActive ? "active fw-bold" : ""}`
          }
        >
          <i className="bi bi-thermometer-half fs-5 text-white"></i>
          <i className="bi bi-droplet-half fs-5 text-light"></i>
          <span className="text-white">Historique</span>
        </NavLink>
      </div>
    </nav>
  );
};
