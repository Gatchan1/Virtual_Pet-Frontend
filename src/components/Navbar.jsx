export default function Navbar({ setIsAuthenticated }) {
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar">
      <button onClick={logout}>logout</button>
    </div>
  );
}
