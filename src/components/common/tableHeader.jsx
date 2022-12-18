import React from "react";

const TableHeader = ({ sortColumn: sortColumnProp, onSort, columns }) => {
  const raiseSort = (path) => {
    const sortColumn = { ...sortColumnProp };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumnProp.path) return null;
    if (sortColumnProp.path.order === "asc")
      return <ion-icon name="chevron-down-outline"></ion-icon>;
    else return <ion-icon name="chevron-up-outline"></ion-icon>;
  };

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column) => {
          return (
            <th
              scope="col"
              className="py-3 px-6 cursor-pointer"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
