import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardView from "@components/BoardView/BoardView";
import ListView from "@components/ListView/ListView";
import { selectProjects, fetchProjects, selectProjectLoadingStates, selectProjectError } from "@store/slices/projectSlice"; 
const Inbox = () => {
  const dispatch = useDispatch();
  const typeLayout = useSelector((state) => state.layoutOptions.typeLayout);
  const projects = useSelector(selectProjects);
  // const { isLoadingList } = useSelector(selectProjectLoadingStates);
  // const projectError = useSelector(selectProjectError);

  useEffect(() => {
      console.log("Inbox component mounted");
    dispatch(fetchProjects());

    console.log('--- Current projects in state:', projects);
  }, []);

  const renderView = () => {
    if (typeLayout === "list") {
      return <ListView />;
    }

    return <BoardView />;
  };

  return (
    <div className="px-7">
      <pre>
       { projects.length > 0 ? JSON.stringify(projects, null, 2) : "No projects found"  }
      </pre>
      { renderView()}
    </div>
  );
};

export default Inbox;
