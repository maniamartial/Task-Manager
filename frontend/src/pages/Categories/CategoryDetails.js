import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequestResource from "src/hooks/useRequestResource";

export default function CategoryDetails() {
  const { addResource, resource, getResource, updateResource } =
    useRequestResource({
      endpoint: "categories",
    });

  const [initialValues, setInitialValues] = useState({
    name: " ",
    color: " ",
  });

  //UseNavigate it is use to go back to new page that is updated...lets say you want new data that has been posted on teh homepage-works wonders
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getResource(id);
    }
  }, [id]);

  useEffect(() => {
    if (resource) {
      setInitialValues({
        name: resource.name,
        color: resource.color,
      });
    }
  });
  //posting data to the backend
  const handleSubmit = (values) => {
    if (id) {
      updateResource(id, values, () => {
        navigate("/categories");
      });
      return;
    }
    addResource(values, () => {
      navigate("/categories");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="color"
                    label="Color"
                    {...formik.getFieldProps("color")}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item>
                  <Box
                    sx={{
                      display: "flex",
                      margin: (theme) => theme.spacing(1),
                      marginTop: (theme) => theme.spacing(3),
                    }}
                  >
                    <Button
                      component={Link}
                      to="/categories"
                      size="medium"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
