import React from "react";
import useTimeVn from "../../hooks/useTimeVn";

const ViewDateAuthorUpdate = ({ isview = true, author = "Andiez le" }) => {
  const { formattedVNTime } = useTimeVn();
  if (isview === true) {
    return (
      <div className="flex gap-x-6 text-white">
        <p className="date capitalize">{formattedVNTime}</p>
        <p className="author capitalize list-item">
          <span className="line-clamp-1">{author}</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center text-white font-bold mt-3">
        <div className="flex gap-x-6">
          <p className="date capitalize">{formattedVNTime}</p>
          <p className="author capitalize list-item">{author}</p>
        </div>
        <span className="flex items-center gap-x-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.00017 15C12.7701 15 15.3556 12.6313 16.7568 10.8705C17.6388 9.76219 17.6388 8.23781 16.7568 7.1295C15.3556 5.36869 12.7701 3 9.00017 3C5.23027 3 2.64471 5.36869 1.24351 7.1295C0.36154 8.23781 0.36154 9.76219 1.24351 10.8705C2.64471 12.6313 5.23027 15 9.00017 15ZM9.00016 12C10.657 12 12.0002 10.6569 12.0002 9C12.0002 7.34315 10.657 6 9.00016 6C7.34331 6 6.00016 7.34315 6.00016 9C6.00016 10.6569 7.34331 12 9.00016 12Z"
              fill="#ffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.50132 8.93645C7.50044 8.95753 7.5 8.97871 7.5 9C7.5 9.38042 7.64161 9.72776 7.875 9.99218C8.04633 10.1863 8.26712 10.3357 8.51765 10.4208C8.66903 10.4721 8.83126 10.5 9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.83126 10.4721 8.66903 10.4208 8.51765C10.3357 8.26712 10.1863 8.04633 9.99218 7.875C9.72776 7.64161 9.38042 7.5 9 7.5C8.97871 7.5 8.95753 7.50044 8.93645 7.50132C8.97761 7.61824 9 7.74401 9 7.875C9 7.97309 8.98745 8.06824 8.96386 8.15895C8.86162 8.55209 8.55209 8.86162 8.15895 8.96386C8.06824 8.98745 7.97309 9 7.875 9C7.74401 9 7.61824 8.97761 7.50132 8.93645Z"
              fill="#ffff"
            />
          </svg>
          1204
        </span>
      </div>
    );
  }
};

export default ViewDateAuthorUpdate;
