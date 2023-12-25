// Register.js
import React from "react";
import { Button, TextField, Typography, Container } from "@mui/material";

const Register = () => {
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
      <form>
        <TextField label="Username" margin="normal" fullWidth />
        <TextField label="Password" type="password" margin="normal" fullWidth />
        <TextField
          label="Confirm Password"
          type="password"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
