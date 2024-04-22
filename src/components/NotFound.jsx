const mystyle = {
  color: "#FF9500",
  margin: "50px",
  height: "calc(100dvh - 610px)",
};

export default function NotFound() {
  return (
    <>
      <h1 style={mystyle}>Error 404: Page not found</h1>
    </>
  );
}
