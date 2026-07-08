import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function DeleteIcon(): React.JSX.Element {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M7.2 5.4H14.2V12.6H7.2L3.8 9L7.2 5.4Z"
        stroke="#111827"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
      />
      <Path
        d="M9 7.5L12 10.5M12 7.5L9 10.5"
        stroke="#111827"
        strokeLinecap="round"
        strokeWidth={1.2}
      />
    </Svg>
  );
}
