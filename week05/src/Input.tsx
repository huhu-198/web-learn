import React from "react"

export default function Input(props: { addToDoList: Function }) {
  // 绑定输入框的输入 value
  const [value, setValue] = React.useState("")

  //输入框输入回车事件判断：内容不为空时增加 ToDoList
  const onKeyUpEnter = (e: { key: string }) => {
    let inputValue = value.trim()
    if (inputValue !== "" && e.key === "Enter") {
      // 调用父组件的 addToDoList，传递输入的值
      props.addToDoList(inputValue)
      setValue("")
    }
  }
  return (
    <input
      type="text"
      className="input"
      placeholder="What needs to be done?"
      autoComplete="off"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onKeyUp={onKeyUpEnter}
    />
  )
}
