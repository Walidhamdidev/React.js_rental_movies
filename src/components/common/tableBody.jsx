import _ from "lodash";
import React from "react";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    return column.content ? column.content(item) : _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr
            key={item._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {columns.map((column) => (
              <td key={createKey(item, column)} className="py-4 px-6">
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
