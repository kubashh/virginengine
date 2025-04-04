import { useEffect, useState } from "react"
import { editor } from "../../lib/consts"

const useDragData = () => {
  const [mouse, setMouse] = useState({})

  const handleMouseMove = ({ clientX, clientY }) =>
    setMouse({ left: clientX + 3, top: clientY + 3 })

  const setDragData = (newData, event) => {
    editor.dragData = event?.button === 0 ? newData : undefined

    handleMouseMove(event || { clientX: 0, clientY: 0 })
  }

  editor.setDragData = setDragData

  useEffect(() => {
    if (!editor.dragData) return

    window.addEventListener(`mousemove`, handleMouseMove)
    window.addEventListener(`mouseup`, setDragData)

    return () => {
      window.removeEventListener(`mousemove`, handleMouseMove)
      window.removeEventListener(`mouseup`, setDragData)
    }
  })

  return { children: editor.dragData?.name, style: mouse }
}

export const DragData = () => {
  const props = useDragData()

  return props.children ? (
    <div className="zAbsolute bgc000_50p" {...props} />
  ) : null
}
