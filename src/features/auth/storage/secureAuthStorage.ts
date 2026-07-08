import * as Keychain from 'react-native-keychain';
import i18n from 'i18next';

import type {AuthUser} from '../types/authTypes';

const authSessionService = 'personal-advisor.auth-session';
const pinService = 'personal-advisor.pin';
const biometricPinService = 'personal-advisor.biometric-pin';

type StoredAuthSession = {
  accessToken: string;
  email?: string;
  firstName?: string;
  image?: string;
  lastName?: string;
  refreshToken: string;
  userId: number;
  username: string;
};

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export async function saveAuthSession(user: AuthUser): Promise<void> {
  const session: StoredAuthSession = {
    accessToken: user.accessToken,
    email: user.email,
    firstName: user.firstName,
    image: user.image,
    lastName: user.lastName,
    refreshToken: user.refreshToken,
    userId: user.id,
    username: user.username,
  };

  await Keychain.setGenericPassword(user.username, JSON.stringify(session), {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    service: authSessionService,
  });
}

export async function getAuthSession(): Promise<StoredAuthSession | null> {
  const credentials = await Keychain.getGenericPassword({
    service: authSessionService,
  });

  if (!credentials) {
    return null;
  }

  return JSON.parse(credentials.password);
}

export async function clearAuthStorage(): Promise<void> {
  await Promise.all([
    Keychain.resetGenericPassword({service: authSessionService}),
    Keychain.resetGenericPassword({service: pinService}),
    Keychain.resetGenericPassword({service: biometricPinService}),
  ]);
}

export async function saveAuthTokens(tokens: AuthTokens): Promise<void> {
  const session = await getAuthSession();

  if (!session) {
    return;
  }

  await Keychain.setGenericPassword(
    session.username,
    JSON.stringify({
      ...session,
      ...tokens,
    }),
    {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      service: authSessionService,
    },
  );
}

export async function savePinCode(pin: string): Promise<void> {
  await Keychain.setGenericPassword('pin', pin, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    service: pinService,
  });

  await Keychain.setGenericPassword('pin', pin, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    authenticationPrompt: {
      title: i18n.t('auth.enableBiometricLoginTitle'),
      subtitle: i18n.t('auth.enableBiometricLoginSubtitle'),
      cancel: i18n.t('auth.cancel'),
    },
    service: biometricPinService,
  });
}

export async function getSavedPinCode(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: pinService,
  });

  return credentials ? credentials.password : null;
}

export async function getPinWithBiometry(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    authenticationPrompt: {
      title: i18n.t('auth.signInBiometricTitle'),
      subtitle: i18n.t('auth.signInBiometricSubtitle'),
      cancel: i18n.t('auth.cancel'),
    },
    service: biometricPinService,
  });

  return credentials ? credentials.password : null;
}

export async function hasSavedPin(): Promise<boolean> {
  return Keychain.hasGenericPassword({
    service: pinService,
  });
}

export async function hasBiometricPin(): Promise<boolean> {
  return Keychain.hasGenericPassword({
    service: biometricPinService,
  });
}

export async function getSupportedBiometryLabel(): Promise<string | null> {
  const biometryType = await Keychain.getSupportedBiometryType();

  if (!biometryType) {
    return null;
  }

  if (biometryType === Keychain.BIOMETRY_TYPE.FACE_ID) {
    return i18n.t('auth.faceId');
  }

  return i18n.t('auth.arabicBiometrics');
}
