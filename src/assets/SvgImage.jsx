import React from 'react';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from "react-native-svg";
import {

    arrowRight,
    callsIcon,
    chatsIcon,
} from "./svg";
import {
    COLORS,
} from "../styles/styleVariables";
import {styleFuncs} from "../styles/styleFunctions";

function SvgImage({id, color, width, height, strokeWidth}) {
    switch (id) {
        case arrowRight:
            return (
                <Svg
                    width={width || 9}
                    height={height || 16}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox='0 0 9 16'
                >
                    <Path
                        d="m1.656 1.175 6.319 6.3a.662.662 0 0 1 .16.244A.812.812 0 0 1 8.18 8c0 .1-.015.194-.046.281a.65.65 0 0 1-.16.244l-6.319 6.319a.89.89 0 0 1-.656.262.92.92 0 0 1-.675-.281.9.9 0 0 1-.281-.656.9.9 0 0 1 .28-.657L5.838 8 .325 2.488a.88.88 0 0 1-.263-.648c0-.256.094-.478.282-.665A.9.9 0 0 1 1 .894a.9.9 0 0 1 .656.281Z"
                        fill={color || COLORS.white}
                    />
                </Svg>
            )
            break;
        case callsIcon: {
            const size = styleFuncs.mediaStyle(22, 30)
            return (
                <Svg
                    width={size}
                    height={size}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28"

                >
                    <Path
                        fill={color || COLORS.greenLight}
                        d="M27.468 24.726c-.192.324-.43.618-.708.872-1.978 1.809-3.861 2.619-5.647 2.352-3.66-.545-7.84-3.118-12.577-7.694l-.008.005-.392-.397-.397-.392C3.168 14.726.595 10.546.049 6.887-.216 5.101.594 3.218 2.403 1.24a3.814 3.814 0 0 1 6.096.632l2.408 4.07c.59.997.595 2.234.013 3.236l-.737 1.268a1.723 1.723 0 0 0 .16 1.96l.111.123 5.018 5.018a1.723 1.723 0 0 0 1.936.348l.147-.077 1.268-.737a3.198 3.198 0 0 1 3.033-.097l.203.11 4.07 2.408a3.814 3.814 0 0 1 1.34 5.224Z"
                    />
                    <Path
                        d="M21.024 25.968c1.212.181 2.62-.41 4.247-1.898a2.24 2.24 0 0 0-.37-3.58l-3.856-2.283-.15-.082a1.65 1.65 0 0 0-1.564.05l-1.274.74-.203.102a3.065 3.065 0 0 1-3.445-.618l-4.855-4.857-.15-.17a3.065 3.065 0 0 1-.286-3.488l.707-1.215a1.65 1.65 0 0 0-.007-1.67L7.51 3.1a2.24 2.24 0 0 0-3.58-.37C2.442 4.355 1.85 5.763 2.032 6.975c.469 3.146 2.774 6.912 6.962 11.26l.484.48.69.663c4.184 3.96 7.81 6.135 10.856 6.59Z"
                        fill='#171717'
                    />
                </Svg>
            );
            break;
        }
        case chatsIcon: {
            const size = styleFuncs.mediaStyle(21, 28)
            return (
                <Svg
                    width={size}
                    height={size}
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Path
                        d="M16.5 32C25.06 32 32 25.06 32 16.5 32 7.94 25.06 1 16.5 1 7.94 1 1 7.94 1 16.5c0 4.128 1.613 7.878 4.244 10.656l-3.117 3.558A.775.775 0 002.709 32H16.5z"
                        stroke="#81CFB0"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            )
            break;
        }

        default :
            return null
        }

}
export default SvgImage;
