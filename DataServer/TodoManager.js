import { SQLite } from 'expo';
class TodoManager {
    constructor() {
        this.db = SQLite.openDatabase('todoDB4');
        this.db.transaction((tx) => {
            const sql = "create table 'main'.'todo' ('id' integer not null primary key autoincrement,'name' text,'content' text,'finish' integer)";
            tx.executeSql(sql, null, (tx, result) => {
                console.log('====================================');
                console.log('创建表成功');
                console.log('====================================');
            }, (tx, error) => {
                console.log('====================================');
                console.log('创建表失败' + error);
                console.log('====================================');
            });
        });
    }

    setListener(listener) {
        this.listener = listener;
    }

    setFinishListener(listener) {
        this.finishListener = listener;
    }

    getTodoInfo(callBack) {
        console.log('====================================');
        console.log('bbbbb');
        console.log('====================================');
        this.db.transaction((tx) => {
            const sql = 'select * from todo';
            tx.executeSql(sql, null, (tx, result) => {
                const todos = result.rows._array;
                console.log('=============todostodos=======================');
                console.log(todos);
                console.log('====================================');
                
                //监听选中与否的变量变化
                let selectCount = 0;
                todos.map((value) => {
                    if (value.finish == 1) {
                        selectCount++;
                    }
                });
                //巧妙思路的变化
                if (callBack) {
                    callBack(todos);
                }
                if (this.listener) {
                    console.log('====================================');
                    console.log('this.listener');
                    console.log('====================================');
                    this.listener(todos);
                }
                //回传过去
                this.finishListener(selectCount);
            }, (tx, error) => {
                console.log('====================================');
                console.log('查询失败' + error);
                console.log('====================================');
                //巧妙思路的变化
                if (callBack) {
                    callBack([]);
                }
                if (this.listener) {
                    this.listener([]);
                }
            });
        });
    }

    addTodoInfo(info, callBack) {
        this.db.transaction((tx) => {
            const sql = `insert into todo(name,content,finish) values('${info.name}','${info.content}',0)`;
            tx.executeSql(sql, null, (tx, result) => {
                console.log('====================================');
                console.log('添加成功');
                console.log('====================================');
                this.getTodoInfo();
                if (callBack) {
                    callBack(true);
                }

            }, (tx, error) => {
                console.log('====================================');
                console.log('添加失败' + error);
                console.log('====================================');
                if (callBack) {
                    callBack(false);
                }
            });
        });
    }

    delTodoInfo() {
        // this.db.transaction((tx) => {
        //     const ids = info.id.join(',');
        //     const sql = `delete from todo where id in (${ids})`;
        //     tx.executeSql(sql, null, (tx, result) => {
        //         console.log('====================================');
        //         console.log('删除成功');
        //         console.log('====================================');
        //         if (callBack) {
        //             callBack(true);
        //         }
        //         this.getTodoInfo();
        //     }, (tx, error) => {
        //         console.log('====================================');
        //         console.log('删除失败' + error);
        //         console.log('====================================');
        //         if (callBack) {
        //             callBack(false);
        //         }
        //     });

        // });
        this.db.transaction((tx) => {
            const sql = 'delete from todo where finish = 1';
            tx.executeSql(sql, null, (tx, resultSet) => {
                console.log('删除成功');
                this.getTodoInfo();
            })
        })
    }

    //全选
    selectAll() {
        this.db.transaction((tx) => {
            const sql = 'select * from todo';
            tx.executeSql(sql, null, (tx, result) => {
                const array = result.rows._array;
                let length = array.length;
                let slength = 0;
                array.map((value, key) => {
                    if (value.finish == 1) {
                        slength++;
                    }
                });
                if (slength == length) {
                    //取消全选
                    const sql = 'update todo set finish=0';
                    tx.executeSql(sql, null, (tx, resultSet) => {
                        if (resultSet) {
                            this.getTodoInfo();
                        }
                    }, (tx, error) => {
                        console.log('====================================');
                        console.log('取消全选失败' + error);
                        console.log('====================================');
                    });

                } else {
                    //全选
                    const sql = 'update todo set finish=1';
                    tx.executeSql(sql, null, (tx, resultSet) => {
                        if (resultSet) {
                            this.getTodoInfo();
                        }
                    }, (tx, error) => {
                        console.log('====================================');
                        console.log('全选失败' + error);
                        console.log('====================================');
                    });
                }

            }, (tx, error) => {
                console.log('====================================');
                console.log('全选失败' + error);
                console.log('====================================');
            });
        });
    }

    //单选
    singleSelect(id) {
        //先根据传过来的id查询一下
        this.db.transaction((tx) => {
            const sql = `select * from todo where id=${id}`;
            tx.executeSql(sql, null, (tx, resultSet) => {
                //修改其状态
                const todo = resultSet.rows._array[0];
                const finish = todo.finish ? 0 : 1;//修改
                const sql = `update todo set finish=${finish} where id=${id}`;
                tx.executeSql(sql, null, (tx, resultSet) => {
                    console.log('==============aaaa======================');
                    console.log('aaaa');
                    console.log('====================================');
                    this.getTodoInfo();
                })
            }, (tx, error) => {
                console.log('====================================');
                console.log('单选失败' + error);
                console.log('====================================');
            });
        });

    }

}
export default new TodoManager();