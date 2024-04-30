import Table from "./Table/Table";
import { TableContextProvider } from "./Table/context/TableContext";

function App() {
  return (
    <TableContextProvider>
      <Table />
    </TableContextProvider>
  );
}

export default App;
