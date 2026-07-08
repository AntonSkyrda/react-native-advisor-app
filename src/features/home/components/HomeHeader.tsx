import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type HomeHeaderProps = {
  userName: string;
};

function HomeHeader({userName}: HomeHeaderProps): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>Your name</Text>
      <Text style={styles.name}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 190,
    alignItems: 'center',
    paddingTop: 70,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#FF873D',
  },
  eyebrow: {
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 15,
  },
  name: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
});

export default HomeHeader;
