import {navigationRef} from "./StackNavigator";

export const navigationPush = (scrName,options) => {
    if(navigationRef.isReady()) navigationRef.navigate(scrName,options)
}

export const navigationGoBack = () => {
    if(navigationRef.isReady()) navigationRef.goBack()
}