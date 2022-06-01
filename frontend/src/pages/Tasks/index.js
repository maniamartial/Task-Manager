import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Pagination,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Masonry from "react-masonry-css";

import TaskListItem from "./TaskListItem";
import useRequestResource from "src/hooks/useRequestResource";

// const results = [
//     {
//         id: 1,
//         title: "Task 1",
//         category_name: "Cat 1",
//         category_color: "697689",
//         priority: 1
//     },
//     {
//         id: 2,
//         title: "Task 2",
//         category_name: "Cat 2",
//         category_color: "ff8a65",
//         priority: 2
//     }
// ]

const pageSize = 6;

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Tasks() {
  const { resourceList, getResourceList, deleteResource, updateResource } =
    useRequestResource({ endpoint: "tasks", resourceLabel: "Task" });
  const [open, setOpen] = useState(false);

  const handleUpdateCompleted = (task) => {};

  const handleConfirmDelete = (id) => {};

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

  const navigate = useNavigate();

  const handleChangePagination = (event, value) => {};

  const onSubmitSearch = (values) => {};

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  return (
    <div>
      <Typography
        variant="subtitle1"
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          marginBottom: (theme) => theme.spacing(2),
        }}
        color="text.primary"
      >
        {`Total tasks: ${resourceList.count || 0}`}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mt: 3 }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/tasks/create"
        >
          Create Task
        </Button>
      </Box>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {resourceList.results.map((task) => {
          return (
            <div key={task.id}>
              <TaskListItem
                task={task}
                handleConfirmDelete={handleConfirmDelete}
                handleUpdateCompleted={handleUpdateCompleted}
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}

/*
import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TaskListItem from "./TaskListItem";
import useRequestResource from "src/hooks/useRequestResource";

const results = [
  {
    id: 1,
    title: "Task 1",
    category_name: "Cat 1",
    category_color: "#000000",
  },
  {
    id: 2,
    title: "Task 3",
    category_name: "Cat 2",
    category_color: "#00FF00",
  },
];

export default function Tasks() {
  const { resourceList, getResourceList } = useRequestResource({
    endpoint: "tasks",
  });

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mt: 3 }}>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/tasks/create"
        >
          Create Task
        </Button>
      </Box>

      {resourceList.results.map((task) => {
        return (
          <div key={task.id}>
            <TaskListItem task={task} />
          </div>
        );
      })}
    </div>
  );
}

*/
