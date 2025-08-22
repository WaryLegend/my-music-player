import styles from "./SideBar.module.css";
/* eslint-disable react/prop-types */
function generateColor(seed) {
  const colors = [
    "#1abc9c",
    "#3498db",
    "#9b59b6",
    "#e67e22",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#16a085",
    "#2980b9",
    "#8e44ad",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Avatar fallback
export default function DefaultAvatar({ name }) {
  if (!name) return;

  const letter = name[0].toUpperCase();
  const bgColor = generateColor(name);

  return (
    <div
      className={styles["profile-avatar"]}
      style={{
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
      }}
    >
      {letter}
    </div>
  );
}
