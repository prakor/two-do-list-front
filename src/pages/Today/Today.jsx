import { useState } from "react";
import BoardView from "@components/BoardView/BoardView";
import ListView from "@components/ListView/ListView";

const Today = () => {
  const [typeLayout, setTypeLayout] = useState("board");
  const items = [
    {
      id: "q12w2eewq332r",
      task_name: "Task name",
      task_description: "Task description",
      task_deadline: "2023-01-01",
      task_priority: "High",
      task_status: false,
      task_asset: [],
      task_created_at: "2023-01-01",
      task_updated_at: "2023-01-01",
    },
  ];

  const renderView = () => {
    if (typeLayout === "list") {
      return <ListView />;
    } else if (typeLayout === "board") {
      return <BoardView />;
    }
  };

  return (
    <div className="px-7">
      {renderView()}
      <button onClick={() => setTypeLayout("board")}>Board View</button>
      <hr />
      <button onClick={() => setTypeLayout("list")}>List View</button>
    </div>
  );
};

export default Today;
