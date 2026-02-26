interface KPIBoxProps {
  title: string;
  value: number | string;
  src: string;
  alt: string;
  fill?: string;
  hightLowAlert?: React.ReactNode;
}

export const KPIBox = ({
  title,
  value,
  src,
  alt,
  fill,
  hightLowAlert,
}: KPIBoxProps) => {
  return (
    <div className="w-100 mb-3">
      <div
        className="card text-center shadow-sm rounded-5 border-2 card"
        style={{
          backgroundColor: "#f9f9f9",
          borderColor: "#DBDBDB",
          maxWidth: "300px",
        }}
      >
        <div className="card-body">
          <h6 className="card-title text-secondary pb-2">{title}</h6>
          <h3 className="fw-bold mb-0" style={{ color: fill }}>
            <span>
              <img src={src} alt={alt} height={50} className="me-1" />
            </span>
            {value}
          </h3>
          {hightLowAlert}
        </div>
      </div>
    </div>
  );
};
