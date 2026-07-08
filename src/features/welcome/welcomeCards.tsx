import React from 'react';

import BarsIcon from '../../assets/icons/bars.svg';
import BitcoinLogoTwo from '../../assets/icons/bitcoin-logo-2.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import CraneIcon from '../../assets/icons/crane.svg';
import CrystalIcon from '../../assets/icons/crystal.svg';
import DropIcon from '../../assets/icons/drop.svg';
import HandIcon from '../../assets/icons/hand.svg';
import HomeIcon from '../../assets/icons/home.svg';
import ILogo from '../../assets/icons/i-logo.svg';
import InvescoLogo from '../../assets/icons/invesco-seeklogo.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import TLogo from '../../assets/icons/t-logo.svg';
import ThunderIcon from '../../assets/icons/thunder.svg';
import VLogo from '../../assets/icons/v-logo.svg';
import type {WelcomeCoin} from './components/WelcomeFeatureCard';

export type WelcomeCardName = 'one' | 'two' | 'three' | 'four' | 'five';

export type WelcomeCardConfig = {
  coins: WelcomeCoin[];
  label: string;
  position: WelcomeCardName;
};

export const welcomeCards: WelcomeCardConfig[] = [
  {
    position: 'one',
    label: 'Lorem ipsum 2',
    coins: [
      {backgroundColor: '#7ED7C9', content: <ProfileIcon width={22} height={22} />},
      {backgroundColor: '#FF873D', content: <HandIcon width={21} height={17} />},
      {backgroundColor: '#7ED7C9', content: <ProfileIcon width={22} height={22} />},
    ],
  },
  {
    position: 'two',
    label: 'Lorem ipsum',
    coins: [
      {backgroundColor: '#9BDDE4', content: <CraneIcon width={21} height={21} />},
      {backgroundColor: '#5A9BF8', content: <BuildingIcon width={18} height={20} />},
      {backgroundColor: '#8B8AE8', content: <HomeIcon width={21} height={19} />},
    ],
  },
  {
    position: 'three',
    label: 'Lorem ipsum 4',
    coins: [
      {backgroundColor: '#F7D16D', content: <DropIcon width={15} height={20} />},
      {backgroundColor: '#CB9655', content: <BarsIcon width={40} height={40} />},
      {backgroundColor: '#E2ED5C', content: <ThunderIcon width={14} height={22} />},
    ],
  },
  {
    position: 'four',
    label: 'Lorem ipsum 3',
    coins: [
      {backgroundColor: '#5F70B2', content: <InvescoLogo width={22} height={19} />},
      {backgroundColor: '#A91720', content: <VLogo width={23} height={24} />},
      {backgroundColor: '#111111', content: <ILogo width={6} height={24} />},
    ],
  },
  {
    position: 'five',
    label: 'Lorem ipsum 5',
    coins: [
      {backgroundColor: '#8794EA', content: <CrystalIcon width={16} height={25} />},
      {
        backgroundColor: '#FF873D',
        content: <BitcoinLogoTwo width={17} height={22} />,
      },
      {backgroundColor: '#7ED7C9', content: <TLogo width={21} height={19} />},
    ],
  },
];
