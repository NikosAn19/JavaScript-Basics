import { createContext, PropsWithChildren, useContext, useState } from "react";
import { PistonFields } from "../../Types/PistonFields";

type ModalContextType = {
  isAddNewVisible: boolean;
  updateAddNewVisible: (isVisible: boolean) => void;
  isFilterMenuVisible: boolean;
  updateFilterMenuVisible: (isVisible: boolean) => void;
  isEditVisible: boolean;
  updateEditVisible: (isVisible: boolean) => void;
  editData: PistonFields | {};
  updateEditData: (editData: PistonFields) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("modal context is undefined");
  }

  return context;
};

export default function ModalContextProvider({ children }: PropsWithChildren) {
  const [isAddNewVisible, setAddNewVisible] = useState(false);
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [editData, setEditData] = useState<PistonFields | {}>({});

  const updateEditData = (data: PistonFields | {}) => {
    setEditData(data);
  };

  const updateAddNewVisible = (isVisible: boolean) => {
    setAddNewVisible(isVisible);
  };
  const updateFilterMenuVisible = (isVisible: boolean) => {
    setFilterMenuVisible(isVisible);
  };
  const updateEditVisible = (isVisible: boolean) => {
    setEditVisible(isVisible);
  };

  return (
    <>
      <ModalContext.Provider
        value={{
          isAddNewVisible,
          updateAddNewVisible,
          isFilterMenuVisible,
          updateFilterMenuVisible,
          isEditVisible,
          updateEditVisible,
          editData,
          updateEditData,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
}
