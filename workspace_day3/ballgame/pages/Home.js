import '../App.css';
import { Link } from "react-router-dom";
import logo from './logo.svg';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Home;