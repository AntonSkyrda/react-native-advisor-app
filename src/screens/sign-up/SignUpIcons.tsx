import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

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

export function AccountIcon(): React.JSX.Element {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={8} cy={7} r={2.5} stroke="#00A98F" strokeWidth={1.4} />
      <Path
        d="M3.8 15.2C4.4 12.9 6 11.8 8 11.8C9 11.8 9.9 12.1 10.6 12.6"
        stroke="#00A98F"
        strokeLinecap="round"
        strokeWidth={1.4}
      />
      <Path
        d="M14.2 8.4V13.4M11.7 10.9H16.7"
        stroke="#00A98F"
        strokeLinecap="round"
        strokeWidth={1.4}
      />
    </Svg>
  );
}

export function EyeIcon(): React.JSX.Element {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M2.3 9C3.8 6.4 6 5.1 9 5.1C12 5.1 14.2 6.4 15.7 9C14.2 11.6 12 12.9 9 12.9C6 12.9 3.8 11.6 2.3 9Z"
        stroke="#00A98F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.3}
      />
      <Circle cx={9} cy={9} r={1.8} stroke="#00A98F" strokeWidth={1.3} />
    </Svg>
  );
}
