import "./App.css";
import "./styles/style.css";
import Home from "./views/home";
import Login from "./views/login";
import MovieDetail from "./views/MovieDetail";

function App() {
  return (
    <div className="relative w-full h-full">
      {/* <Home /> */}
      {/* <Login /> */}
      <MovieDetail />
    </div>
  );
}

export default App;
