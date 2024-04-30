import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Binary,
  ChevronDown,
  ChevronUp,
  FoldHorizontal,
  Minus,
  Proportions,
  SquarePilcrow,
  Tally5,
  UnfoldHorizontal,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { TableContext } from "../context/TableContext";

function HeaderCell({
  title = "",
  mode = "text",
  sort = "none",
  collapsed = false,
  id,
  size = 20,
}) {
  const {
    switchDatatypeMode,
    switchSortMode,
    togleCollapsed,
    setHeaderTitle,
    deleteColumn,
    setSize,
  } = useContext(TableContext);

  const [editMode, setEditMode] = useState(false);

  function handleModeCLick(getMode) {
    switchDatatypeMode(getMode, id);
  }

  function handleSortClick(getSort) {
    switchSortMode(getSort, id, mode);
  }

  function handleCollapsedClick() {
    togleCollapsed(id);
  }

  function handleDeleteClick() {
    deleteColumn(id);
  }

  function handleEditSize(getValue) {
    setSize(getValue, id);
  }

  if (collapsed) {
    return (
      <div
        className={`shrink-0 flex relative justify-between items-center gap-2 w-9 mr-1 mb-1 rounded-md bg-gray-400 px-2 pt-4 min-h-24`}
      >
        <button
          title="развернуть колонку"
          className="absolute left-1 -top-2 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
          onClick={() => handleCollapsedClick()}
        >
          <UnfoldHorizontal
            size={16}
            className="stroke-gray-500 hover:stroke-black transition-all"
          />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${size}rem`,
      }}
      className={`shrink-0 flex relative justify-between items-center gap-2 mr-1 mb-1 rounded-md bg-gray-400 px-2 py-3 min-h-24`}
    >
      <button
        title="свернуть колонку"
        className="absolute left-1 -top-2 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
        onClick={() => handleCollapsedClick()}
      >
        <FoldHorizontal
          size={16}
          className="stroke-gray-500 hover:stroke-black transition-all"
        />
      </button>
      <button
        title="удалить колонку"
        className="absolute left-9 -top-2 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
        onClick={() => handleDeleteClick()}
      >
        <X
          size={16}
          className="stroke-gray-500 hover:stroke-black transition-all"
        />
      </button>
      <button
        disabled={size === 16}
        title="уменьшить колонку"
        onClick={() => handleEditSize(size - 4)}
        className="[&>*]:enabled:hover:stroke-black [&>*]:disabled:cursor-not-allowed [&>*]:disabled:stroke-gray-500 transition-all absolute -top-2 right-24 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
      >
        <ArrowLeftToLine
          size={16}
          className="stroke-gray-500 hover:stroke-black transition-all"
        />
      </button>
      <button
        disabled={size === 20}
        title="размер по умолчанию"
        onClick={() => handleEditSize(20)}
        className="[&>*]:enabled:hover:stroke-black [&>*]:disabled:cursor-not-allowed [&>*]:disabled:stroke-gray-500 transition-all absolute -top-2 right-16 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
      >
        <Proportions size={16} className="stroke-gray-500 " />
      </button>
      <button
        disabled={size === 256}
        title="увеличить колонку"
        onClick={() => handleEditSize(size + 4)}
        className="[&>*]:enabled:hover:stroke-black [&>*]:disabled:cursor-not-allowed [&>*]:disabled:stroke-gray-500 transition-all absolute -top-2 right-8 bg-gray-100 p-1 rounded-full border-2 border-gray-600"
      >
        <ArrowRightToLine size={16} className="stroke-gray-500" />
      </button>
      <div className="flex flex-col">
        <button
          title="Восходящая соритровка"
          onClick={() => handleSortClick("ascending")}
        >
          <ChevronUp
            size={16}
            className={
              sort === "ascending" ? "stroke-green-600" : "stroke-gray-600"
            }
          />
        </button>
        <button title="Нет сортировки" onClick={() => handleSortClick("none")}>
          <Minus
            size={16}
            className={sort === "none" ? "stroke-black" : "stroke-gray-600"}
          />
        </button>
        <button
          title="Нисходящая соритровка"
          onClick={() => handleSortClick("descending")}
        >
          <ChevronDown
            size={16}
            className={
              sort === "descending" ? "stroke-green-600" : "stroke-gray-600"
            }
          />
        </button>
      </div>
      <div
        onClick={() => setEditMode(!editMode)}
        className={
          editMode
            ? `self-end mb-[0.5rem] cursor-pointer min-h-10 min-w-48 text-center pt-1 `
            : `self-end mb-[0.5rem] cursor-pointer min-h-10 min-w-48 text-center pt-1 hover:rounded-md hover:border-2 hover:border-dotted hover:border-black`
        }
      >
        {editMode ? (
          <input
            onBlur={(e) => {
              setHeaderTitle(e.target.value, id);
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setHeaderTitle(e.target.value, id);
                setEditMode(false);
              }
              return;
            }}
            autoFocus
            className="bg-gray-400 text-center h-8"
            value={title}
            onChange={(e) => setHeaderTitle(e.target.value, id)}
          />
        ) : (
          <p className="font-bold">{title}</p>
        )}
      </div>

      <div className="flex flex-col">
        <button
          title="Числовое поле"
          className={
            mode === "number" ? "[&>*]:stroke-black" : "[&>*]:stroke-gray-500"
          }
          onClick={() => handleModeCLick("number")}
        >
          <Tally5 size={20} />
        </button>
        <button
          title="Текстовое поле"
          className={
            mode === "text" ? "[&>*]:stroke-black" : "[&>*]:stroke-gray-500"
          }
          onClick={() => handleModeCLick("text")}
        >
          <SquarePilcrow size={20} />
        </button>

        <button
          title="Логическое да/нет"
          className={
            mode === "boolean" ? "[&>*]:stroke-black" : "[&>*]:stroke-gray-500"
          }
          onClick={() => handleModeCLick("boolean")}
        >
          <Binary size={20} />
        </button>
      </div>
    </div>
  );
}

export default HeaderCell;
