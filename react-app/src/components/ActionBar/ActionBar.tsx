import { useModalContext } from "../Context/ModalProvider";
import PlusSVG from "../SVGs/PlusSVG";
import SearchSVG from "../SVGs/SearchSVG";
import "./ActionBar.css";

export default function ActionBar() {
  const { updateAddNewVisible, updateFilterMenuVisible } = useModalContext();

  const handleFilterMenuVisible = () => {
    updateFilterMenuVisible(true);
  };

  const handleAddNewVisible = () => {
    updateAddNewVisible(true);
  };
  return (
    <>
      <div className="container__actionbar">
        <nav className="nav__actionbar">
          <ul>
            <li onClick={handleFilterMenuVisible}>
              <SearchSVG />
            </li>
            <li onClick={handleAddNewVisible}>
              <PlusSVG />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
