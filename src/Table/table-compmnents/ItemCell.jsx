import { useContext, useState } from "react";
import { TableContext } from "../context/TableContext";
import { Check, PencilRuler, X } from "lucide-react";

function ItemCell({ item, headerId, id }) {
  const { text, number, boolean } = item;
  const {
    tableData,
    getModeById,
    getSizeById,
    getCollapsedById,
    setBodyText,
    setBodyNumber,
    togleBodyBoolean,
  } = useContext(TableContext);

  const [editTextMode, setEditTextMode] = useState(false);
  const [editNumberMode, setEditNumberMode] = useState(false);

  const collapsed = getCollapsedById(headerId);
  const mode = getModeById(headerId);

  function handleClick() {
    switch (mode) {
      case "text":
        setEditTextMode((prev) => !prev);
        break;
      case "number":
        setEditNumberMode((prev) => !prev);
        break;
      case "boolean":
        togleBodyBoolean(id, headerId);
        break;
      default:
        break;
    }
  }

  if (collapsed) {
    return (
      <div
        className={`shrink-0 flex justify-between gap-2 w-9 mr-1 mb-1 rounded-md bg-gray-300 px-2 py-1`}
      >
        <p className="min-h-6"></p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${getSizeById(headerId)}rem`,
      }}
      className={`min-h-8 shrink-0 flex relative items-center justify-center gap-2 mr-1 mb-1 rounded-md bg-gray-300 px-2 py-1`}
    >
      <button
        className={
          editNumberMode || editTextMode ? "hidden" : " absolute left-2"
        }
        onClick={() => handleClick()}
      >
        <PencilRuler
          size={18}
          className="stroke-gray-400 hover:stroke-gray-600 transition-all"
        />
      </button>
      {mode === "text" ? (
        editTextMode ? (
          <input
            type="text"
            onBlur={(e) => {
              setBodyText(e.target.value, id, headerId);
              setEditTextMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditTextMode(false);
              }
              return;
            }}
            autoFocus
            className="bg-gray-300 text-center"
            value={text}
            onChange={(e) => setBodyText(e.target.value, id, headerId)}
          />
        ) : (
          <p
            className={
              (tableData.serchParams[headerId] &&
                text.includes(tableData.serchParams[headerId])) ||
              (tableData.serchParams["all"] &&
                text.includes(tableData.serchParams["all"]))
                ? "bg-rose-300 font-bold px-2 min-w-40 text-center cursor-pointer"
                : "min-w-40 text-center cursor-pointer"
            }
            onClick={() => setEditTextMode(true)}
          >
            {text || <span className="text-gray-400">***</span>}
          </p>
        )
      ) : mode === "number" ? (
        editNumberMode ? (
          <input
            type="number"
            onBlur={(e) => {
              setBodyNumber(e.target.value, id, headerId);
              setEditNumberMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setBodyNumber(e.target.value, id, headerId);
                setEditNumberMode(false);
              }
              return;
            }}
            autoFocus
            className="bg-gray-300 text-center ml-[16px]"
            value={number}
            onChange={(e) => setBodyNumber(e.target.value, id, headerId)}
          />
        ) : (
          <p
            className={
              tableData.serchParams[headerId] === number.toString() ||
              tableData.serchParams["all"] === number.toString()
                ? "bg-rose-300 font-bold px-2 min-w-40 text-center cursor-pointer"
                : "min-w-40 text-center cursor-pointer"
            }
            onClick={() => setEditNumberMode(true)}
          >
            {number}
          </p>
        )
      ) : boolean ? (
        <div
          className={
            tableData.serchParams[headerId] === boolean.toString() ||
            tableData.serchParams["all"] === boolean.toString()
              ? "bg-rose-300 font-bold px-2"
              : null
          }
        >
          <Check
            onClick={() => togleBodyBoolean(id, headerId)}
            className="stroke-green-600 cursor-pointer"
          />
        </div>
      ) : (
        <div
          className={
            tableData.serchParams[headerId] === boolean.toString() ||
            tableData.serchParams["all"] === boolean.toString()
              ? "bg-rose-300 font-bold px-2"
              : null
          }
        >
          <X
            onClick={() => togleBodyBoolean(id, headerId)}
            className="stroke-rose-600 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default ItemCell;
