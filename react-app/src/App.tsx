import "./App.css";
import Table from "./components/Tables/Table";
import SideBar from "./components/SideBar/SideBar";
import FilterMenu from "./components/SearchBar/FilterMenu";
import { useTableQuery } from "./components/Tables/useTableQuery";
import Header from "./components/Header/Header";

import ActionBar from "./components/ActionBar/ActionBar";
import { useState } from "react";
import AddNewMenu from "./components/AddNewBar/AddNewMenu";
import ItemAdded from "./components/Popups/Alerts/ItemAdded";
import EditMenu from "./components/EditMenu/EditMenu";
import { useModalContext } from "./components/Context/ModalProvider";

export default function App() {
  const { pistonData, setQuery, triggerUpdate } = useTableQuery();

  // elegxei to popup me to new entry
  const [isAlertVisible, setAlertVisible] = useState(false);

  const [actionType, setActionType] = useState("");

  const handleActionType = (actionType: string) => {
    setActionType(actionType);
  };

  const handleAcceptedVisible = () => {
    setAlertVisible(true);
    console.log("popup mounted");
    setTimeout(() => {
      setAlertVisible(false);
    }, 6000);
  };

  //elegxei to code pou peirame pisw apo to addNew
  const [code, setCode] = useState<string>();
  const handleCode = (code: string | undefined) => {
    setCode(code);
  };

  const { isAddNewVisible, isFilterMenuVisible, isEditVisible, editData } =
    useModalContext();

  return (
    <>
      <Header />
      <main
        className={
          isAddNewVisible || isFilterMenuVisible || isEditVisible
            ? "disabled-content"
            : ""
        }
      >
        <Table pistonData={pistonData} triggerUpdate={triggerUpdate} />
        <SideBar />
        <ActionBar />
      </main>

      <FilterMenu setQuery={setQuery} />
      {isAlertVisible && (
        <ItemAdded itemType="Piston" codeName={code} actionType={actionType} />
      )}

      <AddNewMenu
        setAcceptedVisible={handleAcceptedVisible}
        setCode={handleCode}
        setActionType={handleActionType}
        triggerUpdate={triggerUpdate}
      />
      <EditMenu
        setAcceptedVisible={handleAcceptedVisible}
        pistonData={editData}
        triggerUpdate={triggerUpdate}
        setCode={handleCode}
        setActionType={handleActionType}
      />
    </>
  );
}
