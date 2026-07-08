import type {NavigatorScreenParams} from '@react-navigation/native';

export type SettingsStackParamList = {
  SettingsHome: undefined;
  SettingsLanguage: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Portfolio: undefined;
  Search: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

export type RootStackParamList = {
  CreatePin: undefined;
  Login: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  PostDetails: {postId: number};
  SignUp: undefined;
  Splash: undefined;
  UnlockPin: undefined;
  Welcome: undefined;
};
