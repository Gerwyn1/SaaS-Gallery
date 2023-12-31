import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, TextField, Typography, Container } from "@mui/material";

import { setFormData, resetForm, setLoginErrMsg, setId } from "../state/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, loginErrMsg } = useSelector((state) => state.global);
  const handleChange = (field) => (e) =>
    dispatch(setFormData({ field, value: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/users/auth",
        { email: formData.email, password: formData.password }
      );
      if (response.statusText === "OK") {
        localStorage.setItem("isAuthenticated", true);
        navigate("/dashboard");
        document.cookie = `userId=${response.data.userId}; path=/`;

        // When the application initializes
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("userId="))
          ?.split("=")[1];

        if (cookieValue && localStorage.getItem('isAuthenticated')) {
          dispatch(setId(cookieValue));
        }
        dispatch(setId(response.data.userId));
        dispatch(setLoginErrMsg(""));
      }
      dispatch(resetForm());
    } catch (error) {
      dispatch(setLoginErrMsg(error.response.data.message));
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) navigate("/dashboard");
  }, [navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
      component="main"
      maxWidth="xs"
    >
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={formData.email}
          onChange={handleChange("email")}
          label="Email"
          margin="normal"
          fullWidth
        />
        <TextField
          value={formData.password}
          onChange={handleChange("password")}
          label="Password"
          type="password"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      {loginErrMsg && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {loginErrMsg}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/register">Register</Link>
      </Typography>
    </Container>
  );
};

export default Login;
