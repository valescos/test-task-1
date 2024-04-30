import { createContext, useMemo, useState } from "react";

export const TableContext = createContext();

export function TableContextProvider({ children }) {
  const [tableData, setTableData] = useState({
    headers: [
      {
        title: "",
        mode: "text",
        collapsed: false,
        sort: "none",
        size: 20,
      },
      {
        title: "",
        mode: "text",
        collapsed: false,
        sort: "none",
        size: 20,
      },
      {
        title: "",
        mode: "text",
        collapsed: false,
        sort: "none",
        size: 20,
      },
    ],
    serchParams: {
      all: "",
      0: "",
      1: "",
      2: "",
    },
    body: [
      [
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
      ],
      [
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
      ],
      [
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
        {
          text: "",
          number: 0,
          boolean: false,
        },
      ],
    ],
  });

  const data = useMemo(() => JSON.stringify(tableData), [tableData]);

  function addColumnItem() {
    setTableData((prevData) => {
      const newHeaders = [
        ...prevData.headers,
        {
          title: "",
          mode: "text",
          collapsed: false,
          sort: "none",
          size: 20,
        },
      ];

      const newBody = prevData.body.map((item) => [
        ...item,
        {
          text: "",
          number: 0,
          boolean: false,
        },
      ]);

      const newSerchParams = {
        ...prevData.serchParams,
        [prevData.headers.length]: "",
      };

      return {
        headers: newHeaders,
        body: newBody,
        serchParams: newSerchParams,
      };
    });
  }

  function addRowItem() {
    setTableData((prevData) => {
      const newBody = [
        ...prevData.body,
        new Array(prevData.headers.length).fill({
          text: "",
          number: 0,
          boolean: false,
        }),
      ];
      return {
        headers: prevData.headers,
        body: newBody,
        serchParams: prevData.serchParams,
      };
    });
  }

  function togleCollapsed(id) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((header, index) => {
        if (id === index) {
          return {
            ...header,
            collapsed: !header.collapsed,
          };
        } else return header;
      });
      return {
        headers: newHeaders,
        body: prevData.body,
        serchParams: prevData.serchParams,
      };
    });
  }

  function switchSortMode(sort, id, mode) {
    function sortTableData(body) {
      let newBody = "";

      if (sort === "none") return body;

      if (mode === "number") {
        newBody =
          sort === "descending"
            ? body.sort((a, b) => a[id].number - b[id].number)
            : body.sort((a, b) => b[id].number - a[id].number);
        return newBody;
      }

      if (mode === "text") {
        newBody =
          sort === "descending"
            ? body.sort((a, b) => a[id].text.localeCompare(b[id].text))
            : body.sort((a, b) => -1 * a[id].text.localeCompare(b[id].text));
        return newBody;
      }

      if (mode === "boolean") {
        newBody =
          sort === "descending"
            ? body.sort(
                (a, b) =>
                  -1 *
                  (a[id].boolean === b[id].boolean ? 0 : a[id].boolean ? -1 : 1)
              )
            : body.sort((a, b) =>
                a[id].boolean === b[id].boolean ? 0 : a[id].boolean ? -1 : 1
              );
        return newBody;
      }

      return body;
    }

    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((header, index) => {
        if (id === index) {
          return {
            ...header,
            sort: sort,
          };
        } else
          return {
            ...header,
            sort: "none",
          };
      });
      return {
        headers: newHeaders,
        body: sortTableData(prevData.body),
        serchParams: prevData.serchParams,
      };
    });
  }

  function switchDatatypeMode(datatype, id) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((header, index) => {
        if (id === index) {
          return {
            ...header,
            mode: datatype,
          };
        } else return header;
      });
      return {
        headers: newHeaders,
        body: prevData.body,
        serchParams: prevData.serchParams,
      };
    });
  }

  function getModeById(id) {
    return tableData.headers[id].mode;
  }

  function getSizeById(id) {
    return tableData.headers[id].size;
  }

  function getCollapsedById(id) {
    return tableData.headers[id].collapsed;
  }

  function getSortById(id) {
    return tableData.headers[id].sort;
  }

  function setHeaderTitle(value, id) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((header, index) => {
        if (id === index) {
          return {
            ...header,
            title: value,
          };
        } else return header;
      });
      return {
        headers: newHeaders,
        body: prevData.body,
        serchParams: prevData.serchParams,
      };
    });
  }

  function setBodyText(value, id, headerId) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((item, index) => {
        if (id === index) {
          return {
            ...item,
            sort: "none",
          };
        }
        return item;
      });

      const newBody = prevData.body.map((item, index) => {
        if (id === index) {
          return item.map((i, j) => {
            if (j === headerId) {
              return {
                ...i,
                text: value,
              };
            }
            return i;
          });
        }
        return item;
      });
      return {
        headers: newHeaders,
        body: newBody,
        serchParams: prevData.serchParams,
      };
    });
  }

  function setBodyNumber(value, id, headerId) {
    setTableData((prevData) => {
      const newBody = prevData.body.map((item, index) => {
        if (id === index) {
          return item.map((i, j) => {
            if (j === headerId) {
              return {
                ...i,
                number: value,
              };
            }
            return i;
          });
        }
        return item;
      });
      return {
        headers: prevData.headers,
        body: newBody,
        serchParams: prevData.serchParams,
      };
    });
  }

  function togleBodyBoolean(id, headerId) {
    setTableData((prevData) => {
      const newBody = prevData.body.map((item, index) => {
        if (id === index) {
          return item.map((i, j) => {
            if (j === headerId) {
              return {
                ...i,
                boolean: !i.boolean,
              };
            }
            return i;
          });
        }
        return item;
      });
      return {
        headers: prevData.headers,
        body: newBody,
        serchParams: prevData.serchParams,
      };
    });
  }

  function setSerchParams(value, id) {
    setTableData((prevData) => {
      const newSerchParams = {
        ...prevData.serchParams,
        [id]: value,
      };

      return {
        headers: prevData.headers,
        body: prevData.body,
        serchParams: newSerchParams,
      };
    });
  }

  function deleteColumn(id) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.filter(
        (header, index) => index !== id
      );
      const newBody = prevData.body.map((bodyitem) =>
        bodyitem.filter((item, index) => index !== id)
      );

      const srArray = Object.entries(prevData.serchParams)
        .filter((e) => parseInt(e[0]) !== id)
        .map((e) => {
          if (e[0] === "all") return e;
          if (parseInt(e[0]) < id) return e;
          if (parseInt(e[0]) > id) return [String(parseInt(e[0]) - 1), e[1]];
        });

      const newSerchParams = Object.fromEntries(srArray);

      return {
        headers: newHeaders,
        body: newBody,
        serchParams: newSerchParams,
      };
    });
  }

  function deleteRow(id) {
    setTableData((prevData) => {
      const newBody = prevData.body.filter((item, index) => index !== id);
      return {
        headers: prevData.headers,
        body: newBody,
        serchParams: prevData.serchParams,
      };
    });
  }

  function setSize(value, id) {
    setTableData((prevData) => {
      const newHeaders = prevData.headers.map((header, index) => {
        if (id === index) {
          return {
            ...header,
            size: value >= 16 ? value : 16,
          };
        } else return header;
      });
      return {
        headers: newHeaders,
        body: prevData.body,
        serchParams: prevData.serchParams,
      };
    });
  }

  function updateTableFromJSONfile(fileData) {
    setTableData((prevData) => {
      return {
        headers: fileData.headers,
        body: fileData.body,
        serchParams: fileData.serchParams,
      };
    });
  }

  return (
    <TableContext.Provider
      value={{
        tableData,
        setTableData,
        addColumnItem,
        addRowItem,
        switchDatatypeMode,
        switchSortMode,
        togleCollapsed,
        getModeById,
        getSortById,
        getCollapsedById,
        setHeaderTitle,
        setBodyText,
        setBodyNumber,
        togleBodyBoolean,
        setSerchParams,
        data,
        deleteColumn,
        deleteRow,
        getSizeById,
        setSize,
        updateTableFromJSONfile,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
