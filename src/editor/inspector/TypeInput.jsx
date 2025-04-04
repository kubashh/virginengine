import { useRefresh } from "../../lib/hooks"
import { addSpaceBeforeUpper, getType } from "../../lib/utils"
import { BooleanInput } from "./typeInput/BooleanInput"
import { NumberInput } from "./typeInput/NumberInput"
import { StringInput } from "./typeInput/StringInput"

export const TypeInput = (props) => {
  const refresh = useRefresh()
  props = { ...props, refresh }

  let element
  const type = props.type || getType(props.object[props.access])
  switch (type) {
    case "boolean":
      element = <BooleanInput {...props} />
      break
    case "number":
      element = <NumberInput {...props} />
      break
    case "string":
      element = <StringInput {...props} />
      break
    case "array":
      element = null
      break
    case "object":
      element = null
      break
    case "function":
      element = null
      break
    case `enum`:
      console.log(`ENUM`)
      break
    default:
      console.error(`Type Error!`)
      break
  }

  return (
    <div className="grid gap12 w100p-12 gridTC_auto1fr">
      <div className="flex gap12">
        <h4>{addSpaceBeforeUpper(props.access)}</h4>
        <h4 className="c3">: {type}</h4>
        <h4>=</h4>
      </div>
      {element}
    </div>
  )
}
