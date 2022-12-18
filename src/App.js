import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import logger from "./services/logService";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./pages/customers";
import Login from "./pages/login";
import MovieForm from "./pages/movieForm";
import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Rentals from "./pages/rentals";
import UserContext from "./context/userContext";

logger.init();

const App = () => {
  const { currentUser: user } = useContext(UserContext);

  return (
    <div className="container m-auto px-10">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<Movies user={user} />} />
        <Route
          path="/movies/new"
          element={user ? <MovieForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/movies/:id"
          element={user ? <MovieForm /> : <Navigate to="/login" />}
        />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="notFound" />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
