import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function BackIcon(): React.JSX.Element {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.5 4L6.5 9L11.5 14"
        stroke="#1D2433"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}
