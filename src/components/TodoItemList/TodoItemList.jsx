import React, { useState, ReactFragment } from "react";

import TodoItem from "../TodoItem/TodoItem";
import "./TodoItemList.css";

export default function TodoItemList({
  items = [],
  onItemCompletion,
  deleteTodo,
  clearCompletedItems,
}) {
  let [isActive, setIsActive] = useState(1);

  const footerLinkItems = [
    {
      id: 1,
      name: "All",
      className: "item-list-footer-links",
      isActive: false,
    },
    {
      id: 2,
      name: "Active",
      className: "item-list-footer-links",
      isActive: false,
    },
    {
      id: 3,
      name: "Completed",
      className: "item-list-footer-links",
      isActive: false,
    },
  ];
  //Need to update this logic
  const addActiveOnClick = (e) => {
    isActive = e.target.id;
    setIsActive(isActive);
  };

  const itemsCounter = items.reduce(
    (counter, { status }) => (status === "active" ? (counter += 1) : counter),
    0
  );

  return (
    <div>
      <div className="item-list-container">
        <div className="todo-items">
          {isActive == 1 ? (
            items.map((item, index) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  onItemCompletion={onItemCompletion}
                  deleteTodo={deleteTodo}
                  id={item.id}
                  index={index}
                ></TodoItem>
              );
            })
          ) : isActive == 2 ? (
            items.map((item, index) =>
              item.status == "active" ? (
                <TodoItem
                  key={item.id}
                  item={item}
                  onItemCompletion={onItemCompletion}
                  deleteTodo={deleteTodo}
                  id={item.id}
                  index={index}
                />
              ) : (
                ""
              )
            )
          ) : isActive == 3 ? (
            items.map((item, index) =>
              item.status == "completed" ? (
                <TodoItem
                  key={item.id}
                  item={item}
                  onItemCompletion={onItemCompletion}
                  deleteTodo={deleteTodo}
                  id={item.id}
                  index={index}
                />
              ) : (
                ""
              )
            )
          ) : (
            <p>Error: No data found</p>
          )}
        </div>

        <div className="item-list-footer">
          <div className="hide-on-mobile">
            <span>{itemsCounter} items left</span>
          </div>
          <div className="item-list-footer-coll-2">
            {footerLinkItems.map((item) => {
              return (
                <button
                  key={item.id}
                  id={item.id}
                  onClick={addActiveOnClick}
                  className={
                    item.id == isActive
                      ? `isActiveLink ${item.className}`
                      : `btn-color ${item.className}`
                  }
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="hide-on-mobile">
            <button
              type="button"
              className="item-list-footer-button"
              onClick={() => clearCompletedItems()}
              title="You are clearing this list"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>

      <div className="display-on-mobile">
        {footerLinkItems.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              onClick={addActiveOnClick}
              className={
                item.id == isActive
                  ? `isActiveLink ${item.className}`
                  : `btn-color ${item.className}`
              }
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
