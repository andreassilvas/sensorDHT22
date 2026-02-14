import brandLogo from "../assets/images/brand.webp";

export const Navbar = () => {
  return (
    <nav
      className="nav flex-column bg-light vh-100 p-3"
      style={{ width: "220px" }}
    >
      <img
        src={brandLogo}
        alt="Brand Logo"
        className="mb-4"
        height={40}
        width={40}
      />
      <a className="nav-link active" aria-current="page" href="#">
        Sensor Dashboard
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link" href="#">
        Link
      </a>
      <a className="nav-link disabled" aria-disabled="true">
        Disabled
      </a>
    </nav>
  );
};
