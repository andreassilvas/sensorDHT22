import Spinner from "react-bootstrap/Spinner";

export default function SpinnerLoader({ fullPage = false }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${
        fullPage ? "vh-100" : "py-5"
      }`}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
