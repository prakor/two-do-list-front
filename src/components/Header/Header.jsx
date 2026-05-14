import { CiCircleCheck } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import LayoutOptionsModal from "@components/LayoutOptionsModal/LayoutOptionsModal";

const ROUTE_TITLES = {
  "/app/inbox": "Inbox",
  "/app/today": "Today",
  "/app/upcoming": "Upcoming",
  "/app/projects": "Projects",
};

const TaskToday = () => {
  return (
    <div className="task-today flex flex-row justify-center items-center gap-2">
      <CiCircleCheck className="text-base text-gray-500" />
      <div className="text-sm leading-5 text-gray-500">0 tasks</div>
    </div>
  );
};

function Header() {
  const location = useLocation();
  const routeName = location.pathname;
  const title = ROUTE_TITLES[routeName] || "";

  return (
    <>
      <div className="header-options flex flex-row justify-center align-center h-12 px-3">
        <div className="w-full" />
        <div className="w-auto flex flex-row justify-center items-center relative">
          <LayoutOptionsModal />
        </div>
      </div>
      <div className="header-title flex flex-col gap-2 mx-7 my-2">
        <div className="header-title text-2xl font-extrabold">{title}</div>
        <div className="header-subtitle w-full">
          <div className="flex flex-row">{routeName === "/app/today" && <TaskToday />}</div>
        </div>
      </div>
    </>
  );
}

export default Header;
