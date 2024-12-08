import { useEffect, useState } from "react";
import "./FilterMenu.css";
import { useFilterMenuQuery } from "./useFilterMenuQuery";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { PistonFields } from "../../Types/PistonFields";
import { useModalContext } from "../Context/ModalProvider";

type FilterMenuProps = {
  setQuery: (query: PistonFields) => void;
};

export default function FilterMenu({ setQuery }: FilterMenuProps) {
  const { fields, loading, formatedFields } = useFilterMenuQuery();
  const [isMinimized, setIsMinimized] = useState(false);

  const { isFilterMenuVisible, updateFilterMenuVisible } = useModalContext();

  const handleCloseFilter = () => {
    updateFilterMenuVisible(false);
  };

  useEffect(() => {
    console.log("Is FilterMenu visible : ", isFilterMenuVisible);
  }, [isFilterMenuVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PistonFields>();

  const onSubmit: SubmitHandler<PistonFields> = (data) => {
    console.log("Data before sending ", data);
    setQuery(data);
    handleCloseFilter();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isFilterMenuVisible) {
    return null;
  }

  return (
    <>
      <div className="filtermenu-overlay" onClick={handleCloseFilter}></div>
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
            <div className="minimized_search_text">Search</div>
          </>
        )}
        {!isMinimized && (
          <>
            <div className="prompt">
              <strong>Search here</strong>
              <p>Results will show every combination of the fields</p>
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
              <button type="submit">Search</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
