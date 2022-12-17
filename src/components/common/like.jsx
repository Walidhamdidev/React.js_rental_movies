import React, { Component } from "react";

export default class Like extends Component {
  render() {
    const { like, onLike } = this.props;

    const backgroundColor = like ? "bg-red-700" : "bg-yellow-500";

    const color = like ? "text-white" : "text-black";

    return (
      <button
        className={`${color} ${backgroundColor}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        onClick={onLike}
      >
        Like
      </button>
    );
  }
}
