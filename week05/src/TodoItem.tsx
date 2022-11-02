import React from "react"
import dayjs from "dayjs"
import { ITodo } from "./types"

//单个任务事件组件
export default function TodoItem(props: {
  btnFinish: Function
  btnDelete: Function
  item: ITodo
}) {
  //根据 finished 值，确定不同的样式
  const todoItemFinishedClassName = props.item.finished
    ? "todo-item todo-finished"
    : "todo-item"
  return (
    <div className={todoItemFinishedClassName}>
      <i
        className="iconfont icon-checkbox"
        onClick={() => {
          props.btnFinish(props.item.id)
        }}
      ></i>
      <span className="todo-title">{props.item.content}</span>
      <span className="todo-title todo-time">
        {dayjs(props.item.ctime * 1000).format("YYYY年MM月DD日HH:mm:ss")}
      </span>
      <i
        className="iconfont icon-delete"
        onClick={() => {
          props.btnDelete(props.item.id)
        }}
      ></i>
    </div>
  )
}
