import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const cards = [
  {backgroundColor: '#5C5C5C', steps: 2},
  {backgroundColor: '#F05C6A', steps: 3},
];

function BeforeYouStart(): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('home.beforeStart')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cards}>
        {cards.map(card => (
          <View
            key={card.steps}
            style={[styles.card, {backgroundColor: card.backgroundColor}]}>
            <View style={styles.coin}>
              <Text style={styles.coinText}>...</Text>
            </View>
            <Text style={styles.cardTitle}>{t('home.cardTitle')}</Text>
            <Text style={styles.cardSubtitle}>{t('home.cardSubtitle')}</Text>
            <Text style={styles.steps}>
              {t('home.steps', {count: card.steps})}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 18,
  },
  cards: {
    columnGap: 12,
    paddingTop: 9,
    paddingRight: 17,
  },
  card: {
    width: 150,
    height: 112,
    padding: 14,
    borderRadius: 10,
  },
  coin: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#FF873D',
  },
  coinText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cardTitle: {
    marginTop: -28,
    marginLeft: 48,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  cardSubtitle: {
    marginLeft: 48,
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 14,
  },
  steps: {
    marginTop: 'auto',
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default BeforeYouStart;
