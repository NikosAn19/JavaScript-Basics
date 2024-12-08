import { useEffect, useState } from "react";
import CheckMarkSVG from "../SVGs/CheckMarkSVG";
import "./ItemAdded.css";

type ItemAddedProps = {
  itemType: string;
  codeName: string | undefined;
  duration?: number;
};

export default function ItemAdded({
  itemType,
  codeName,
  duration = 3000,
}: ItemAddedProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Κάνουμε το pop-up εμφανές
    setShowPopup(true);

    // Κρύβουμε το pop-up μετά το διάστημα του `duration`
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, duration);

    // Καθαρίζουμε το timer όταν αποσυνδέεται το component
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className={
          showPopup ? "container__popup__show" : "container__popup__hide"
        }
      >
        <p>
          {itemType} with code {codeName} added{" "}
        </p>
        <CheckMarkSVG />
      </div>
    </>
  );
}
