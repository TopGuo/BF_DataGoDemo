//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

/**
 * //isSelect 父组件传属性
//selectItem
//tapItem
 */
// create a component
class MainItem extends Component {
    
    render() {
        let source = null;
        source= this.props.finish?require('../assets/images/select.png'):require('../assets/images/unselect.png');
        
        let isSelectImage = (
            <Image source={source}/>
        );
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    this.props.clickSelect(this.props.id);
                }}>
                {isSelectImage}
               <Text>{this.props.finish?'已完成':'未完成'}</Text>
                <Text>{this.props.name}</Text>
                <Text>{this.props.content}</Text>
                <Image source={require('../assets/images/right.png')}/>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: 50,
    },
});

//make this component available to the app
export default MainItem;
