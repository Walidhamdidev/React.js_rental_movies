import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/userContext";
import auth from "./services/authService";
import { useEffect, useState } from "react";
import Layout from "./components/common/layout";

const Index = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser();
    setUser(currentUser);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser: user }}>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
