import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";
import { TfiMore } from "react-icons/tfi";
import "./BoardTask.css";
const CardSchedule = () => {
  return (
    <div className="board_task group">
      <div className="board_task_content">
        <button className="board_task_button"></button>
        <div className="board_task_checkbox">
          <button>
            <RiCheckboxBlankCircleLine className="text-xl" />
            {/* <RiCheckboxCircleLine className="text-2xl" /> */}
          </button>
        </div>
        <div className="board_task_detail_meta">
          <div className="board_task_detail">
            <div className="board_task_detail_content">
              <div className="board_task_detail_name">
                Task name Lorem ipsum dolor sit amet consectetur adipisicing
                elit.
              </div>
              <div className="board_task_detail_description">
                <p>Lorem, ipsum dolor.</p>
              </div>
            </div>
            <div className="board_task_detail_action">
              <button className="hidden group-hover:inline-block">
                <TfiMore />
              </button>
            </div>
          </div>
          <div className="board_task_meta">
            <button className="due_date_button">
              <span className="due_date_button_text">
                <BsCalendarEvent />
                <span className="ml-1">29 aug 2025</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSchedule;
