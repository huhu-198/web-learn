import React, { useEffect, useMemo } from "react"
import dayjs from "dayjs"
import nanoid from "uuidjs"

import Input from "./Input"
import TodoItem from "./TodoItem"
import { ITodo } from "./types"

export default function List() {
  // toDoList 的数据绑定
  const [toDoList, setToDoList] = React.useState([])

  //第一次加载时，读取 localStorage 中的 todos
  useEffect(() => {
    const _toDoList: ITodo[] = JSON.parse(localStorage.getItem("_todos"))
    setOrderToDoList(_toDoList)
  }, [])

  // 修改 toDoList 前先排序，并限制接口
  const setOrderToDoList = (_toDoList: ITodo[]) => {
    // 通过 sort 函数排序
    _toDoList.sort((_a, _b) => {
      // 比较事件的完成情况和创建时间
      if (_a.finished !== _b.finished) {
        if (_a.finished) return 1
        return -1
      }
      return _b.ctime - _a.ctime
    })
    //每次在修改 toDoList 前，先保存到 LocalStorageData，防止先重新渲染而无法执行
    saveLocalStorageData(_toDoList)
    setToDoList(_toDoList)
  }

  // 增加事件
  const addToDoList = (inputValue: string) => {
    // 通过解构语法添加一项新的事件
    setOrderToDoList([
      ...toDoList,
      {
        id: nanoid.generate(),
        content: inputValue,
        finished: false,
        ctime: dayjs().unix(),
        mtime: null,
      },
    ])
  }

  // 完成按钮点击事件 接收事件的 id
  const btnFinish = (_id: { _id: string }) => {
    // map 遍历找到 id 对应的事件，修改 state 的 finished
    const newToDoList = toDoList.map((item) => {
      if (item.id === _id) {
        item.finished = !item.finished
        item.mtime = dayjs().unix()
      }
      return item
    })
    setOrderToDoList(newToDoList)
  }

  // 删除按钮事件
  const btnDelete = (_id: { _id: string }) => {
    // filter 根据 id 找到对应的事件，删除事件
    const newToDoList = toDoList.filter((item) => item.id !== _id)
    setOrderToDoList(newToDoList)
  }

  // 更新数据保存到 localStorage
  function saveLocalStorageData(_toDoList: ITodo[]) {
    localStorage.setItem("_todos", JSON.stringify(_toDoList))
  }

  // 输入框渲染
  const InputMemo = useMemo(() => {
    return <Input addToDoList={addToDoList} />
  }, [toDoList])

  // 列表渲染
  const toDoListMemo = useMemo(() => {
    return (
      <section>
        {toDoList.map((item) => (
          // 在外层套 key 值,通过 id 定位要修改的 state 数据
          <React.Fragment key={item.id}>
            <TodoItem item={item} btnFinish={btnFinish} btnDelete={btnDelete} />
          </React.Fragment>
        ))}
      </section>
    )
  }, [toDoList])

  return (
    <>
      <header>
        <div className="title">Todo List</div>
        {InputMemo}
      </header>
      {toDoListMemo}
    </>
  )
}
