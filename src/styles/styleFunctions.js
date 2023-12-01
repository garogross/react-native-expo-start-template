import {COLORS, fonts, mediaSizes} from "./styleVariables";

export const styleFuncs = {
    pressed: (pressed, styles) => (
        [styles, {opacity: pressed ? 0.7 : 1}]
    ),
    mediaStyle: (sm, md, lg) => {
        const sizes = {sm, md, lg: lg || md}
        const curSize = Object.keys(mediaSizes).find(item => mediaSizes[item])
        return sizes[curSize]

    },
    setFont(size,weight = 400,color = COLORS.white) {
        const main = {
            fontSize: Array.isArray(size) ? this.mediaStyle(...size) : size,
            fontFamily: fonts[weight],
        }
        return color !== null ? {...main,color} : main

    }
}