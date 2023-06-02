import { ThreeDots, Oval } from "react-loader-spinner";

export default function Spinner({ size = "50", radius = "4", color = "#FFFFFF" }) {
  return (
    <ThreeDots
      height={size}
      width={size}
      radius={radius}
      color={color}
    />
  );
}

export function OvalSpinner() {
  return (
    <Oval
      height={50}
      width={50}
      color="#333333"
      secondaryColor="#6D6D6D"
      strokeWidthSecondary={3}
    />
  );
}
//
