interface KPIBoxProps {
  title: string;
  value: number | string;
  src: string;
  alt: string;
  fill?: string;
}

export const KPIBox = ({ title, value, src, alt, fill }: KPIBoxProps) => {
  return (
    <div className="col-6 mb-3">
      <div
        className="card text-center shadow-sm rounded-5 border-2 p-3 card"
        style={{
          backgroundColor: "#f9f9f9",
          width: "400px",
          borderColor: "#BAA7E2",
        }}
      >
        <div className="card-body">
          <h6 className="card-title text-secondary pb-2">{title}</h6>
          <h2 className="fw-bold mb-0" style={{ color: fill }}>
            <span>
              <img src={src} alt={alt} height={50} className="me-1" />
            </span>
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
};
