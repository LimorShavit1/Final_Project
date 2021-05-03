import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Circle } from 'react-native-maps';
import Supermarkets from '../components/Supermarkets';
import { useApi } from '../hooks/api.hook';





const Top5SuperMarketsScreen = props => {
    const { location_latitude, location_longitude, listid } = props.route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const api = useApi();



    useEffect(() => {
        api.getSupermarkets(location_latitude, location_longitude).then(result => setData(result)).catch(e => console.warn(e));
    }, []);


    var coord = [];

    for (let i = 0; i < data.length; i++) {

        coord.push(
            <MapView.Marker
                coordinate={{
                    latitude: data[i].coordinate.latitude,
                    longitude: data[i].coordinate.longitude
                }}
            />
        )
    }


    return (


        <View style={styles.container}>
            <MapView
                style={{ alignSelf: 'stretch', height: 350 }}
                region={{ latitude: location_latitude, longitude: location_longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 }}

            >
                <MapView.Marker
                    coordinate={{
                        latitude: location_latitude,
                        longitude: location_longitude
                    }}
                    title="I am here!"



                />
                <Circle
                    center={{
                        latitude: location_latitude,
                        longitude: location_longitude
                    }}
                    radius={1500}
                    fillColor={'rgba(200,300,200,0.5)'}
                />
                {coord}


            </MapView>
          
            <FlatList
                    data={data}
                    style={{flex: 1}}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <Supermarkets
                            navigation={props.navigation}
                            placeName={item.placeName}
                            placeId={item.placeId}
                            uri={item.uri}
                            isOpen={item.isOpen}
                            placeAddress={item.placeAddress}
                            id={item._id}
                        />
                    )}
                />
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container2: {
        flex: 2,
        marginTop: 400,


    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
export default Top5SuperMarketsScreen;



