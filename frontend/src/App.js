import React from "react";
import ReactDom from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import { SnackbarProvider } from "notistack";
//import LoadingOverlayResource from "./components/LoadingOverlayResource";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import AuthContextProvider from "./context/AuthContextProvider";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";
import BaseLayout from "./components/BaseLayout";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/Tasks/TaskDetails";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <div>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider>
          <Router>
            <Box
              sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
                width: "100%",
              }}
            >
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route element={<BaseLayout />}>
                    <Route
                      path="/categories/create"
                      element={<CategoryDetails />}
                    />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                      path={`/categories/edit/:id`}
                      element={<CategoryDetails />}
                    />
                    <Route path="/tasks" element={<Tasks />}></Route>
                    <Route
                      path="/tasks/create"
                      element={<TaskDetails />}
                    ></Route>
                    <Route
                      path="/tasks/edit/:id"
                      element={<TaskDetails />}
                    ></Route>
                    <Route path="/" element={<Dashboard />}></Route>
                  </Route>
                </Route>
                <Route element={<RequireNotAuth />}>
                  <Route path="/auth/signup" element={<SignUp />}></Route>
                  <Route path="/auth/signin" element={<SignIn />}></Route>
                </Route>
              </Routes>
            </Box>
          </Router>
        </SnackbarProvider>
      </AuthContextProvider>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
