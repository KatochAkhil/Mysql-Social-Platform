import "./App.css";
import { Route, Routes as Switch } from "react-router-dom";
import Header from "./common/header";
import Login from "./pages/auth/login";
import Homepage from "./pages/home";
import Register from "./pages/auth/register";
import Profile from "./pages/profile";
import ProfileSteps from "./pages/profile/steps/profileSteps";
import Messenger from "./pages/messenger";

function App() {
  const user = localStorage.getItem("user");
   
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" element={user ? <Homepage /> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Homepage /> : <Register />}
        />

        <Route exact path="/profile" element={user ? <Profile /> : <Login />} />
        <Route
          exact
          path="/steps"
          element={user ? <ProfileSteps /> : <Login />}
        />
        <Route
          exact
          path="/chat"
          element={user ? <Messenger /> : <Login />}
        />
        <Route exact path="*" element={user ? <Homepage /> : <Login />} />
      </Switch>
    </>
  );
}

export default App;
