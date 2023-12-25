// Login.js
import React from "react";
import { Button, TextField, Typography, Container } from "@mui/material";

const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignContent:'center'
      }}
      component="main"
      maxWidth="xs"
    >
      <Typography variant="h5">Login</Typography>
      <form>
        <TextField label="Username" margin="normal" fullWidth />
        <TextField label="Password" type="password" margin="normal" fullWidth />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
