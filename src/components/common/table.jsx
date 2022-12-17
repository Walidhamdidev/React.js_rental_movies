import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

function Table({ data, columns, sortColumn, onSort }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
