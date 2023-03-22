import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { getGenres } from "../../services/genreService";
import { deleteMovie, getMovies } from "../../services/movieService";
import { pagination } from "../../utils/pagination";
import ListGroup from "../../common/list-group";
import SearchBox from "../../common/search-box";
import Pagination from "../../common/pagination";
import MoviesTable from "./components";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    setLoading(true);
    setMovies(await getMovies());
    setGenres(genres);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [movies]);

  const handleLike = (movie) => {
    const allMovies = [...movies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...allMovies[index] };
    allMovies[index].liked = !allMovies[index].liked;

    setMovies(allMovies);
  };

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    setMovies(originalMovies.filter((m) => m._id !== movie._id));

    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast("This movie has already been deleted");

      setMovies(originalMovies);
    }
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sorted = _.sortBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = pagination(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data };
  };

  const movieLength = movies.length;

  const { totalCount, data } = getPagedData();

  return (
    <div className="md:flex justify-center	justify-items-center	 gap-5">
      <div className="mt-4">
        {!loading ? (
          <ListGroup
            items={genres}
            onItemSelect={handleGenreSelect}
            selectedGenre={selectedGenre}
          />
        ) : (
          <div className="m-10">
            <BeatLoader color={"#123abc"} loading={loading} />
          </div>
        )}
      </div>
      <div>
        <div>
          {user && (
            <Link
              to="/movies/new"
              className="inline-block mt-4 text-white  bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              New Movie
            </Link>
          )}

          {!loading ? (
            movieLength === 0 ? (
              <h1>There is no movies</h1>
            ) : (
              <>
                <h1 className="my-2">There is {totalCount} movies</h1>

                <SearchBox value={searchQuery} onChange={handleSearchChange} />

                <MoviesTable
                  user={user}
                  movies={data}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onSort={handleSort}
                  sortColumn={sortColumn}
                />
              </>
            )
          ) : (
            <div className="m-10">
              <BeatLoader color={"#123abc"} loading={loading} />
            </div>
          )}
        </div>

        <div className="m-14">
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlePageChange}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Movies;
