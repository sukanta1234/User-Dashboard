import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";


import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../../Toolkit/authSlice";
import { useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const data=useSelector((state)=>state.auth)
    console.log(data.status);
    const dispatch=useDispatch()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [error, setError] = useState({});
  const validation = () => {
    const error = {};

    if (!email) {
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

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
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation());
    const formData=new FormData();
    formData.append("email",email);
    formData.append("password",password)
   
    dispatch(loginApi(formData))
  };
  const navigate=useNavigate()

  useEffect(()=>{
    const RedirectUser=()=>{
      const token=localStorage.getItem("token");
      const isloginPage=window.location.pathname==="/"
      if (token!=="" && token!==undefined && token!==null) {
        return isloginPage && navigate("/home")
        
      }

    }
    RedirectUser()

  },[navigate,data.redirect_to])

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
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
              <Grid item xs={12}></Grid>
            </Grid>
            {data.status==="idle"?(<>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography component={Link} to="/registration" variant="body2">
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
