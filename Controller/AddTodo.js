//import liraries
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ToastAndroid, TextInput, TouchableOpacity,
    Dimensions
} from 'react-native';
import TodoManager from '../DataServer/TodoManager';
// create a component
class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pwd: "",
        }
        this._checkLogin = this._checkLogin.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder={'输入名字'}
                    autoFocus={true}
                    onChangeText={(name) => this.setState({ name })}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'输入内容'}
                    underlineColorAndroid='transparent'
                    onChangeText={(pwd) => {
                        this.setState({ pwd })
                    }}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                        this._checkLogin();
                    }}
                >
                    <Text style={styles.loginButtonText}>添加信息</Text>
                </TouchableOpacity>

            </View>
        );

    }
    //处理登录
    _checkLogin() {
        // this.props.navigation.navigate('MainView');
        const userinfo = {
            name: this.state.name,
            content: this.state.pwd,
        }
        if (this.state.name == "" || this.state.pwd == "") {
            ToastAndroid.show("用户名或密码不能为空！", ToastAndroid.SHORT);
            return;
        }
        TodoManager.addTodoInfo(userinfo);
        this.props.navigation.goBack();
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textInput: {
        width: Dimensions.get('window').width - 40,
        paddingLeft: 10,
        marginTop: 20,
        borderRadius: 5,
        height: 44,
        borderWidth: 1,
        borderColor: 'gray',

    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#00a0e9',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        height: 44,
    },
    loginButtonText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

//make this component available to the app
export default AddTodo;
