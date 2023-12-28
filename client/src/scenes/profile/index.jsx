import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Stack,
  Avatar,
  Input,
} from "@mui/material";

import {
  setFormData,
  resetForm,
  setLoginErrMsg,
  setInitialFormState,
  setProfileImage,
  setBannerImage,
} from "../../state/index";
import { useGetUserProfileQuery } from "state/api";

const Profile = () => {
  const dispatch = useDispatch();
  const { id, formData } = useSelector((state) => state.global);
  const userId = Cookies.get("userId");
  const { data } = useGetUserProfileQuery(userId);

  useEffect(() => {
    if (data) {
      dispatch(setInitialFormState(data));
    }
  }, [data, dispatch]);

  const {
    formData: {
      first_name,
      last_name,
      password,
      confirmPassword,
      roles,
      email,
      country,
      state,
      occupation,
      mobile_no,
      postcode,
      is_verified,
      address_1,
      address_2,
      company_name,
      profile_image,
      banner_image,
    },
  } = useSelector((state) => state.global);
  const handleChange = (field) => (e) =>
    dispatch(setFormData({ field, value: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "submitButton") {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + `/api/users/profile/${id}`,
          {
            first_name,
            last_name,
            password,
            roles,
            email,
            country,
            state,
            occupation,
            mobile_no,
            postcode,
            is_verified,
            address_1,
            address_2,
            company_name,
            profile_image,
            banner_image,
          }
        );

        // if (response.statusText === "OK") {
        //   localStorage.setItem("isAuthenticated", true);
        //   navigate("/dashboard");
        //   document.cookie = `userId=${response.data.userId}; path=/`;

        //   dispatch(setId(response.data.userId));
        //   dispatch(setLoginErrMsg(""));
        // }
        // dispatch(resetForm());
      } catch (error) {
        dispatch(setLoginErrMsg(error.response.data.message));
      }
    }
  };

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.nativeEvent.srcElement.name === "profile-upload") {
      setSelectedProfile(file);
      dispatch(setProfileImage(file.name));
    }
    if (event.nativeEvent.srcElement.name === "banner-upload") {
      setSelectedBanner(file);
      dispatch(setBannerImage(file.name));
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        mt: 4,
      }}
      component="main"
    >
      <Stack direction="row" gap={5}>
        <Stack spacing={4}>
          <Stack spacing={2} alignItems="center">
            <Avatar
              alt="User Avatar"
              src={
                selectedProfile
                  ? URL.createObjectURL(selectedProfile)
                  : "path-to-default-avatar"
              }
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6">Upload Avatar</Typography>
            <Input
              type="file"
              name="profile-upload"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-avatar-input"
            />
            <label htmlFor="upload-avatar-input">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
          </Stack>
          <Stack spacing={2} alignItems="center">
            <Avatar
              alt="Banner Image"
              src={
                selectedBanner
                  ? URL.createObjectURL(selectedBanner)
                  : "path-to-default-banner"
              }
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6">Upload Banner Image</Typography>
            <Input
              type="file"
              name="banner-upload"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-banner-input"
            />
            <label htmlFor="upload-banner-input">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
          </Stack>
        </Stack>
        <Box>
          <Typography variant="h1">Personal info</Typography>
          <Typography mt={1} variant="h5">
            Customize how your profile information will appear to the networks.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" gap={2}>
              <TextField
                  value={first_name}
                  onChange={handleChange("username")}
                  label="Username"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={first_name}
                  onChange={handleChange("first_name")}
                  label="First name"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={last_name}
                  onChange={handleChange("last_name")}
                  label="Last name"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={formData?.email}
                  onChange={handleChange("email")}
                  label={formData?.email ? "" : "Email"}
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  disabled
                  value={roles}
                  onChange={handleChange("roles")}
                  label="Role"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={country}
                  onChange={handleChange("country")}
                  label="Country"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={state}
                  onChange={handleChange("state")}
                  label="State"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  value={occupation}
                  onChange={handleChange("occupation")}
                  label="Occupation"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={mobile_no}
                  onChange={handleChange("mobile_no")}
                  label="Phone Number"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={postcode}
                  onChange={handleChange("postcode")}
                  label="Post Code"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  disabled
                  value={is_verified}
                  onChange={handleChange("is_verified")}
                  label={"Verified"}
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={company_name}
                  onChange={handleChange("company_name")}
                  label="Company Name"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  value={address_1}
                  onChange={handleChange("address_1")}
                  label="Address 1"
                  margin="normal"
                  fullWidth
                  size="small"
                />
                <TextField
                  value={address_2}
                  onChange={handleChange("address_2")}
                  label="Address 2"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>

              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  value={password}
                  onChange={handleChange("password")}
                  label="Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  value={confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  fullWidth
                  size="small"
                />
              </Box>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="flex-end"
              marginTop={2}
            >
              <Button type="submit" name="cancelButton" variant="contained">
                Cancel
              </Button>
              <Button
                type="submit"
                name="submitButton"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile;
