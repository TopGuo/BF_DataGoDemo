//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';

// create a component
class MainView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/images/1.jpg')} style={{flex: 1, height: 100, resizeMode: Image.resizeMode.cover }} />
                </View>
            </View>
        );
    }
}
// <Text>
//     屏幕宽度={Dimensions.get('window').width}
//     屏幕高度={Dimensions.get('window').height}
// </Text>
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:200,
    },
});

//make this component available to the app
export default MainView;
