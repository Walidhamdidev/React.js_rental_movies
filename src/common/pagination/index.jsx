import _ from "lodash";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onChangePage }) => {
  const getPageNumber = () => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return pages.map((page) => {
      return (
        <li key={page}>
          <Link
            onClick={() => onChangePage(page)}
            className={`px-3 py-2 leading-tight 
             
            ${
              currentPage !== page
                ? "bg-white text-gray-500"
                : "bg-blue-600 text-white"
            } border 
            hover:text-gray-700 
            dark:bg-gray-800 
            dark:border-gray-700 
            dark:text-gray-400
            dark:hover:bg-gray-700
            dark:hover:text-white`}
          >
            {page}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">{getPageNumber()}</ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Pagination;
