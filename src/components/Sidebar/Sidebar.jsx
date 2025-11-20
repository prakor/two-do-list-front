import { NavLink } from "react-router";
import { FaRegUserCircle, FaInbox, FaCalendarAlt } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddCircle, MdToday } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <nav className="h-screen w-95 flex flex-row bg-gray-50 relative">
      {/* side bar */}
      <div className="w-full">
        <div className="flex flex-row justify-between m-2">
          <button className="flex flex-row items-center p-2 rounded-md gap-2 hover:bg-gray-200 cursor-pointer">
            <div className="avatar">
              <div className="rounded-full">
                <FaRegUserCircle className="text-2xl" />
              </div>
            </div>
            <div>doublewiii</div>
            <IoIosArrowDown />
          </button>
          <div className="flex flex-row items-center gap-2">
            <button className="btn btn-ghost btn-sm rounded-md p-2 hover:bg-gray-200 cursor-pointer">
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
        <div className="">
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
                    <NavLink to="app/inbox" className="flex flex-row p-2 items-center gap-2 cursor-pointer">
                      <FaInbox className="text-lg" />
                      <span>Inbox</span>
                    </NavLink>
                  </div>
                </li>
                <li>
                  <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                    <NavLink to="app/today" className="flex flex-row p-2 items-center gap-2 cursor-pointer">
                      <MdToday className="text-lg" />
                      <span>Today</span>
                    </NavLink>
                  </div>
                </li>
                <li>
                  <div className="rounded-md hover:bg-gray-200 cursor-pointer">
                    <NavLink to="app/upcoming" className="flex flex-row p-2 items-center gap-2 cursor-pointer">
                      <FaCalendarAlt className="text-lg" />
                      <span>Upcoming</span>
                    </NavLink>
                  </div>
                </li>
              </ul>
              <div className="my-project">
                <div className="rounded-md hover:bg-gray-200">
                  <NavLink to="app/projects" className="flex flex-row p-2 items-center gap-2">
                    <span className="font-semibold">My Projects</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="handle-navigator bg-gray-50 hover:bg-gray-200"></div>
    </nav>
  );
};

export default Sidebar;
