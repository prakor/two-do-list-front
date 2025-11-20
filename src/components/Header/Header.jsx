import { useState, useEffect } from "react";
import { MdOutlineViewWeek } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import LayoutOptionsModal from "@components/LayoutOptionsModal/LayoutOptionsModal";

function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const routeName = location.pathname;
  const routeTitles = {
    "/app/inbox": "Inbox",
    "/app/today": "Today",
    "/app/upcoming": "Upcoming",
    "/app/projects": "Projects",
  }

  const TaskToday = () => {
    return (
      <div className="task-today flex flex-row justify-center items-center gap-2">
        <CiCircleCheck className="text-base text-gray-500" />{" "}
        <div className="text-sm leading-5 text-gray-500">0 tasks</div>
      </div>
    );
  };

  useEffect(() => {
    setTitle(routeTitles[routeName] || "");
  }, [routeName]);

  return (
    <>
      <div className="header-options flex flex-row justify-center align-center h-12 px-3">
        <div className="w-full"></div>
        <div className="w-auto flex flex-row justify-center items-center relative">
          {/* <button
            className="option_view_button cursor-pointer"
            onClick={() => console.log(routeName)}
          >
            <MdOutlineViewWeek className="text-2xl" />
          </button> */}
          <LayoutOptionsModal />
        </div>
      </div>
      <div className="header-title flex flex-col gap-2 mx-7 my-2">
        <div className="header-title text-2xl font-extrabold">{title}</div>
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
