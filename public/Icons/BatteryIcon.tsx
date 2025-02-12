interface Props {
  conditionGarment: number;
  active?: boolean;
}

export const BatteryIcon = ({ conditionGarment, active = false }: Props) => {
  const gradientColor = active ? "#0DBC73" : "#F2EEEF";

  const rectangles = Array.from({ length: conditionGarment }, (_, index) => (
    <rect
      key={index}
      width="71.369"
      height="23.3571"
      rx="10"
      transform={`matrix(-1 0 0 1 75.1845 ${105.0952 - index * 29})`}
      fill={active ? `url(#paint${index}_linear_4_36)` : gradientColor}
    />
  ));

  return (
    <svg
      width="87"
      height="148"
      viewBox="0 0 87 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_4_36)">
        <path
          d="M68.4386 140H10.3159C3.44225 140 0.713005 133.261 0.207588 129.892L0.207588 18.4477C0.207588 11.9783 6.94646 9.01324 10.3159 8.33936H24.4675V0H53.0235V8.33936H68.4386C74.5036 8.33936 77.7046 15.0782 78.5469 18.4477L78.5469 129.892C78.5469 137.372 71.8081 139.747 68.4386 140Z"
          fill="#FFFFFF"
        />
      </g>
      {rectangles}

      <defs>
        <filter
          id="filter0_d_4_36"
          x="0.207581"
          y="0"
          width="86.3394"
          height="148"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_36"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_36"
            result="shape"
          />
        </filter>

        {active &&
          [...Array(4)].map((_, index) => (
            <linearGradient
              key={index}
              id={`paint${index}_linear_4_36`}
              x1="35.6845"
              y1="23.3571"
              x2="35.6845"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stopColor={gradientColor}
                stopOpacity={active ? "0.2" : "0.6"}
              />
              <stop
                offset="1"
                stopColor={gradientColor}
                stopOpacity={active ? "0.6" : "0.2"}
              />
            </linearGradient>
          ))}
      </defs>
    </svg>
  );
};
