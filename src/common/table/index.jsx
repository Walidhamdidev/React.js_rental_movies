import React from "react";
import TableBody from "../table-body";
import TableHeader from "../table-header";

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
