import React from 'react';
import type {SvgProps} from 'react-native-svg';

import BitcoinIconAsset from '../../assets/icons/bitcoin-icon.svg';

type BitcoinIconProps = Pick<SvgProps, 'height' | 'width'>;

function BitcoinIcon({
  height = 82,
  width = 62,
}: BitcoinIconProps): React.JSX.Element {
  return <BitcoinIconAsset width={width} height={height} />;
}

export default BitcoinIcon;
