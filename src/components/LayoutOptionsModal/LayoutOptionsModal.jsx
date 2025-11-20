import "./LayoutOptionsModal.css";
import { useState, useRef, useEffect } from "react";
import { MdOutlineViewWeek, MdOutlineViewList } from "react-icons/md";

const LayoutOptionsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState("list");
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        className="layout_options_button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {layout === "list" ? <MdOutlineViewWeek /> : <MdOutlineViewList />}
      </button>

      {/* modal */}
      {isOpen && (
        <div ref={modalRef} className="layout_options_modal">
          <div className="layout_options_content">
            <div className="layout_options_header">
              <div className="layout_options_title">Layout</div>
            </div>
            <div className="layout_options_type">
              <label className="layout_options_type_item">
                <input
                  type="radio"
                  name="layout"
                  value="list"
                  checked={layout === "list"}
                  onChange={() => setLayout("list")}
                />
                <div className="type_item" aria-checked={layout === "list"}>
                  <MdOutlineViewWeek />
                  List
                </div>
              </label>
              <label className="layout_options_type_item">
                <input
                  type="radio"
                  name="layout"
                  value="board"
                  checked={layout === "board"}
                  onChange={() => setLayout("board")}
                />
                <div className="type_item" aria-checked={layout === "board"}>
                  <MdOutlineViewList />
                  Board
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutOptionsModal;
