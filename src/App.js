import "./App.css";
import MapContainer from "./components/MapContainer";
import SearchPlace from "./components/SearchPlace";

function App() {
  return (
    <body>
      <section className="MainSection">
        <SearchPlace />
        <MapContainer />
      </section>
    </body>
  );
}

export default App;
