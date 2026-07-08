import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  hasSession: boolean;
  isUnlocked: boolean;
};

const initialState: AuthState = {
  hasSession: false,
  isUnlocked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLocked(state) {
      state.isUnlocked = false;
    },
    authSessionDetected(state, action: PayloadAction<boolean>) {
      state.hasSession = action.payload;
    },
    authUnlocked(state) {
      state.hasSession = true;
      state.isUnlocked = true;
    },
    authUserChanged(state) {
      state.hasSession = false;
      state.isUnlocked = false;
    },
  },
});

export const {authLocked, authSessionDetected, authUnlocked, authUserChanged} =
  authSlice.actions;

export default authSlice.reducer;
