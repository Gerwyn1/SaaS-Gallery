import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, TextField, Typography, Container } from "@mui/material";

import { setFormData, resetForm, setLoginErrMsg } from "../state/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, loginErrMsg } = useSelector((state) => state.global);
  const handleChange = (field) => (e) =>
    dispatch(setFormData({ field, value: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + "/api/users/auth", {email: formData.email, password: formData.password});
      if (response.statusText === 'OK') {
        localStorage.setItem('isAuthenticated', true);
        navigate('/dashboard');
        dispatch(setLoginErrMsg(''));
      }
      dispatch(resetForm());
    } catch (error) {
      dispatch(setLoginErrMsg(error.response.data.message));
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) navigate('/dashboard');
  }, [navigate])

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
    </Container>
  );
};

export default Login;
