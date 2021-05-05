import React, { Component } from "react";
import "./App.css";

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
      {
        id: 1,
        taskName: "Learn React",
        type: "inProgress",
        bgcolor: "lightblue",
      },
      {
        id: 2,
        taskName: "Work on project",
        type: "inProgress",
        bgcolor: "pink",
      },
      { id: 3, taskName: "Work out", type: "done", bgcolor: "lightgrey" },
      { id: 4, taskName: "Play WOW", type: "done", bgcolor: "" },
    ],
  };

  onDragStart = (event, taskName) => {
    console.log("dragstart on div: ", taskName);
    event.dataTransfer.setData("taskName", taskName);
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, cat) => {
    let taskName = event.dataTransfer.getData("taskName");

    let tasks = this.state.tasks.filter((task) => {
      if (task.taskName === taskName) {
        task.type = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    var tasks = {
      inProgress: [],
      done: [],
    };
    this.state.tasks.forEach((task) => {
      tasks[task.type].push(
        <div
          key={task.id}
          onDragStart={(event) => this.onDragStart(event, task.taskName)}
          draggable
          className="draggable"
          style={{ backgroundColor: task.bgcolor }}
        >
          {task.taskName}
        </div>
      );
    });
    return (
      <div className="drag-container">
        <h2 className="header"> Drag & Drop To Do List </h2>
        <div className="underline"></div>
        <div
          className="inProgress"
          onDragOver={(event) => this.onDragOver(event)}
          onDrop={(event) => this.onDrop(event, "inProgress")}
        >
          <span className="group-header">In Progress</span>
          {tasks.inProgress}
        </div>
        <div
          className="droppable"
          onDragOver={(event) => this.onDragOver(event)}
          onDrop={(event) => this.onDrop(event, "done")}
        >
          <span className="group-header">Done</span>
          {tasks.done}
        </div>
      </div>
    );
  }
}
