export default function ProgressBar({ label, value, color }) {
  return (
    <div>
      <span>
        {label}: {value}%
      </span>
      <div
        style={{
          height: "20px",
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            backgroundColor: color,
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
