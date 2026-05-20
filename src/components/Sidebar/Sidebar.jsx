import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaRegUserCircle, FaInbox, FaCalendarAlt } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddCircle, MdToday } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import "./Sidebar.css";

const SIDEBAR_MIN_WIDTH = 150;
const SIDEBAR_MAX_WIDTH = 320;
const SIDEBAR_DEFAULT_WIDTH = 280;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  const startXRef = useRef(0);
  const startWidthRef = useRef(SIDEBAR_DEFAULT_WIDTH);

  const userName = useSelector((state) => state.auth.user?.name) || "Workspace";

  const toggleCollapse = () => {
    setIsCollapsed((current) => {
      if (current) {
        setWidth(SIDEBAR_DEFAULT_WIDTH);
      }
      return !current;
    });
  };

  const handleResizeStart = (e) => {
    if (isCollapsed) return;
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  };

  useEffect(() => {
    const handleResizeMove = (e) => {
      if (!isResizing) return;
      const delta = e.clientX - startXRef.current;
      const nextWidth = startWidthRef.current + delta;

      if (nextWidth < SIDEBAR_MIN_WIDTH) {
        setIsCollapsed(true);
        setIsResizing(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        return;
      }

      const clamped = Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, nextWidth));
      setIsCollapsed(false);
      setWidth(clamped);
    };

    const handleResizeEnd = () => {
      if (!isResizing) return;
      setIsResizing(false);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  return (
    <nav
      className="h-screen bg-gray-50 relative flex-shrink-0 transition-all duration-200 border-r border-gray-200"
      style={{ width: isCollapsed ? "0px" : `${width}px` }}
    >
      <div className={`h-full overflow-hidden ${isCollapsed ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between m-2">
          <button className="flex flex-row items-center p-2 rounded-md gap-2 hover:bg-gray-200 cursor-pointer">
            <div className="avatar">
              <div className="rounded-full">
                <FaRegUserCircle className="text-2xl" />
              </div>
            </div>
            <div>{userName}</div>
            <IoIosArrowDown />
          </button>
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={toggleCollapse}
              className="btn btn-ghost btn-sm rounded-md p-2 hover:bg-gray-200 cursor-pointer"
            >
              <FiSidebar />
            </button>
          </div>
        </div>

        <div className="m-2 rounded-md hover:bg-gray-200 cursor-pointer">
          <button className="flex flex-row p-2 items-center gap-2 cursor-pointer">
            <MdOutlineAddCircle className="text-2xl" />
            <span>Add task</span>
          </button>
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-3 pl-2 pr-2">
            <ul>
              <li>
                <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                  <button className="flex flex-row p-2 items-center gap-2 cursor-pointer">
                    <CiSearch className="text-lg" />
                    <span>Search</span>
                  </button>
                </div>
              </li>
              <li>
                <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                  <NavLink
                    to="/app/inbox"
                    className={({ isActive }) =>
                      `flex flex-row p-2 items-center gap-2 rounded-md cursor-pointer transition-colors ${isActive ? "bg-amber-100 text-amber-700 font-medium" : "hover:bg-gray-200"
                      }`
                    }
                  >
                    <FaInbox className="text-lg" />
                    <span>Inbox</span>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                  <NavLink
                    to="/app/today"
                    className={({ isActive }) =>
                      `flex flex-row p-2 items-center gap-2 rounded-md cursor-pointer transition-colors ${isActive ? "bg-amber-100 text-amber-700 font-medium" : "hover:bg-gray-200"
                      }`
                    }
                  >
                    <MdToday className="text-lg" />
                    <span>Today</span>
                  </NavLink>
                </div>
              </li>
              <li>
                <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                  <NavLink
                    to="/app/upcoming"
                    className={({ isActive }) =>
                      `flex flex-row p-2 items-center gap-2 rounded-md cursor-pointer transition-colors ${isActive ? "bg-amber-100 text-amber-700 font-medium" : "hover:bg-gray-200"
                      }`
                    }
                  >
                    <FaCalendarAlt className="text-lg" />
                    <span>Upcoming</span>
                  </NavLink>
                </div>
              </li>
            </ul>
            <div className="my-project">
              <div className="rounded-md hover:bg-gray-200">
                <NavLink
                  to="/app/projects"
                  className={({ isActive }) =>
                    `flex flex-row p-2 items-center gap-2 rounded-md cursor-pointer transition-colors ${isActive ? "bg-amber-100 text-amber-700 font-medium" : "hover:bg-gray-200"
                    }`
                  }
                >
                  <span className="font-semibold">My Projects</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`handle-navigator ${isResizing ? "is-resizing" : ""}`}
        onMouseDown={handleResizeStart}
      />

      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="p-3 hover:bg-gray-200 rounded-md cursor-pointer transition duration-200 ease-out"
        >
          <FiSidebar className="text-xl" />
        </button>
      )}
    </nav>
  );
};

export default Sidebar;
