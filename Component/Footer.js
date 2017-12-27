//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import TodoManager from '../DataServer/TodoManager';

// create a component
class Footer extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={()=>{
                    TodoManager.delTodoInfo();
                }}
            >
                <Text>删除{`${this.props.selectCount}`}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#50FC4E',
        height:50,
        width:Dimensions.get('window').width,
    },
});

//make this component available to the app
export default Footer;
