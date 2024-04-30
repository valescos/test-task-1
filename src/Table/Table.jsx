import { useContext, useState } from "react";
import { TableContext } from "./context/TableContext";
import HeaderCell from "./table-compmnents/HeaderCell";
import ItemCell from "./table-compmnents/ItemCell";
import Serch from "./table-compmnents/Serch";
import GloabalSerch from "./table-compmnents/GloabalSerch";
import { Minus } from "lucide-react";

function Table() {
  const {
    tableData,
    addColumnItem,
    addRowItem,
    data,
    deleteRow,
    updateTableFromJSONfile,
  } = useContext(TableContext);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function hedaleDeleteRow(id) {
    deleteRow(id);
  }

  async function handleUpload() {
    try {
      const resp = await file.text();
      if (resp) {
        const uplodadedData = JSON.parse(resp);
        updateTableFromJSONfile(uplodadedData);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  function handleDownload() {
    const link = document.createElement("a");
    const file = new Blob([data], { type: "aplication/json" });
    link.href = URL.createObjectURL(file);
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleDownload()}
            className="bg-gray-400 px-4 py-1 rounded-md text-white font-bold h-10 hover:scale-105 transition-all"
          >
            Скачать файл JSON
          </button>

          <button
            disabled={file === null}
            onClick={() => handleUpload()}
            className="px-4 py-1 rounded-md font-bold h-10 transition-all
          enabled:text-white enabled:hover:scale-105 enabled:bg-gray-400
          disabled:cursor-not-allowed disabled:border-2 disabled:text-gray-400
          "
          >
            Загрузить из файла JSON
          </button>
          <input
            id="fileinput"
            className="h-10 px-2 
          [&::file-selector-button]:transition-all
          [&::file-selector-button]:cursor-pointer
        [&::file-selector-button]:hover:text-black
          [&::file-selector-button]:border-0
          [&::file-selector-button]:underline
        [&::file-selector-button]:text-gray-400
        [&::file-selector-button]:bg-gray-100
          [&::file-selector-button]:font-bold [&::file-selector-button]:h-10"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <p className="text-rose-600 font-bold">{error}</p>
        </div>
        <div className="flex gap-4 items-center">
          <GloabalSerch />

          <button
            className="bg-gray-400 px-4 py-1 rounded-md text-white font-bold h-10 hover:scale-105 transition-all"
            onClick={() => addColumnItem()}
          >
            Добавить колонку
          </button>
          <button
            className="bg-gray-400 px-4 py-1 rounded-md text-white font-bold h-10 hover:scale-105 transition-all"
            onClick={() => addRowItem()}
          >
            Добавить ряд
          </button>
        </div>
      </div>
      <div className="flex items-center flex-nowrap">
        {tableData.headers.map((header, index) => (
          <HeaderCell key={index} {...header} id={index} />
        ))}
      </div>
      <div>
        {tableData.body.map((row, index) => (
          <div className="flex flex-nowrap relative" key={index}>
            <button
              onClick={() => hedaleDeleteRow(index)}
              className="absolute -left-9 self-center bg-gray-100 p-1 rounded-full border-2 border-gray-300"
            >
              <Minus
                size={20}
                className="stroke-gray-300 hover:stroke-black transition-all"
              />
            </button>
            {row.map((item, i) => (
              <ItemCell key={i} item={item} headerId={i} id={index} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2">
        <div className="flex items-center flex-nowrap">
          {tableData.headers.map((header, index) => (
            <Serch key={index} id={index} {...header} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
