import { useContext } from "react";
import { TableContext } from "../context/TableContext";

function Serch({ id, collapsed }) {
  const { tableData, setSerchParams, getSizeById } = useContext(TableContext);

  function handleChangeParam(event) {
    setSerchParams(event.target.value, id);
  }

  if (collapsed) {
    return (
      <div className="bg-white shrink-0 flex justify-between gap-2 w-9 mr-1 mb-1 rounded-md border-2 border-gray-400 px-2 py-1">
        <p className="min-h-6"></p>
      </div>
    );
  }

  return (
    <input
      value={tableData.serchParams[id]}
      onChange={(e) => handleChangeParam(e)}
      placeholder={`Поиск по колонке №${id + 1}`}
      type="text"
      style={{
        width: `${getSizeById(id)}rem`,
      }}
      className={`shrink-0 text-center border-2 border-gray-400 flex relative items-center justify-center gap-2 mr-1 mb-1 rounded-md px-2 py-1`}
    />
  );
}

export default Serch;
