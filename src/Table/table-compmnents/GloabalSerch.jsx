import { useContext } from "react";
import { TableContext } from "../context/TableContext";

function GloabalSerch() {
  const { tableData, setSerchParams } = useContext(TableContext);

  function handleChangeParam(event) {
    setSerchParams(event.target.value, "all");
  }

  return (
    <input
      value={tableData.serchParams["all"]}
      onChange={(e) => handleChangeParam(e)}
      placeholder="Поиск по всем колонкам"
      type="text"
      className="text-center border-2 border-gray-400 flex relative items-center justify-center gap-2 basis-80 rounded-md px-2 py-1 h-10"
    />
  );
}

export default GloabalSerch;
