import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginFormContainer from "./components/containers/LoginFormContainer";
import RegisterFormContainer from "./components/containers/RegisterFormContainer";
import Auth from "./hoc/Auth";
import Home from "./components/views/Home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, false)} />
        <Route exact path="/home" component={Auth(Home, true)} />
      </Switch>
    </Router>
  );
}

export default App;
