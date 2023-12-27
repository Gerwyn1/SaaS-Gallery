import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  id: null,
  userId: "",
  formData: {
    email: '',
    password : '',
    confirmPassword:'',
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
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setLoginErrMsg: (state, action) => {
      state.loginErrMsg = action.payload
    },
    setRegisterErrMsg: (state, action) => {
      state.registerErrMsg = action.payload
    },
    setFormData: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = {
        email: "",
        password: "",
        confirmPassword:'',
      };
    },
  },
});

export const { setMode, setFormData, resetForm, setLoginErrMsg, setRegisterErrMsg, setUserId, setId } = globalSlice.actions;

export default globalSlice.reducer;