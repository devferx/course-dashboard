import type { SVGProps } from "react";

interface LessonsIconProps extends SVGProps<SVGSVGElement> {
  isActive: boolean;
  size?: number;
}

export const LessonsIcon = ({
  isActive,
  size = 40,
  ...props
}: LessonsIconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={20} fill={isActive ? "#1F1F3A" : "#fff"} />
    <path
      d="M13.334 26.25a2.083 2.083 0 0 1 2.083-2.083h11.25"
      stroke={isActive ? "#fff" : "#8E8EA1"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.417 11.667h11.25v16.666h-11.25a2.083 2.083 0 0 1-2.083-2.083v-12.5a2.083 2.083 0 0 1 2.083-2.083v0Z"
      stroke={isActive ? "#fff" : "#8E8EA1"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
