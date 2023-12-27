import React, { useEffect } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setFormData, resetForm, setRegisterErrMsg } from "../state/index";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, registerErrMsg } = useSelector((state) => state.global);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (field) => (e) =>
    dispatch(setFormData({ field, value: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/users",
        {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );
      if (response.statusText === "OK") {
        localStorage.setItem("isAuthenticated", true);
        navigate("/dashboard");
        dispatch(setRegisterErrMsg(""));
      }
      dispatch(resetForm());
    } catch (error) {
      dispatch(setRegisterErrMsg(error.response.data.message));
    }
  };

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
      <Typography variant="h5">Register</Typography>
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
        <TextField
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          label="Confirm Password"
          type="password"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      {registerErrMsg && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {registerErrMsg}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
