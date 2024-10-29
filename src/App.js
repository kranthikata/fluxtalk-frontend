import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
