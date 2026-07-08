import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

import ProfileIcon from '../../../assets/icons/profile-bar-icon.svg';
import HomeBottomBar from '../../home/components/HomeBottomBar';
import {BackIcon} from '../../auth/sign-up/SignUpIcons';
import useSettingsScreen from '../hooks/useSettingsScreen';

function SettingsScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {
    goBack,
    handleBottomBarPress,
    logout,
    openLanguageSettings,
    user,
  } = useSettingsScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Pressable
          accessibilityRole="button"
          hitSlop={14}
          onPress={goBack}
          style={styles.backButton}>
          <BackIcon />
        </Pressable>

        <Text style={styles.title}>{t('settings.title')}</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            {user.image ? (
              <Image source={{uri: user.image}} style={styles.avatarImage} />
            ) : (
              <ProfileIcon width={22} height={22} />
            )}
          </View>
          <Text numberOfLines={1} style={styles.userName}>
            {user.name}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>{t('settings.basic')}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={openLanguageSettings}
          style={styles.row}>
          <View style={styles.rowIcon}>
            <Text style={styles.rowIconText}>A</Text>
          </View>
          <Text style={styles.rowText}>{t('settings.language')}</Text>
          <Text style={styles.chevron}>{'>'}</Text>
        </Pressable>

        <Text style={styles.sectionLabel}>{t('settings.other')}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={logout}
          style={styles.row}>
          <View style={styles.rowIcon}>
            <Text style={styles.rowIconText}>↪</Text>
          </View>
          <Text style={styles.rowText}>{t('settings.logout')}</Text>
          <Text style={styles.chevron}>{'>'}</Text>
        </Pressable>
      </ScrollView>
      <HomeBottomBar
        activeItem="Profile"
        onItemPress={handleBottomBarPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  scrollContent: {
    paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: 92,
  },
  backButton: {
    width: 42,
    height: 26,
    justifyContent: 'center',
  },
  title: {
    marginTop: 12,
    color: '#171B22',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  profileCard: {
    height: 69,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E1E5EC',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 19,
    backgroundColor: '#F2FAF7',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    flex: 1,
    marginLeft: 12,
    color: '#171B22',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  sectionLabel: {
    marginTop: 18,
    marginBottom: 8,
    color: '#A1A7B2',
    fontSize: 11,
    lineHeight: 15,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E1E5EC',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  rowIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFE2CC',
    borderRadius: 10,
    backgroundColor: '#FFF6EF',
  },
  rowIconText: {
    color: '#FA8A34',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 13,
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    color: '#171B22',
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    color: '#A1A7B2',
    fontSize: 15,
    lineHeight: 18,
  },
});

export default SettingsScreen;
