import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Circle } from 'react-native-maps';
import Supermarkets from '../components/Supermarkets';
import { useApi } from '../hooks/api.hook';





const Top5SuperMarketsScreen = props => {
    const { location_latitude, location_longitude, listid, radius,products } = props.route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const api = useApi();
    const chosen = [];
    console.log(radius);



    useEffect(() => {
       api.getSupermarkets(location_latitude, location_longitude, radius).then(result => setData(result)).catch(e => console.warn(e));
        
        
    }, []);

    // const _chosen = (SuperMarket) => {
    //     chosen.push(SuperMarket);
    //     console.log(chosen);
    // }
    // const _unchosen = (SuperMarket) => {
    //     chosen.pop(SuperMarket);
    //     console.log(chosen);
    // }

    var coord = [];

    for (let i = 0; i < data.length; i++) {

        coord.push(
            <MapView.Marker
                coordinate={{
                    latitude: data[i].coordinate.latitude,
                    longitude: data[i].coordinate.longitude
                }}

                title={data[i].placeName}
            />
        )
    }
    const _getSupermarkets = async () => {
     
        const result = await api.SuperGetMap(location_latitude, location_longitude, radius / 1000);
        setLoading(false);
        props.navigation.navigate('SumScreen', {
            lat:location_latitude,long:location_longitude,radius:radius,products:products,listid:listid,supermarkets:result
          })
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
                    radius={parseFloat(radius)}
                    fillColor={'rgba(200,300,200,0.5)'}
                />
                {coord} 


            </MapView>

            <FlatList
                data={data}
                style={{ flex: 1 }}
                keyExtractor={item => item.placeId}
                renderItem={({ item }) => (
                    <Supermarkets
                        navigation={props.navigation}
                        isOpen={item.isOpen}
                        item={item}
                        //chosen={_chosen}
                        //unchosen={_unchosen}
                    />
                )}
            />
            <Button title="לעבור לחישוב" color="#66CDAA"  onPress={_getSupermarkets}/>

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



