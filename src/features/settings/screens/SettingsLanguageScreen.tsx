import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';

import HomeBottomBar from '../../home/components/HomeBottomBar';
import {BackIcon} from '../../auth/sign-up/SignUpIcons';
import type {AppLanguage} from '../store/settingsSlice';
import useSettingsLanguageScreen from '../hooks/useSettingsLanguageScreen';

const languageOptions: Array<{
  labelKey: string;
  value: AppLanguage;
}> = [
  {labelKey: 'settings.english', value: 'en'},
  {labelKey: 'settings.arabic', value: 'ar'},
];

function SettingsLanguageScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {goBack, handleBottomBarPress, language, selectLanguage} =
    useSettingsLanguageScreen();

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

        <Text style={styles.title}>{t('settings.language')}</Text>

        {languageOptions.map(option => {
          const active = language === option.value;

          return (
            <Pressable
              accessibilityRole="button"
              key={option.value}
              onPress={() => selectLanguage(option.value)}
              style={styles.row}>
              <View style={styles.rowIcon}>
                <Text style={styles.rowIconText}>A</Text>
              </View>
              <Text style={styles.rowText}>{t(option.labelKey)}</Text>
              <View style={[styles.radio, active ? styles.radioActive : null]}>
                {active ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
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
    marginBottom: 10,
    color: '#171B22',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
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
  radio: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: '#EEF1F5',
  },
  radioActive: {
    backgroundColor: '#FA8A34',
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});

export default SettingsLanguageScreen;
