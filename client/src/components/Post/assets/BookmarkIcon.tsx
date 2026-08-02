type BookmarkIconProps = {
  filled?: boolean;
  className?: string;
};

export const BookmarkIcon = ({
  filled = false,
  className,
}: BookmarkIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.5 3.75h11A1.75 1.75 0 0 1 19.25 5.5v14.12a.75.75 0 0 1-1.175.62L12 16.35l-6.075 3.89A.75.75 0 0 1 4.75 19.62V5.5A1.75 1.75 0 0 1 6.5 3.75Z"
        fill="currentColor"
        fillOpacity={filled ? 1 : 0}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="transition-[fill-opacity] duration-150"
      />
    </svg>
  );
};
