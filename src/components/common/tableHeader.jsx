import React, { Component } from "react";

export default class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.path.order === "asc") return <p>ASC</p>;
    else return <p>DESC</p>;
  };

  render() {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                scope="col"
                className="py-3 px-6 cursor-pointer"
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}
