
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/Auth.context';
import { HomeComponent } from "./pages/Home.component";
import { NewRoomComponent } from "./pages/NewRoom.component";

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/rooms/new" component={NewRoomComponent} />
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
