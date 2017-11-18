import {Location, Permissions} from "expo";

export async function getLocationAsync() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        // TODO cancel navigation and show error
    }

    return await Location.getCurrentPositionAsync({});
}