import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Table from "./components/Table";
import useData from "./hooks/useData";
function App() {
  const data = useData();
  console.log(data);
  return (
    <>
      <Sort />
      <Filter />
      <Table />
    </>
  );
}

export default App;
