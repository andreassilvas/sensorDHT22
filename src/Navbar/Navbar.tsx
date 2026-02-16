import brandLogo from "../assets/images/brand.webp";

export const Navbar = () => {
  return (
    <nav
      className="nav flex-column  vh-100 p-3 rounded-end-2"
      style={{ backgroundColor: "#1E075C" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="mb-5"
            height={40}
            width={40}
          />
        </a>
        <a
          className="nav-link active rounded d-flex align-items-center gap-2 nav-hover-lightViolet mb-2"
          href="#"
        >
          <i className="bi bi-graph-up fs-5 text-white"></i>
          <span className="text-white">Sensor Dashboard</span>
        </a>
        <a
          className="nav-link rounded d-flex align-items-center gap-2 nav-hover-lightViolet mb-2"
          href="#"
        >
          <i className="bi bi-thermometer-half fs-5 text-white"></i>
          <span className="text-white">Temperature History</span>
        </a>
        <a
          className="nav-link rounded d-flex align-items-center gap-2 nav-hover-lightViolet mb-2"
          href="#"
        >
          <i className="bi bi-droplet-half fs-5 text-light"></i>
          <span className="text-white">Humidity History</span>
        </a>
      </div>
    </nav>
  );
};
