import ListSchedule from "@components/ListSchedule/ListSchedule";
import "./ListViewInbox.css";
const ListViewInbox = ({ inboxItems }) => {
  return (
    <div className='list_view_section'>
      <section className="list_section">
         <ListSchedule />
      </section>
    </div>
  )
}

export default ListViewInbox
