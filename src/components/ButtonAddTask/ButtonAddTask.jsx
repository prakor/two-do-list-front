import "./ButtonAddTask.css";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
const ButtonAddTask = () => {
  return (
    <button className="add_task_button group">
      <IoMdAdd className="text-lg text-amber-600 group-hover:hidden" />
      <IoMdAddCircle className="text-lg text-amber-600 hidden group-hover:inline-block" />
      <span>Add Task</span>
    </button>
  );
};

export default ButtonAddTask;

