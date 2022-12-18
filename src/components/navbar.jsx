import { Link, useLocation } from "react-router-dom";
import auth from "../services/authService";
import { useState } from "react";

const Navbar = ({ user }) => {
  let [open, setOpen] = useState(false);
  const location = useLocation();

  const checkLocation = (path) => {
    return location.pathname === path ? "md:text-blue-600" : "md:text-black";
  };

  const handleLogout = () => {
    auth.logout();
    window.location = "/";
  };
  let Links = user
    ? [
        { name: "Home", link: "/movies" },
        { name: "Customers", link: "/customers" },
        { name: "Rentals", link: "/rentals" },
        {
          name: "Logout",
          link: "/movies",
          onClick: () => handleLogout(),
        },
        {
          name: user.username.charAt(0).toUpperCase() + user.username.slice(1),
          link: "/movies",
          onClick: () => console.log(user, "SETTINGS PROFILE"),
          classes: "bg-yellow-500 p-2 rounded-md",
        },
      ]
    : [
        { name: "Home", link: "/movies" },
        { name: "Customers", link: "/customers" },
        { name: "Rentals", link: "/rentals" },
        { name: "Login", link: "/login" },
        { name: "Register", link: "/register" },
      ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          <Link to="/movies">Movie Rental</Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={` md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map(({ link, name, classes, onClick }) => (
            <li key={name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link}
                onClick={onClick}
                className={` cursor-pointer text-gray-800 hover:text-gray-400 duration-500 ${checkLocation(
                  link
                )} ${classes}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
