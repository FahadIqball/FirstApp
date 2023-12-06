import Geolocation from 'react-native-geolocation-service';

const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
        (position) => {
          console.log({position});
          
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}

export {
    getCurrentLocation
} 