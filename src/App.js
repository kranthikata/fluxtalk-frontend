import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import { NavigationProvider } from "./context/NavigationContext";
import Sidebar from "./components/organisms/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import ContactsSection from "./components/organisms/ContactsSection";
import { ContactsProvider } from "./context/ContactsContext";

function App() {
  return (
    <BrowserRouter>
      <ContactsProvider>
        <SidebarProvider>
          <NavigationProvider>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/registration" component={RegistrationPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/side" component={Sidebar} />
              <Route exact path="/contacts" component={ContactsSection} />
            </Switch>
          </NavigationProvider>
        </SidebarProvider>
      </ContactsProvider>
    </BrowserRouter>
  );
}

export default App;
