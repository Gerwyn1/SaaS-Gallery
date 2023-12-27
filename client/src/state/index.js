import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  userId: "63701cc1f03239b7f700000e",
  formData: {
    email: '',
    password : '',
    // confirmPassword:'',
  },
  registerErrMsg: '',
  loginErrMsg: '',
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLoginErrMsg: (state, action) => {
      state.loginErrMsg = action.payload
    },
    setFormData: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = {
        email: "",
        password: "",
        // confirmPassword:'',
      };
    },
  },
});

export const { setMode, setFormData, resetForm, setLoginErrMsg } = globalSlice.actions;

export default globalSlice.reducer;