import React from 'react';
import {StyleSheet, View} from 'react-native';

import PrimaryButton from '../../../components/PrimaryButton';

type SignUpContinueButtonProps = {
  disabled: boolean;
  onPress: () => void;
};

function SignUpContinueButton({
  disabled,
  onPress,
}: SignUpContinueButtonProps): React.JSX.Element {
  return (
    <View style={styles.footer}>
      <PrimaryButton disabled={disabled} label="Continue" onPress={onPress} />
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
