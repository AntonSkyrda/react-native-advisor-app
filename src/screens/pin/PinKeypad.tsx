import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {DeleteIcon} from './PinIcons';

type PinKeypadProps = {
  onDelete: () => void;
  onDigitPress: (digit: string) => void;
};

const keypadRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'delete'],
];

function PinKeypad({
  onDelete,
  onDigitPress,
}: PinKeypadProps): React.JSX.Element {
  return (
    <View style={styles.keypad}>
      {keypadRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(key => {
            if (!key) {
              return <View key="empty" style={styles.key} />;
            }

            const isDelete = key === 'delete';

            return (
              <Pressable
                accessibilityRole="button"
                key={key}
                onPress={isDelete ? onDelete : () => onDigitPress(key)}
                style={styles.key}>
                {isDelete ? (
                  <DeleteIcon />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    marginTop: 'auto',
    paddingBottom: 26,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  key: {
    width: 88,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: '#000000',
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 32,
  },
});

export default PinKeypad;
