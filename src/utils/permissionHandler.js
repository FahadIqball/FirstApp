import { Linking } from "react-native";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { getCurrentLocation } from "./locationHandler";

const locationPermissionHandler = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        .then((res) => {
            if (res == RESULTS.DENIED) {
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
                    .then((result) => {
                        console.log({ result });
                        if (result == RESULTS.BLOCKED) {
                            Linking.openSettings()
                        } else if (result == RESULTS.GRANTED) {
                            getCurrentLocation()
                        }
                    })
                    .catch((error) => {
                        console.log({ error });
                    })
            } else if (res == RESULTS.GRANTED) {
                getCurrentLocation()
            } else if (res == RESULTS.BLOCKED) {
                Linking.openSettings()
            }

            console.log({ res });
        })
        .catch((err) => {
            console.log({ err });
        })
}

export {
    locationPermissionHandler
}