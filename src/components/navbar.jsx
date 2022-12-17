import { Link, useLocation } from "react-router-dom";
import auth from "../services/authService";

export default function Navbar({ user }) {
  const location = useLocation();

  const checkLocation = (path) => {
    return location.pathname === path ? "md:text-blue-600" : "md:text-black";
  };

  const handleLogout = () => {
    auth.logout();
    window.location = "/";
  };

  const renderUserInfo = () => {
    return !user ? (
      <>
        {" "}
        <li>
          <Link
            to="/login"
            className={`block py-2 pl-3 pr-4 ${checkLocation(
              "/login"
            )} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className={`block py-2 pl-3 pr-4 ${checkLocation(
              "/register"
            )} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
          >
            Register
          </Link>
        </li>
      </>
    ) : (
      <>
        <span className="ml-4 px-4 rounded-md self-center text-2xl bg-red-400 text-white font-bold whitespace-nowrap dark:text-white">
          {user.username}
        </span>
        <li>
          <Link
            onClick={handleLogout}
            className="rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Movie Rental Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Movie Rental
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent ${checkLocation(
                  "/movies"
                )} md:p-0 dark:text-white`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className={`block py-2 pl-3 pr-4 ${checkLocation(
                  "/customers"
                )} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/rentals"
                className={`block py-2 pl-3 pr-4 ${checkLocation(
                  "/rentals"
                )} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Rentals
              </Link>
            </li>
            {renderUserInfo()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
