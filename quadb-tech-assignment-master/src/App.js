import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
// import Jobs from "./components/Jobs";
// import JobItemDetails from "./components/JobItemDetails";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => (
  <Routes>
    <Route exact path="/login" component={<Login />} />
    <Route exact path="/" component={<Home />} />

    <Route exact path="/signup" component={<Signup />} />
    {/* <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} /> */}
    <Route component={<NotFound />} />
  </Routes>
);

export default App;
