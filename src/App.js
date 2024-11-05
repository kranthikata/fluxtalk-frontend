import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import { NavigationProvider } from "./context/NavigationContext";
import Sidebar from "./components/organisms/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <NavigationProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/registration" component={RegistrationPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/side" component={Sidebar} />
          </Switch>
        </NavigationProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
