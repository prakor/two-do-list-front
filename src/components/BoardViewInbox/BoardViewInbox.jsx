import "./BoardViewInbox.css";
import BoardTask from "@components/BoardTask/BoardTask";
import ButtonAddTask from "@components/ButtonAddTask/ButtonAddTask";
import TaskEditor from "@components/TaskEditor/TaskEditor";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
const BoardViewInbox = ({ inboxItems }) => {

  const InboxSections = () => (
    <>
      {inboxItems.map((item, index) => (
        <section key={item.id ?? `inbox-section-${index}`} className="board_section">
          <header className="board_section_header">
            <div className="board_section_info">
              <h3 className="text-sm font-semibold mr-1">{item.name || "Untitled Inbox"}</h3>
            </div>
          </header>
        </section>
      ))}
    </>
  )


  return (
    <div className="board_view_section">
      {inboxItems.length > 0 ? (
        <InboxSections />
      ) : (
        <p className="text-sm text-gray-500">No items in the inbox.</p>
      )}
      <div className="board_section">
        <button>
          <IoMdAdd className="text-lg text-amber-600 group-hover:hidden" />
          <IoMdAddCircle className="text-lg text-amber-600 hidden group-hover:inline-block" />
          <span>Create Project</span>
        </button>
      </div>
      {/* <section className="board_section">
        <header className="board_section_header">
          <div className="board_section_info">
            <h3 className="text-sm font-semibold mr-1">Overdue</h3>
            <p className="text-sm">0</p>
          </div>
          <div className="board_section_actions">
            <button className="text-sm mx-1">
              <span>Reschedule</span>
            </button>
          </div>
        </header>
        <div className="board_item_list">
          <BoardTask />
          <BoardTask />
        </div>
      </section>
      <section className="  ">
        <header className="board_section_header">
          <div className="board_section_info">
            <h3 className="text-sm font-semibold mr-1">0 Months . Today</h3>
            <p className="text-sm">0</p>
          </div>
        </header>
        <div className="board_item_list">
          <BoardTask />
        </div>
        <footer className="board_section_footer">
          <ButtonAddTask />
          <TaskEditor />
        </footer>
      </section> */}
    </div>
  );
};

export default BoardViewInbox;
