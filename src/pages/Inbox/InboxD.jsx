import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardView from "@components/BoardView/BoardView";
import ListView from "@components/ListView/ListView";
import {
  fetchProjects,
  selectProjectError,
  selectProjectLoadingStates,
  selectProjects,
} from "@store/slices/projectSlice";

const PROJECT_STALE_MS = 60 * 1000;

const Inbox = () => {
  const dispatch = useDispatch();
  const typeLayout = useSelector((state) => state.layoutOptions.typeLayout);
  const projects = useSelector(selectProjects);
  const { isLoadingList } = useSelector(selectProjectLoadingStates);
  const projectError = useSelector(selectProjectError);
  const lastFetchedAt = useSelector((state) => state.project.lastFetchedAt);

  const hasProjects = projects.length > 0;

  useEffect(() => {
    const now = Date.now();
    const isStale =
      !lastFetchedAt || now - lastFetchedAt > PROJECT_STALE_MS;

    if (!hasProjects || isStale) {
      dispatch(fetchProjects());
    }
  }, [dispatch, hasProjects, lastFetchedAt]);

  const handleRetry = () => {
    dispatch(fetchProjects());
  };

  const renderView = () => {
    if (typeLayout === "list") {
      return <ListView />;
    }

    return <BoardView />;
  };

  if (isLoadingList && !hasProjects) {
    return (
      <div className="px-7 py-4 text-sm text-gray-500">
        Loading projects...
      </div>
    );
  }

  if (projectError && !hasProjects) {
    return (
      <div className="px-7 py-4">
        <p className="text-sm text-red-500">{projectError}</p>
        <button
          className="mt-2 rounded-md bg-amber-500 px-3 py-1 text-sm text-white hover:bg-amber-600"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-7">
      {renderView()}
    </div>
  );
};

export default Inbox;
