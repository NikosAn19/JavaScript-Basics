import "../SearchBar/FilterMenu.css";
import "./EditMenu.css";
import { useFilterMenuQuery } from "../SearchBar/useFilterMenuQuery";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { PistonFields } from "../../Types/PistonFields";
import { useModalContext } from "../Context/ModalProvider";
import { useEditQuery } from "./useEditQuery";

type EditMenuProps = {
  pistonData: PistonFields;
  triggerUpdate: () => void;
  setCode: (code: string | undefined) => void;
  setActionType: (actionType: string) => void;
  setAcceptedVisible: () => void;
};

export default function EditMenu({
  pistonData,
  triggerUpdate,
  setCode,
  setActionType,
  setAcceptedVisible,
}: EditMenuProps) {
  const { fields, loading, formatedFields } = useFilterMenuQuery();
  const { fetchEdit, waiting } = useEditQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PistonFields>();

  const { isEditVisible, updateEditVisible } = useModalContext();

  const handleEditOnClose = () => {
    updateEditVisible(false);
  };

  const onSubmit: SubmitHandler<PistonFields> = (data) => {
    console.log("Data before sending ", data);
    const old_code = pistonData.piston_code;
    fetchEdit(data, old_code)
      .then(triggerUpdate)
      .then(() => {
        setActionType("Edited");
        setCode(old_code);
        setAcceptedVisible();
      })
      .catch((error) => console.log(error));
    handleEditOnClose();
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

  if (!isEditVisible) {
    return null;
  }

  return (
    <>
      <div className="filtermenu-overlay" onClick={handleEditOnClose}></div>
      <div className="edit__container">
        <div
          className="search__container"
          style={{
            position: `absolute`,
            top: "0",
            left: "0",
            width: " 50%",
            height: "100%",
            borderRadius: "5px",
          }}
        >
          <div className="prompt">
            <strong>New Fields</strong>
            <p>Edit the Piston here</p>
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
              {waiting ? "Loading..." : "Submit Edit"}
            </button>
          </form>
        </div>
        <hr className="separator"></hr>

        <div className="pistonItem__container">
          <div className="pistonItem__Header"></div>
          <ul>
            {Object.entries(pistonData).map(([key, value]) => (
              <li key={key}>
                {key}: {value?.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
