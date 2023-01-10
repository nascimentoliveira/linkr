import { ThreeDots } from 'react-loader-spinner';

export default function Spinner({ size = '50', radius = '4', color = '#FFFFFF' }) {
  return (
    <ThreeDots
      height={size}
      width={size}
      radius={radius}
      color={color}
    />
  );
}