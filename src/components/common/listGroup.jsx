import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ListGroup extends Component {
  render() {
    const { items, onItemSelect, valueProperty, nameProperty, selectedGenre } =
      this.props;
    return (
      <div className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {items.map((item) => {
          return (
            <Link
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              className={`
              block 
              ${selectedGenre === item ? "text-white bg-blue-700" : ""}
              py-2 px-4 w-full border-b 
              border-gray-200 cursor-pointer 
              dark:border-gray-600 dark:hover:bg-gray-600 
              dark:hover:text-white dark:focus:ring-gray-500
               dark:focus:text-white`}
            >
              {item[nameProperty]}
            </Link>
          );
        })}
      </div>
    );
  }
}

ListGroup.defaultProps = {
  valueProperty: "_id",
  nameProperty: "name",
};
