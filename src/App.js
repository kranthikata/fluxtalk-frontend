import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationForm from "./components/organisms/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/registration" component={RegistrationForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
