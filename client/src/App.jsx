 import "./CSS/App.css";
import "./CSS/Responsive.css";
import { TripsProvider } from "./context/TripsContext";
import Display from "./components/Display/Display";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <TripsProvider>
      <div className="App">
        <h1>เที่ยวไหนดี</h1>
        <SearchBar />
        <Display />
      </div>
    </TripsProvider>
  );
}

export default App;

