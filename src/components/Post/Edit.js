import { GoPencil } from "react-icons/go";

export default function Edit({ rightStates }) {
  return (
    <GoPencil
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => {
        if (rightStates.editMode) {
          rightStates.setEditMode(false);
          rightStates.setText(rightStates.oldText);
        } else {
          rightStates.setEditMode(true);
        }
      }}
    />
  );
}
//
