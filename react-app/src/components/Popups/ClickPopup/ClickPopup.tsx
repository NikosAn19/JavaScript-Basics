import { PistonFields } from "../../../Types/PistonFields";
import { useModalContext } from "../../Context/ModalProvider";
import _ from "lodash";
import "./ClickPopup.css";
import { useDeleteQuery } from "./useDeleteQuery";

type ClickPopupProps = {
  top: number;
  left: number;
  selectedRow: PistonFields; // Προσαρμόστε τον τύπο ανάλογα με τα δεδομένα σας
  onClose: () => void;
  triggerUpdate: () => void;
};

export default function ClickPopup({
  top,
  left,
  selectedRow,
  onClose,
  triggerUpdate,
}: ClickPopupProps) {
  const { updateEditData, updateEditVisible } = useModalContext();

  const { deleteData, loading } = useDeleteQuery();

  const handleDeleteOnClick = () => {
    deleteData(selectedRow).then((results) => {
      console.log(results);
      triggerUpdate();
    });
    onClose();
  };

  const setEditVisible = () => {
    updateEditVisible(true);
  };

  const setEditData = (selectedRow: PistonFields) => {
    console.log("Selected Row in popup :", selectedRow);
    const filteredData = _.omit(selectedRow, ["_id", "__v"]);
    updateEditData(filteredData);
  };

  const handleEditOnClick = () => {
    setEditData(selectedRow);
    setEditVisible();
    onClose();
  };
  return (
    <div
      className="popup__menu"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <p>
        Selected Row:{" "}
        <span className="highlight__word">{selectedRow?.piston_code}</span>
      </p>
      <button onClick={handleEditOnClick}>Edit</button>
      <button onClick={handleDeleteOnClick}>
        {loading ? "Loading..." : "Delete"}
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
