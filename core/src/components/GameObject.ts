import { gameObjects } from "../values/values"
import { deepCopy, isChildKey } from "../functions/basicFunctions"
import { Sprite } from "./Sprite"
import { Text } from "./Text"
import { Transform } from "./Transform"

export class GameObject {
  toUpdate: Void[] = []
  toRender: Void[] = []

  parent?: any
  start?: Void
  update?: Void
  transform
  position: any
  rotation: any
  scale: any

  text
  sprite

  constructor({ parent, transform, rect, text, sprite, start, update, render, ...rest }: Obj<any>) {
    if (parent) this.parent = parent

    this.transform = new Transform(transform, this)
    if (text) this.text = new Text(text.value, this, rect)
    if (sprite) this.sprite = new Sprite(sprite, this)

    for (const key in rest) {
      if (isChildKey(key)) {
        ;(this as any)[key] = new GameObject({ ...rest[key], parent: this })
      } else {
        ;(this as any)[key] = typeof rest[key] === `function` ? rest[key].bind(this) : rest[key]
      }
    }

    if (update) this.toUpdate.push(update.bind(this))
    if (render) this.toRender.push(render.bind(this))

    if (start) {
      this.start = start.bind(this)
      this.start!()
    }

    gameObjects.push(this)
  }

  get childs(): GameObject[] {
    const childs: GameObject[] = []
    for (const key in this) {
      if (isChildKey(key)) childs.push((this as any)[key])
    }
    return childs
  }

  get name() {
    for (const key in this.parent) {
      if (this === this.parent[key]) return key
    }
  }

  get props() {
    const newObj = {
      start: this?.start,
      update: this?.update,
      transform: {
        position: this.position,
        rotation: this.rotation,
        scale: this.scale,
      },
    }

    // for (const key in this) {
    //   if (![`toUpdate`, `toRender`, `parent`].includes(key))
    //     newObj[key] = this[key]
    // }

    return deepCopy(newObj)
  }

  static destroy(obj: GameObject) {
    // TO DO complite delete, do not delete objects and arrays, !!! DO NOT DELETE functions !!!
    for (const child of obj.childs) GameObject.destroy(child)

    const { parent } = obj
    let parentKey = ``
    for (const key in obj.parent) {
      if (obj.parent[key] === obj) {
        parentKey = key
        break
      }
    }

    for (const key in obj) delete (obj as any)[key]
    gameObjects.splice(gameObjects.indexOf(obj))
    delete parent[parentKey]
  }
}
