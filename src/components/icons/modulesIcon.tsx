import type { SVGProps } from "react";

interface ModulesIconProps extends SVGProps<SVGSVGElement> {
  isActive: boolean;
  size?: number;
}

export const ModulesIcon = ({
  isActive,
  size = 40,
  ...props
}: ModulesIconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={20} fill={isActive ? "#1F1F3A" : "#fff"} />
    <path
      d="M27.5 23.333v-6.666a1.667 1.667 0 0 0-.833-1.442l-5.834-3.333a1.666 1.666 0 0 0-1.666 0l-5.834 3.333a1.666 1.666 0 0 0-.833 1.442v6.666a1.668 1.668 0 0 0 .833 1.442l5.834 3.333a1.666 1.666 0 0 0 1.666 0l5.834-3.333a1.668 1.668 0 0 0 .833-1.442Z"
      stroke={isActive ? "#fff" : "#8E8EA1"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.725 15.8 20 20.008l7.275-4.208M20 28.4V20"
      stroke={isActive ? "#fff" : "#8E8EA1"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
