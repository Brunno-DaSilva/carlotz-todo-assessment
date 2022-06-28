import React, { useState } from "react";

import Footer from "../Footer/Footer";
import "./Home.css";

import DarkThemeImage from "../../assets/images/bg-desktop-dark.jpg";
import DarkThemeImageMB from "../../assets/images/bg-mobile-dark.jpg";
import LightThemeImage from "../../assets/images/bg-desktop-light.jpg";
import LightThemeImageMB from "../../assets/images/bg-mobile-light.jpg";
import SunIconDT from "../../assets/images/icon-sun.svg";
import MoonIconLT from "../../assets/images/icon-moon.svg";
import TodoItem from "../TodoItem/TodoItem";
import TodoItemList from "../TodoItemList/TodoItemList";
import SEED_DATA from "../../data/data";

const itemInitialState = { id: 0, value: "", status: undefined };

export default function Home() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [todoItems, setTodoItems] = useState(SEED_DATA);
  const [item, setItem] = useState(itemInitialState);

  let lastID = todoItems[todoItems.length - 1].id;
  const [generateID, setGenerateID] = useState(lastID);

  const lightThemeHandler = () => {
    setIsLightTheme((prevMode) => !prevMode);
  };

  const onItemChange = (event) => {
    setGenerateID(lastID + 1);
    let newItem = {
      id: generateID,
      value: event.target.value,
      status: "active",
    };
    setItem(newItem);
    console.log(`onItemChange--Item - ${JSON.stringify(newItem)}`);
  };

  const onSubmit = () => {
    console.log("ID---", item.id);

    if (!item.value || /^\s*$/.test(item.value)) return;

    if (item.value)
      setItem({ id: item.id, value: item.value, status: "active" });
    let newList = [...todoItems, item];
    setTodoItems(newList);
    setItem(itemInitialState);
  };

  const onItemCompletion = (text) => {
    let newList = [];
    todoItems.map((item) => {
      if (item.value === text) {
        newList.push({ id: item.id, value: item.value, status: "completed" });
      } else {
        newList.push(item);
      }
    });

    setTodoItems(newList);

    console.log("NEW ITEMS LIST: ", newList);
    // change item status

    // rehydrate list
  };

  const deleteTodo = (id) => {
    console.log("TODO ITEMS => ", [...todoItems]);
    const newList = [...todoItems];
    setTodoItems(newList.filter((item) => item.id !== id));
  };

  const clearCompletedItems = () => {
    const newList = [...todoItems];
    setTodoItems(newList.filter((item) => item.status === "active"));
  };

  return (
    <div
      className={
        isLightTheme ? "light-mode home-container" : "dark-mode home-container"
      }
    >
      <div className="img-banner hide-img-on-mobile">
        {isLightTheme ? (
          <img
            className="header-hero-img "
            src={LightThemeImage}
            alt="Dark Image"
          />
        ) : (
          <img
            className="header-hero-img"
            src={DarkThemeImage}
            alt="Dark Image"
          />
        )}
      </div>
      <div className="img-banner hide-img-on-desktop">
        {isLightTheme ? (
          <img
            className="header-hero-img "
            src={LightThemeImageMB}
            alt="Dark Image"
          />
        ) : (
          <img
            className="header-hero-img"
            src={DarkThemeImageMB}
            alt="Dark Image"
          />
        )}
      </div>
      <header className="main-header">
        <div className="header-nav-bar">
          <div className="header-logo">
            <h1>TODO</h1>
          </div>
          <div className="header-icon">
            <button
              className={isLightTheme ? "light-mode" : "dark-mode"}
              onClick={(e) => lightThemeHandler(e)}
            >
              {isLightTheme ? (
                <img
                  className="header-icon"
                  src={MoonIconLT}
                  alt="Theme toggle"
                />
              ) : (
                <img
                  className="header-icon"
                  src={SunIconDT}
                  alt="Theme toggle"
                />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="main">
        <div className="form-input-todo-item">
          <TodoItem
            isHeader={true}
            onItemChange={onItemChange}
            item={item}
            onSubmit={onSubmit}
            className="header-input-new-todo"
            generateID={generateID}
          />
        </div>
        <div className="todo-items-list-container">
          <TodoItemList
            items={todoItems}
            onItemCompletion={onItemCompletion}
            deleteTodo={deleteTodo}
            clearCompletedItems={clearCompletedItems}
            generateID={generateID}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
