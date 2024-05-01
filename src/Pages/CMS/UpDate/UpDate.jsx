import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsApi, updateApi } from "../../../Toolkit/productSlice";
import { useEffect } from "react";
import { product } from "../../../Helper";

const defaultTheme = createTheme();

export default function UpDate() {
  const data = useSelector((state) => state.product);
  // console.log(data.sdata);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    title: "",
    description: "",
    email: "",
    password: "",
  });
  const { title, description } = user;
  const [error, setError] = useState({});
  const [image, setImage] = useState();
  const validation = () => {
    const error = {};
    if (!title) {
      error.title = "title  is required";
    }
    if (!description) {
      error.description = "description is required";
    }

    if (!image) {
      error.image = " image is required";
    }
    return error;
  };
  useEffect(() => {
    dispatch(detailsApi(id));
  }, []);
  useEffect(() => {
    if (data.sdata) {
      setUser({
        title: data.sdata.title,
        description: data.sdata.description,
      });
    }
  }, [data.sdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      if (value.length === 0) {
        setError({ ...error, title: "title is required" });
        setUser({ ...user, title: "" });
      } else {
        setError({ ...error, title: "" });
        setUser({ ...user, title: value });
      }
    }

    if (name === "description	") {
      if (value.length === 0) {
        setError({ ...error, description: "description	 is required" });
        setUser({ ...user, description: "" });
      } else {
        setError({ ...error, description: "" });
        setUser({ ...user, description: value });
      }
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError({ ...error, image: "image is required" });
      setImage(null);
    } else {
      setError({ ...error, image: "" });
      setImage(file);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", data.sdata.image);
    }

    dispatch(updateApi(formData)).then(() => dispatch(detailsApi(id)));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            UpDate Data
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="title"
                  autoFocus
                  value={title}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.title}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="description	"
                  label="description	"
                  name="description	"
                  autoComplete="description	"
                  value={description}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.description}
                </span>
              </Grid>

              <Grid item xs={12}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImage}
                />
                {image !== "" && image !== null && image !== undefined ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      style={{ height: "150px" }}
                    />
                  </>
                ) : (
                  <>
                    {data.sdata?.image === "" ? (
                      <>
                        <img alt="" />
                      </>
                    ) : (
                      <>
                        <img
                          src={product(data.sdata.image)}
                          alt=""
                          style={{ height: "200px" }}
                        />
                      </>
                    )}
                  </>
                )}
                {image === "" && <p>Drag or drop content here</p>}
              </Grid>
              <span style={{ color: "red", margin: "5px" }}>{error.image}</span>
            </Grid>
           {data.status==="idle"?(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UpDate
            </Button>
           </>):(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading....
            </Button>
           </>)}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
