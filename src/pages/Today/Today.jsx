import { useSelector } from "react-redux";
import BoardView from "@components/BoardView/BoardView";
import ListView from "@components/ListView/ListView";

const Today = () => {
  const typeLayout = useSelector((state) => state.layoutOptions.typeLayout);

  const renderView = () => {
    if (typeLayout === "list") {
      return <ListView />;
    }

    return <BoardView />;
  };

  return <div className="px-7">{renderView()}</div>;
};

export default Today;
