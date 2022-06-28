import React, { useState } from "react";
import "./TodoItem.css";
import checkMarkIcon from "../../assets/images/icon-check.svg";
import crossIcon from "../../assets/images/icon-cross.svg";

export default function TodoItem({
  isHeader = false,
  item,
  onItemChange,
  onSubmit,
  onItemCompletion,
  deleteTodo,
  generateID,
}) {
  // Set the isCheck to the status
  const [isChecked, setIsChecked] = useState(false);
  const [onHover, setOnHover] = useState({ display: "none" });
  const btnToggle = (e) => {
    e.preventDefault();
    // let home know this item is completed.
    onItemCompletion(item.value);
    setIsChecked(!isChecked);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") return onSubmit();
  };

  const { id: __ID } = item;
  let newID = __ID || Date.now();

  console.log(__ID);

  return (
    <div
      id="todo-item-container"
      className="todo-item-container"
      onMouseEnter={(e) => {
        setOnHover({ display: "block ", cursor: "pointer" });
      }}
      onMouseLeave={(e) => {
        setOnHover({ display: "none" });
      }}
    >
      <button
        disabled={isHeader}
        className={
          isChecked
            ? "carlotz-checkbox-checked carlotz-checkbox "
            : "carlotz-checkbox-unchecked carlotz-checkbox"
        }
        type="button"
        onClick={btnToggle}
      >
        {isChecked ? <img src={checkMarkIcon} alt="Check mark icons" /> : ""}
      </button>
      <input
        disabled={!isHeader}
        style={
          isChecked
            ? {
                textDecoration: "line-through",
                color: "hsl(233, 14%, 35%)",
              }
            : {}
        }
        className="todo-item-input"
        onKeyDown={onKeyDown}
        onBlur={onSubmit}
        value={item.value}
        onChange={onItemChange}
        id={generateID}
        placeholder="Create a new todo..."
      />
      {!isHeader && (
        <button
          className="todo-item-btn-delete "
          type="button"
          onClick={() => deleteTodo(item.id)}
          style={onHover}
          title="You are deleting this Item"
          id={item.id}
        >
          <img src={crossIcon} alt="Cross icon" />
        </button>
      )}
    </div>
  );
}
