import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function PersonalAdvisorCard(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Test task</Text>
      <Text style={styles.subtitle}>Lorem ipsum</Text>
      <Text style={styles.action}>Go to call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 106,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  subtitle: {
    marginTop: 4,
    color: '#8F9AAB',
    fontSize: 12,
    lineHeight: 16,
  },
  action: {
    marginTop: 24,
    color: '#FF873D',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default PersonalAdvisorCard;
