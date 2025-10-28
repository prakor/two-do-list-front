import React from "react";
import { MdOutlineViewWeek } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const routeName = location.pathname;

  const TaskToday = () => {
    return (
      <div className="task-today flex flex-row justify-center items-center gap-2">
        <CiCircleCheck className="text-base text-gray-500" />{" "}
        <div className="text-sm leading-5 text-gray-500">0 tasks</div>
      </div>
    );
  };

  return (
    <>
      <div className="header-options flex flex-row justify-center align-center h-12 px-3">
        <div className="w-full"></div>
        <div className="w-auto flex flex-row justify-center">
          <button
            className="cursor-pointer"
            onClick={() => console.log(routeName)}
          >
            <MdOutlineViewWeek className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="header-title flex flex-col gap-2 mx-7 my-2">
        <div className="header-title text-2xl font-extrabold">Today</div>
        <div className="header-subtitle w-full">
          <div className="flex flex-row">
            {routeName === "/app/today" && <TaskToday />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
