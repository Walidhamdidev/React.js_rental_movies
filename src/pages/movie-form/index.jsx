import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { withRouter } from "../../hooks/withRouter";

class MovieForm extends Form {
  state = {
    errors: {},
    genres: [],
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
  };

  // change architecture for something scalable
  // login & register with google
  // forgot password
  // todo: id is not allowed to be empty issue
  // asc and desc when click twice
  // save and update movies in movieForm
  // register show message if the username already in the field of username
  // testing
  // storybook
  // add typescript to the project

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({
      genres,
    });
  };
  populateMovies = async () => {
    try {
      const { id: movieId } = this.props.router.params;
      if (movieId === "new") return;

      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.router.navigate("/notFound", { replace: true });
    }
  };

  async componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.router.navigate("/movies", { replace: true });
  };

  render() {
    return (
      <div>
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Movie Form
              </h1>
              <form
                onSubmit={this.handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                {this.renderInput("title", "Title")}
                {this.renderSelect("genreId", "Genre", this.state.genres)}
                {this.renderInput("numberInStock", "Number in Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate", "number")}
                {this.renderButton("Save")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieForm);
