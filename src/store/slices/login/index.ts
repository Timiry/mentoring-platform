import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../";

const loginStep = createSlice({
  name: "step",
  initialState: {
    value: "phone",
    phoneNumber: "",
    otp: "",
  },
  reducers: {
    setPhoneStep: (state) => {
      state.value = "phone";
    },
    setOtpStep: (state) => {
      state.value = "otp";
    },
    setCompleteStep: (state) => {
      state.value = "complete";
    },
  },
});

export const { setPhoneStep, setOtpStep, setCompleteStep } = loginStep.actions;

export default loginStep.reducer;

export const selectStep = (state: RootState) => state.step.value;
