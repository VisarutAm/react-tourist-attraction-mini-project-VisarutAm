import { useContext } from "react";
import { TripsContext } from "../../context/TripsContext";

function SearchBar()  {
  const { searchTerm, setSearchTerm } = useContext(TripsContext);

  return (
    <div className="find-tourist-attraction">
      <p className="find-trips">ค้นหาที่เที่ยว</p>
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <hr />
    </div>
  );
};

export default SearchBar;
