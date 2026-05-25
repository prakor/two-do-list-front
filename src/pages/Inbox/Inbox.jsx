import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListViewInbox from "@components/ListViewInbox/ListViewInbox";
import BoardViewInbox from "@components/BoardViewInbox/BoardViewInbox";
import { useInboxItems } from "@hooks/useInboxItems";

const Inbox = () => {
  const typeLayout = useSelector((state) => state.layoutOptions.typeLayout);
  const { inboxItems, loading, error } = useInboxItems();

   if (loading) {
     return <div>Loading inbox...</div>;
   }

  const renderView = () => {
    if (typeLayout === "list") {
      return <ListViewInbox inboxItems={inboxItems} />;
    }

    return <BoardViewInbox inboxItems={inboxItems} />;
  };

  return (
    <div className="px-7">
      { renderView()}
    </div>
  );
};

export default Inbox;
