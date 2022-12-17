import http from "./httpService";
import auth from "../services/authService";

const populateGenre = "?populate=genre";

export const getMovies = async () => {
  const {
    data: { data },
  } = await http.get("/api/movies" + populateGenre);

  return data.map((item) => {
    const attr = item["attributes"];
    const genre = attr["genre"]["data"];

    return {
      _id: item.id.toString(),
      title: attr["title"],
      genre: { _id: genre?.id.toString(), name: genre["attributes"]["name"] },
      numberInStock: attr["numberInStock"],
      dailyRentalRate: attr["dailyRentalRate"],
      liked: attr["liked"],
    };
  });
};

export const getMovie = async (id) => {
  const {
    data: { data },
    // } = await http.get(config.endPoint + "/api/movies/" + id + populateGenre);
  } = await http.get("/api/movies/" + id + populateGenre);
  const attr = data["attributes"];
  const genre = attr["genre"]["data"];
  return {
    _id: data.id.toString(),
    title: attr["title"],
    genre: { _id: genre?.id.toString(), name: genre["attributes"]["name"] },
    numberInStock: attr["numberInStock"],
    dailyRentalRate: attr["dailyRentalRate"],
    liked: attr["liked"],
  };
};

export const saveMovie = async (movie) => {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    return await http.put(
      "/api/movies/" + movie._id,
      body,
      auth.authorization()
    );
  }

  return await http.post(
    "/api/movies",
    {
      data: {
        ...body,
      },
    },
    auth.authorization()
  );
};
export const deleteMovie = async (id) => {
  return await http.delete("/api/movies/" + id, auth.authorization());
};
