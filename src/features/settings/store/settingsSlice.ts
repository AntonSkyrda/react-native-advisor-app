import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type AppLanguage = 'en' | 'ar';

type SettingsState = {
  language: AppLanguage;
};

const initialState: SettingsState = {
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    languageChanged(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload;
    },
  },
});

export const {languageChanged} = settingsSlice.actions;

export default settingsSlice.reducer;
