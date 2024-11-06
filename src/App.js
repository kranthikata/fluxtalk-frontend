import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import { ContactsProvider } from "./context/ContactsContext";
import ChatPage from "./components/pages/ChatPage";
import Sidebar from "./components/organisms/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chat" component={ChatPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
