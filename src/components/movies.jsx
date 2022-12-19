import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { pagination } from "../utils/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";

export class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];
    this.setState({
      movies: await getMovies(),
      genres,
    });

    this.setState({
      loading: false,
    });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter((m) => m._id !== movie._id),
    });

    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast("This movie has already been deleted");

      this.setState({
        movies: originalMovies,
      });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,

      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );

    const sorted = _.sortBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagination(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
      loading,
    } = this.state;
    const { user } = this.props;

    const movieLength = allMovies.length;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="md:flex justify-center	justify-items-center	 gap-5">
        <div className="mt-4">
          {!loading ? (
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
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

                  <SearchBox
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                  />

                  <MoviesTable
                    user={user}
                    movies={movies}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
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
              onChangePage={this.handlePageChange}
            />
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default Movies;
