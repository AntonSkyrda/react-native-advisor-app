import React from 'react';
import {StyleSheet, View} from 'react-native';

type PinDotsProps = {
  hasError: boolean;
  length: number;
  valueLength: number;
};

function PinDots({
  hasError,
  length,
  valueLength,
}: PinDotsProps): React.JSX.Element {
  return (
    <View style={styles.dots}>
      {Array.from({length}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < valueLength ? styles.dotFilled : styles.dotEmpty,
            hasError ? styles.dotError : null,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    columnGap: 13,
    marginTop: 24,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
  },
  dotFilled: {
    backgroundColor: '#FF873D',
  },
  dotEmpty: {
    backgroundColor: '#C4C9D2',
  },
  dotError: {
    backgroundColor: '#E45F2B',
  },
});

export default PinDots;
