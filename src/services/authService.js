import http from "./httpService";

const keyAuthLocalStorage = "data";

const login = async (user) => {
  const authLabel = "/api/auth/local";

  const { email, password } = user;

  const { data } = await http.post(authLabel, {
    identifier: email,
    password: password,
  });

  localStorage.setItem("data", JSON.stringify(data));
};

const getJWT = () => {
  const data = localStorage.getItem(keyAuthLocalStorage);
  const { jwt } = JSON.parse(data);
  return jwt;
};

const authorization = () => {
  return {
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  };
};

const register = async (user) => {
  const authLabel = "/api/auth/local/register";

  const { email, password, name } = user;
  const { data } = await http.post(authLabel, {
    username: name,
    email: email,
    password: password,
  });
  localStorage.setItem("data", JSON.stringify(data));
};

const currentUser = () => {
  try {
    const data = localStorage.getItem(keyAuthLocalStorage);
    const { user } = JSON.parse(data);
    return user;
  } catch (e) {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem(keyAuthLocalStorage);
};

const signUpWithGoogle = async () => {
  console.log("Sign Up with google");
};
const signInWithGoogle = async () => {
  const { data } = http.get("/api/auth/google/callback");
  console.log("Data", data);
  console.log("Sign In with google");
};

const defaultExports = {
  login,
  getJWT,
  authorization,
  register,
  currentUser,
  logout,
  signUpWithGoogle,
  signInWithGoogle,
};

export default defaultExports;
