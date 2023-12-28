import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  id: null,
  userId: "",
  formData: {
    email: '',
    password : '',
    confirmPassword:'',
    username: '',
    first_name: '',
    last_name: '',
    roles: 'User',
    country: '',
    state: '',
    occupation: '',
    postcode: '',
    is_verified: '',
    mobile_no: '',
    address_1: '',
    address_2: '',
    company_name: '',
    profile_image: null,
    banner_image: null,
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
    
    setInitialFormState: (state, action) => {
      state.formData = {...action.payload};
      state.formData.password = '';
    },
    setFormData: (state, action) => {
      console.log(action)
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
    setProfileImage: (state, action) => {
      state.formData.profile_image = action.payload;
    },
    setBannerImage: (state, action) => {
      state.formData.banner_image = action.payload;
    },
  },
});

export const { setMode, setFormData, resetForm, setLoginErrMsg, setRegisterErrMsg, setUserId, setId, setInitialFormState,setProfileImage ,setBannerImage} = globalSlice.actions;

export default globalSlice.reducer;