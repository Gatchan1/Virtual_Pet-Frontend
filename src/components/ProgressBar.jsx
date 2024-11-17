export default function ProgressBar({ label, value, color }) {
  return (
    <div className="progress-bar">
      <p>
        {label}: {value}%
      </p>
      <div className="back">
        <div
          className="front"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
