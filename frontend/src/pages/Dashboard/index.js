import React from "react";
import TaskCompletion from "src/pages/Dashboard/TaskCompletion";
import TaskByCategory from "./TaskByCategory";

export default function Dashboard() {
  return (
    <div>
      <TaskCompletion />
      <TaskByCategory />
    </div>
  );
}
