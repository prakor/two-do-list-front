import "./TaskEditor.css";
import { IoCloseOutline, IoSend  } from "react-icons/io5";

const TaskEditor = () => {
  return (
    <div className="task_editor">
      <form action="" className="task_editor_form">
        <div className="task_editing_area">
          <div className="task_editor_input_field">
            <div className="task_editor_name">
              <div className="w-full">
                <input
                  className="task_editor_input_name focus:outline-none"
                  placeholder="Task name"
                />
              </div>
            </div>
            <div className="task_editor_description">
              <div className="w-full">
                <input
                  className="task_editor_input_description focus:outline-none"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="task_editor_footer">
          <div className="task_editor_action">
            <button className="task_editor_cancel_button">
              <IoCloseOutline/>
            </button>
            <button className="task_editor_submit_button" type="submit">
              <IoSend/>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskEditor;
