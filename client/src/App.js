import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPageContainer from "./components/containers/LoginPageContainer";
import RegisterPageContainer from "./components/containers/RegisterPageContainer";
import Auth from "./hoc/Auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route
          exact
          path="/login"
          component={Auth(LoginPageContainer, false)}
        />
        <Route
          exact
          path="/register"
          component={Auth(RegisterPageContainer, false)}
        />
      </Switch>
    </Router>
  );
}

export default App;
