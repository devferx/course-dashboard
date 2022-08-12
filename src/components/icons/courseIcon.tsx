import type { SVGProps } from "react";

interface CourseIconProps extends SVGProps<SVGSVGElement> {
  isActive: boolean;
  size?: number;
}

export const CourseIcon = ({
  isActive,
  size = 40,
  ...props
}: CourseIconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={20} fill={isActive ? "#1F1F3A" : "#fff"} />
    <path
      d="M26.667 12.5H13.334c-.92 0-1.667.746-1.667 1.667V22.5c0 .92.746 1.667 1.667 1.667h13.333c.92 0 1.667-.747 1.667-1.667v-8.333c0-.92-.747-1.667-1.667-1.667ZM16.667 27.5h6.667M20 24.167V27.5"
      stroke={isActive ? "#fff" : "#8E8EA1"}
      strokeWidth={1.667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
