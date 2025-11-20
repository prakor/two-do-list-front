import "./BoardView.css";
import BoardTask from "@components/BoardTask/BoardTask";
import ButtonAddTask from "@components/ButtonAddTask/ButtonAddTask";
import TaskEditor from "@components/TaskEditor/TaskEditor";
const BoardView = () => {
  return (
    <div className="board_view_section">
      <section className="board_section">
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
      <section className="board_section">
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
          <TaskEditor/>
        </footer>
      </section>
    </div>
  );
};

export default BoardView;
