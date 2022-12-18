import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import UserContext from "../context/userContext";

const MoviesTable = ({ movies, onSort, sortColumn, onLike, onDelete }) => {
  const { currentUser: user } = useContext(UserContext);

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return user ? (
          <Link className="text-blue-500" to={`/movies/${movie._id}`}>
            {movie.title}
          </Link>
        ) : (
          movie.title
        );
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (item) => <Like like={item.liked} onLike={() => onLike(item)} />,
    },
    {
      key: "delete",
      content: (item) => {
        return (
          user && (
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => onDelete(item)}
            >
              Delete
            </button>
          )
        );
      },
    },
  ];

  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
