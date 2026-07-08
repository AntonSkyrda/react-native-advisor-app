import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import HomeIcon from '../../../assets/icons/home-icon.svg';
import PortfolioIcon from '../../../assets/icons/portfolio-icon.svg';
import ProfileIcon from '../../../assets/icons/profile-bar-icon.svg';
import SearchIcon from '../../../assets/icons/search-icon.svg';

const items = [
  {Icon: HomeIcon, active: true, label: 'Home'},
  {Icon: PortfolioIcon, active: false, label: 'Portfolio'},
  {Icon: SearchIcon, active: false, label: 'Search'},
  {Icon: ProfileIcon, active: false, label: 'Profile'},
];

function HomeBottomBar(): React.JSX.Element {
  return (
    <View style={styles.bar}>
      {items.map(({Icon, active, label}) => (
        <View key={label} style={styles.item}>
          <Icon width={22} height={22} />
          <Text style={[styles.label, active ? styles.labelActive : null]}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E9F0',
    backgroundColor: '#FFFFFF',
  },
  item: {
    width: 64,
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    color: '#606773',
    fontSize: 10,
    lineHeight: 13,
  },
  labelActive: {
    color: '#FA8A34',
  },
});

export default HomeBottomBar;
