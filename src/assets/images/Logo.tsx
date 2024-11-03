import * as React from "react";
// eslint-disable-next-line
interface Props extends React.SVGProps<SVGSVGElement> {}

export const Logo = (props: Props) => (
  <svg
    width="142"
    height="41"
    viewBox="0 0 142 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.55273 4.09787C7.12207 5.09823 5.82837 6.28098 4.70532 7.6124C9.29462 7.18633 15.1252 7.88204 21.8944 11.2667C29.123 14.8809 34.9438 15.0031 38.9948 14.2217C38.6272 13.1088 38.1644 12.0392 37.6163 11.0224C32.979 11.5115 27.034 10.8641 20.1056 7.39998C15.706 5.20018 11.8278 4.29401 8.55273 4.09787ZM34.9074 7.16665C31.2453 3.075 25.9234 0.5 20 0.5C18.2605 0.5 16.5727 0.722107 14.9637 1.13948C17.1429 1.73409 19.4579 2.60399 21.8944 3.82227C26.967 6.35853 31.3464 7.17516 34.9074 7.16665ZM39.8609 18.1281C34.9669 19.0945 28.2088 18.896 20.1056 14.8444C12.53 11.0566 6.50043 11.1043 2.4339 12.008C2.224 12.0546 2.01904 12.1036 1.81903 12.1546C1.28662 13.3125 0.861634 14.5301 0.556702 15.7945C0.882386 15.7075 1.21893 15.6248 1.56616 15.5476C6.49957 14.4513 13.4701 14.4989 21.8944 18.7111C29.4701 22.4989 35.4996 22.4512 39.5662 21.5475C39.7055 21.5166 39.8428 21.4846 39.9778 21.4516C39.9926 21.1363 40 20.819 40 20.5C40 19.6975 39.9528 18.906 39.8609 18.1281ZM39.3248 25.6723C34.4783 26.5196 27.917 26.1944 20.1056 22.2888C12.53 18.501 6.50043 18.5487 2.4339 19.4524C1.53125 19.6529 0.719239 19.8972 0.00293 20.1551C0.000977 20.2698 0 20.3848 0 20.5C0 31.5457 8.95429 40.5 20 40.5C29.2571 40.5 37.0453 34.2109 39.3248 25.6723Z"
      fill="url(#paint0_linear_832_821)"
    />
    <path
      d="M70.736 16.108V12.484H56.456V16.108H61.688V29.5H65.48V16.108H70.736ZM78.5045 17.572C78.2645 17.5 77.9045 17.452 77.5445 17.452C76.5845 17.452 75.0725 17.836 74.4485 19.18V17.572H70.9205V29.5H74.5685V24.292C74.5685 21.916 75.8885 21.052 77.3525 21.052C77.7125 21.052 78.0965 21.076 78.5045 21.172V17.572ZM80.0911 26.212C80.0911 28.108 81.6031 29.836 84.2191 29.836C85.8031 29.836 86.9551 29.164 87.5791 28.156C87.5791 28.972 87.6751 29.404 87.6991 29.5H90.9871C90.9631 29.38 90.8431 28.588 90.8431 27.652V21.82C90.8431 19.372 89.4271 17.212 85.5631 17.212C82.0591 17.212 80.4751 19.468 80.3311 21.172L83.4991 21.82C83.5711 20.932 84.2671 20.068 85.5391 20.068C86.6911 20.068 87.2911 20.668 87.2911 21.364C87.2911 21.772 87.0751 22.084 86.4271 22.18L83.6191 22.612C81.6511 22.9 80.0911 24.1 80.0911 26.212ZM85.1071 27.196C84.0991 27.196 83.6911 26.596 83.6911 25.972C83.6911 25.132 84.2671 24.772 85.0351 24.652L87.2911 24.292V24.82C87.2911 26.668 86.1871 27.196 85.1071 27.196ZM105.321 17.572H101.481L98.9366 24.988L96.1766 17.572H92.2166L97.1126 29.5H100.785L105.321 17.572ZM110.826 29.5V12.124H107.178V29.5H110.826ZM119.518 26.5C118.15 26.5 116.83 25.516 116.83 23.524C116.83 21.508 118.15 20.572 119.518 20.572C120.91 20.572 122.206 21.508 122.206 23.524C122.206 25.54 120.91 26.5 119.518 26.5ZM119.518 17.212C115.965 17.212 113.182 19.828 113.182 23.524C113.182 27.22 115.965 29.86 119.518 29.86C123.094 29.86 125.854 27.22 125.854 23.524C125.854 19.828 123.094 17.212 119.518 17.212ZM127.362 30.172C127.698 32.308 129.882 34.42 133.314 34.42C137.778 34.42 139.698 31.444 139.698 28.012V17.572H136.218V18.844C135.882 18.22 134.85 17.356 132.906 17.356C129.642 17.356 127.362 20.044 127.362 23.188C127.362 26.5 129.738 28.996 132.906 28.996C134.634 28.996 135.666 28.3 136.098 27.652V28.204C136.098 30.364 134.97 31.252 133.146 31.252C131.778 31.252 130.818 30.412 130.578 29.26L127.362 30.172ZM133.578 25.828C132.114 25.828 131.01 24.82 131.01 23.188C131.01 21.556 132.21 20.548 133.578 20.548C134.946 20.548 136.122 21.556 136.122 23.188C136.122 24.82 135.066 25.828 133.578 25.828Z"
      fill="#191825"
    />
    <defs>
      <linearGradient
        id="paint0_linear_832_821"
        x1="36"
        y1="43.7"
        x2="-3.73321"
        y2="36.0931"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5D50C6" />
        <stop offset="1" stopColor="#F85E9F" />
      </linearGradient>
    </defs>
  </svg>
);
