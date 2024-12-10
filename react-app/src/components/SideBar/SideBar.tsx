import "./SideBar.css";
import "../SVGs/PistonSVG";
import PistonSVG from "../SVGs/PistonSVG";
import HamburgerSVG from "../SVGs/HamburgerSVG";
import RodSVG from "../SVGs/RodSVG";
import { useState } from "react";

export default function SideBar() {
  const [hovered, setHovered] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const content = [{ svg: PistonSVG, text: "Pistons" }];

  const handleItemClick = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index)); // Αν είναι ήδη επιλεγμένο, αποεπιλέγεται
  };

  return (
    <>
      <nav
        className={`container__sidebar ${
          hovered || selectedIndex !== null ? "expanded" : ""
        }`}
      >
        <ul>
          {content.map((item, index) => (
            <li
              key={index}
              className={selectedIndex === index ? "selected" : ""}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => handleItemClick(index)}
            >
              <span className="svg__container">
                <item.svg />
              </span>
              <span className="span__text">
                {hovered || selectedIndex !== null ? item.text : ""}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
