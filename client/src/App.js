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
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/steps" element={<ProfileSteps />} />
        <Route exact path="/chat" element={<Messenger />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="*" element={<Homepage />} />
      </Switch>
    </>
  );
}

export default App;
