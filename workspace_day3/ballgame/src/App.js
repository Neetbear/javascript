import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import BallGame from "./pages/BallGame";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <Home />} />
        <Route exact path="/BallGame" component={() => <BallGame />} />
        <Route component={() => <div>Page Not Found</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;