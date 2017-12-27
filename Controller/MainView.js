//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
} from 'react-native';
import PubSub from 'pubsub-js';
import MainItem from './MainItem';
import TodoManager from '../DataServer/TodoManager';
import AddTodo from './AddTodo';
import Footer from '../Component/Footer';
// create a component
class MainView extends Component {
    static navigationOptions = {
        title: '备忘录',
        headerStyle: ({
            backgroundColor: "#0EABE8",
            elevation: 0,
        }),
        headerTitleStyle: ({
            alignSelf: 'center'
        }),
        headerLeft: (
            <TouchableOpacity onPress={() => {
                PubSub.publish('all');
            }}>
                <Text>全选</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => {
                PubSub.publish('add');
            }}>
                <Text>添加</Text>
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        PubSub.subscribe('all', () => {
            TodoManager.selectAll();
        });
        PubSub.subscribe('add', () => {
            this.props.navigation.navigate('AddTodo');
        });
        TodoManager.setListener((todo) => {
            this.setState({
                ds: this.state.ds.cloneWithRows(todo),
            });
        });
        TodoManager.setFinishListener((total) => {
            this.setState({
                selectCount: total,
            });
        });
        TodoManager.getTodoInfo();

    }
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) =>  r1 !== r2  });
        this.state = {
            ds: ds.cloneWithRows([]),
            isSelect: false,
            selectCount: 0,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={(rowData) => {
                        console.log('===========rowData=========================');
                        console.log(rowData);
                        console.log('====================================');
                        return (
                            <View>
                                <MainItem
                                    {...rowData}
                                    clickSelect={(id) => {
                                        console.log('====================================');
                                        console.log('点击了id' + id);
                                        console.log('====================================');
                                        TodoManager.singleSelect(id);
                                    }} />
                                <Text>{rowData.finish}</Text>
                            </View>

                        );
                    }}
                    enableEmptySections={true}
                />

                <Footer selectCount={this.state.selectCount} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default MainView;
