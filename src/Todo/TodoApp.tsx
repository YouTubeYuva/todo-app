import React, { useState } from "react";
import _ from "lodash";
import "./td.css";

interface Data {
  id: number;
  value: string;
  completed: boolean;
}

type Todo = "all" | "active" | "completed";

export default function TodoApp() {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState<Todo>("all");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.trim()) {
      event.preventDefault();
      setData((prev) => [
        ...prev,
        {
          id: Math.random(),
          value: value.trim(),
          completed: false,
        },
      ]);
      setValue("");
    }
  };

  const handleCheckbox = (id: number) => {
    setData(
      _.map(data, (item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setData(_.filter(data, (item) => item.id !== id));
  };

  const handleClick = (item: Todo) => {
    setFilter(item);
  };

  const filteredData = (() => {
    if (filter === "active") {
      return _.filter(data, (item) => !item.completed);
    } else if (filter === "completed") {
      return _.filter(data, (item) => item.completed);
    } else {
      return data;
    }
  })();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      _.map(data, (item) => ({ ...item, completed: event.target.checked }))
    );
  };

  return (
    <div className="header">
      <h1>todos</h1>
      <div className="div_input">
        <div>
          <input
            type="check"
            onChange={handleSelectAll}
            checked={data.length > 0 && _.every(data, (item) => item.completed)}
          />
        </div>
        <div>
          <input
            type="text"
            value={value}
            onKeyDown={handleKeyPress}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            placeholder="What needs to be done?"
          />
        </div>
      </div>
      <div>
        <div>
          {_.map(filteredData, (item) => (
            <div key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheckbox(item.id)}
              />
              <span>{item.value}</span>
              <button
                className="todo-remove"
                onClick={() => handleRemove(item.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        {data.length > 0 && (
          <div className="footer">
            <span className="todo-count">
              {_.filter(data, (item) => !item.completed).length} items left!
            </span>
            <button className="todo-all" onClick={() => handleClick("all")}>
              All
            </button>
            <button
              className="todo-active"
              onClick={() => handleClick("active")}
            >
              Active
            </button>
            <button
              className="todo-completed"
              onClick={() => handleClick("completed")}
            >
              Completed
            </button>
            <button
              className="todo-clear-completed"
              onClick={() => setData(_.filter(data, (item) => !item.completed))}
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
