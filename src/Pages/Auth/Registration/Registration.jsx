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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registraton } from "../../../Toolkit/authSlice";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Registration() {
    const data=useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const { first_name, last_name, email, password } = user;
  const [error, setError] = useState({});
  const [profile_pic, setProfile_pic] = useState();
  const validation = () => {
    const error = {};
    if (!first_name) {
      error.first_name = "first name is required";
    }
    if (!last_name) {
      error.last_name = "last name is required";
    }
    if (!email) {
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }
    if (!profile_pic) {
      error.profile_pic = " profile_pic is required";
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "first_name is required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "last_name is required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "password is required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };
  const handleImage=(e)=>{
    const file=e.target.files[0];
    if (!file) {
        setError({...error,profile_pic:"profile_pic is required"})
        setProfile_pic(null)
        
    } else {
        setError({...error,profile_pic:""})
        setProfile_pic(file)
        
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_pic",profile_pic)
    dispatch(registraton(formData));
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
            Sign up
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
                  autoComplete="first_name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="first_name"
                  autoFocus
                  value={first_name}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.first_name}
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="last_name"
                  name="last_name"
                  autoComplete="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.last_name}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.email}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                />
                <span style={{ color: "red", margin: "5px" }}>
                  {error.password}
                </span>
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="profile_pic" id="profile_pic" onChange={handleImage} />
                {profile_pic!=="" && profile_pic!=null && profile_pic!=undefined?(<>
                <img src={URL.createObjectURL(profile_pic)} alt=""  style={{height:"150px"}}/>
                </>):(<>{profile_pic==="" && <p>drag and drop image here</p>}</>)}
              </Grid>
              <span style={{ color: "red", margin: "5px" }}>
                  {error.profile_pic}
                </span>
            </Grid>
            {data.status==="idle"?(<>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </>):((<>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading....
            </Button>
            </>))}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography component={Link} to="/" variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
