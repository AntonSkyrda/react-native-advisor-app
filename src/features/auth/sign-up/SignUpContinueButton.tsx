import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import PrimaryButton from '../../../components/PrimaryButton';

type SignUpContinueButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

function SignUpContinueButton({
  disabled,
  onPress,
}: SignUpContinueButtonProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.footer}>
      <PrimaryButton
        disabled={disabled}
        label={t('common.continue')}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    right: 30,
    bottom: 22,
    left: 30,
  },
});

export default SignUpContinueButton;
