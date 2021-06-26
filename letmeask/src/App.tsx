
import { BrowserRouter, Route , Switch} from "react-router-dom";
import { AuthContextProvider } from './contexts/Auth.context';
import { HomeComponent } from "./pages/Home.component";
import { NewRoomComponent } from "./pages/NewRoom.component";
import { RoomComponent } from "./pages/Room.components";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/rooms/new"  component={NewRoomComponent} />
          <Route path="/rooms/:id" component={RoomComponent} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
