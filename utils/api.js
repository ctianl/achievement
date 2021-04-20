let API_HOST = "http://mango.com/";
let DEBUG = true; //切换数据入口
var Mock = require('../utils/mock.js')
var {
    log
} = console

function ajax(url = '', data = {}, fn, method = "get", header = {}) {
    if (!DEBUG) {
        wx.request({
            url: config.API_HOST + data,
            method: method ? method : 'get',
            data: {},
            header: header ? header : {
                "Content-Type": "application/json"
            },
            success: function (res) {
                fn(res);
            }
        });
    } else {
        // 模拟数据

        //判断哪一个接口

        //登录接口
        if (url == 'test') {
            var res = {
                status: 200,
                data: {
                    msg: 'test'
                }
            }
        } else if (url == 'login') {
            //获取用户的code和username
            var {
                code,
                username,
                avatarUrl
            } = data

            //对code和username进行判断

            //返回数据

            var res = {
                status: 200,
                data: {
                    msg: '登录成功',
                    //默认
                    token: 'n3hr4u3rh7843r74',
                    //返回用户信息
                    userInfo: {
                        userName: username,
                        head_img: avatarUrl
                    }
                }
            }
        } else if (url == 'getList') {
            var todoList = wx.getStorageSync('todoList') ? JSON.parse(wx.getStorageSync('todoList')) : []
            var res = {
                status: 200,
                data: {
                    list: todoList
                }
            }

        } else if (url == 'delMission') {
            //获取一个数组
            var delList = data.delList
            log(delList)
            if (method == 'post') {
                var todoList = JSON.parse(wx.getStorageSync('todoList'))
                todoList = todoList.filter(e => {
                    return !delList.includes(e.id)
                })
                log(todoList)
                wx.setStorageSync('todoList', JSON.stringify(todoList))

                var res = {
                    status: 200,
                    msg: '删除成功'
                }
            }

        } else if (url == 'addMission') {
            var {
                add_name,
                add_count,
                add_type
            } = data
            //使用当前时间作为id
            var newMission = {
                id: String(Date.parse(new Date())),
                name: add_name,
                count: add_count,
                type: add_type
            }
            var todoList = wx.getStorageSync('todoList') ? JSON.parse(wx.getStorageSync('todoList')) : []
            todoList.push(newMission)
            wx.setStorageSync('todoList', JSON.stringify(todoList))

            var res = {
                status: 200,
                msg: '添加成功'
            }
        } else if (url == 'editMission') {
            var {
                edit_id,
                edit_name,
                edit_count,
                edit_type
            } = data
            log(data)
            var todoList = JSON.parse(wx.getStorageSync('todoList'))
            //进行修改 map
            todoList = todoList.map(e => {
                if (e.id == edit_id) {
                    e.name = edit_name
                    e.count = edit_count
                    e.type = edit_type
                }
                return e
            })
            log(todoList)
            wx.setStorageSync('todoList', JSON.stringify(todoList))

            var res = {
                status: 200,
                msg: '修改成功'
            }
        } else if (url == 'finish') {
            var {
                currentId,
                currentName,
                currentCount,
                currentType
            } = data
            log(data)
            //返回积分
            var score = wx.getStorageSync('score') ? Number(wx.getStorageSync('score')) : 0


            //添加积分
            score += Number(currentCount)
            wx.setStorageSync('score', score)

            //同时也要更新完成列表 没有则为空数组
            var finishList = wx.getStorageSync('finishList') ? JSON.parse(wx.getStorageSync('finishList')) : []


            var obj = {
                id: currentId,
                name: currentName,
                count: currentCount,
                type: currentType,
                time: new Date(),
            }
            finishList.push(obj)

            wx.setStorageSync('finishList', JSON.stringify(finishList))

            var res = {
                status: 200,
                msg: `恭喜获得${currentCount}分！`
            }
        } else if (url == 'getScore') {
            //获取分数
            //如果没有 则默认为0
            var score = wx.getStorageSync('score') ? wx.getStorageSync('score') : 0
            var res = {
                status: 200,
                score
            }

        } else if (url == 'getFinishList') {
            var finishList = wx.getStorageSync('finishList') ? JSON.parse(wx.getStorageSync('finishList')) : []

            var res = {
                status: 200,
                list: finishList
            }
        } else if (url == 'delTimeline') {
            var {id,count}=data
            var finishList = wx.getStorageSync('finishList') ? JSON.parse(wx.getStorageSync('finishList')) : []

            //过滤
            finishList=finishList.filter(e=>{
                return e.id!=id
            })

            wx.setStorageSync('finishList', JSON.stringify(finishList))

            //也应该修改score才对
            var score = wx.getStorageSync('score') ? Number(wx.getStorageSync('score'))  : 0
            score-=Number(count)
            wx.setStorageSync('score',score)

            var res={
                status:200,
                msg:'删除成功'
            }
        }

        fn(res);
    }
}
module.exports = {
    ajax: ajax
}