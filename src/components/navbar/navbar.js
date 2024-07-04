import React from "react";

const Navbar = ({ setSelectedCategory }) => {
  return (
    <>
      <div className="w-1/3 h-80 bg-white backdrop-blur-lg px-3 py-5 rounded-md flex-col">
        <button>
          <h1 className="text-center align-center justify-center font-bold text-lg text-black-900 dark:text-white">
            All Tasks
          </h1>
        </button>
        <ul className="text-center text-xl font-weight-700 text-black-900 dark:text-white py-3">
          <h4 className="text-left flex-col">
            <li className="py-2">
              <button onClick={() => setSelectedCategory("Favourites")}>
                Favourites
              </button>
            </li>
            <li className="py-2">
              <button onClick={() => setSelectedCategory("Study")}>
                Study
              </button>
            </li>
            <li className="py-2">
              <button onClick={() => setSelectedCategory("Groceries")}>
                Groceries
              </button>
            </li>
            <li className="py-2">
              <button onClick={() => setSelectedCategory("Sports")}>
                Sports
              </button>
            </li>
            <li className="py-2">
              <button onClick={() => setSelectedCategory("Work")}>Work</button>
            </li>
          </h4>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
