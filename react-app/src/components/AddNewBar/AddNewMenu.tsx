import { useEffect, useState } from "react";
import "./AddNewMenu.css";
import { useFilterMenuQuery } from "../SearchBar/useFilterMenuQuery";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { PistonFields } from "../../Types/PistonFields";
import { useAddNewQuery } from "./useAddNewQuery";
import { useModalContext } from "../Context/ModalProvider";

type AddNewMenuProps = {
  // setQuery: (query: PistonFields) => void;

  setAcceptedVisible: () => void;
  setCode: (code: string | undefined) => void;
  triggerUpdate: () => void;
};

export default function AddNewMenu({
  setAcceptedVisible,
  setCode,
  triggerUpdate,
}: AddNewMenuProps) {
  const { fields, loading, formatedFields } = useFilterMenuQuery();
  const [isMinimized, setIsMinimized] = useState(false);

  const { waitingForItems, fetchData, dataAccepted, code, handleData } =
    useAddNewQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PistonFields>();

  const { isAddNewVisible, updateAddNewVisible } = useModalContext();

  const handleAddNewClose = () => {
    updateAddNewVisible(false);
  };

  const onSubmit: SubmitHandler<PistonFields> = (data) => {
    console.log("Data before sending ", data);
    fetchData(data).then(triggerUpdate);

    handleAddNewClose();
  };
  const validationRules = {
    piston_code: {
      // required: "Piston Code is required",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Piston Code should be alphanumeric",
      },
    },
    brand: {
      // required: "Brand is required",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Brand should be a alphanumeric",
      },
    },
    model: {
      // required: "Model is required",
      pattern: {
        value: /^[A-Za-z0-9]+$/,
        message: "Model should be a alphanumeric",
      },
    },
    tact: {
      // required: "Tact is required",
      validate: {
        validTact: (value: any) =>
          value === "" ||
          value === "4T" ||
          value === "2T" ||
          "Tact should be 4T or 2T",
      },
    },
    diameter: {
      // required: "Diameter is required",
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message:
          "Diameter should be a valid number (only numbers and dots allowed)",
      },
    },
    pin_diameter: {
      // required: "Pin Diameter is required",
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message:
          "Pin Diameter should be a valid number (only numbers and dots allowed)",
      },
    },
    total_height: {
      // required: "Total Height is required",
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message:
          "Total Height should be a valid number (only numbers and dots allowed)",
      },
    },
    compression_height: {
      // required: "Compression Height is required",
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message:
          "Compression Height should be a valid number (only numbers and dots allowed)",
      },
    },
    oversize: {
      // required: "Oversize is required",
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message:
          "Oversize should be a valid number (only numbers and dots allowed)",
      },
    },
  };

  useEffect(() => {
    if (dataAccepted) {
      setAcceptedVisible();
      setCode(code);
    }

    return () => {
      handleData();
    };
  }, [dataAccepted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAddNewVisible) {
    return null;
  }

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <div className="addnewmenu__overlay" onClick={handleAddNewClose}></div>
      <div
        className={`search__container ${
          isMinimized ? "search__container--minimized" : ""
        }`}
      >
        <button className="toggle__button" onClick={toggleSidebar}>
          {isMinimized ? ">" : "<"}
        </button>
        {isMinimized && (
          <>
            {" "}
            <div className="minimized_search_text">Add New</div>
          </>
        )}
        {!isMinimized && (
          <>
            <div className="prompt">
              <strong>Add New Piston</strong>
              <p>Optionally empty fields accepted</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {formatedFields.map((field, index) => (
                <div className="input__box" key={index}>
                  <input
                    type="text"
                    placeholder=" "
                    {...register(fields[index], validationRules[fields[index]])}
                  />
                  <span>{field}</span>
                  {errors[fields[index]] && (
                    <div className="error-tooltip">
                      {(errors[fields[index]] as FieldError).message}
                    </div>
                  )}
                </div>
              ))}
              <button type="submit">
                {waitingForItems ? "Loading.." : "Add New"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
