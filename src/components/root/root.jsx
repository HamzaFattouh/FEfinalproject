import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";
import './Root.css'


export default function root() {
  return (
    <div className="rootpage">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
