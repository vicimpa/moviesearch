import React, { Component } from "react";

import "./Fade.sass";

const animations = {
  ShowTop: 'bottom',
  ShowLeft: 'right',
  ShowRight: 'left',
  ShowBottom: 'top'
}

interface IAnimationProps {
  className?: string
  time?: number
}

interface IAnimationState {
  classNames: string[]
  animation: string
  realShow: boolean
}

interface IAnimateOptions {
  c: Animation,
  key: string,
  name: string
}

async function setState(c: Animation, state: Partial<IAnimationState>) {
  return new Promise<void>((resolve) => {
    let newState: any = state
    c.setState(newState, resolve)
  })
}

async function addClass(c: Animation, className: string) {
  let { classNames } = c.state
  let checkNames = className.trim()
    .split(/\s+/)

  classNames = [...classNames, ...checkNames]
    .filter((e, i, d) =>
      i === d.indexOf(e))

  return await setState(c, { classNames })
}

async function clearClass(c: Animation) {
  return await setState(c, { classNames: [] })
}

async function removeClass(c: Animation, className: string) {
  let { classNames } = c.state
  let checkNames = className.trim()
    .split(/\s+/)

  classNames = [...classNames]
    .filter((e, i, d) =>
      checkNames.indexOf(e) === -1)

  return await setState(c, { classNames })
}

async function setAnimation(c: Animation, animation: string, time: number) {
  await setState(c, { animation: `${animation} ${time/1000}s both` })
  await delay(time)
}

async function delay(n = 0) {
  return new Promise<void>(r => setTimeout(r, n))
}

async function animate({ c, ...options }: IAnimateOptions) {
  let { key } = options
  let { show, time } = c

  key = key.substr(4).toLowerCase()

  let animation: Array<() => Promise<void>> = []

  if(show) {
    animation.push(() => clearClass(c))
    animation.push(() => setState(c, {animation: 'none'}))
    animation.push(() => setState(c, {realShow: show}))
    animation.push(() => addClass(c, `show-${key}`))
    animation.push(() => setAnimation(c, `to_${key}`, time))
    animation.push(() => clearClass(c))
  }else {
    animation.push(() => clearClass(c))
    animation.push(() => setState(c, {animation: 'none'}))
    animation.push(() => addClass(c, `show-${key}-exit`))
    animation.push(() => setAnimation(c, `done_${key}`, time))
    animation.push(() => clearClass(c))
    animation.push(() => setState(c, {realShow: show}))
  }

  c.animation = animation
}

abstract class Animation extends Component<IAnimationProps, IAnimationState> {
  readonly className: string
  readonly time: number
  readonly show: boolean
  animation: Array<() => Promise<void>>
}

const Anim = (key: string, name: string) => {
  return class Animation extends Component<IAnimationProps, IAnimationState> {
    state: Readonly<IAnimationState> = {
      classNames: [],
      animation: 'none',
      realShow: this.show
    }
    change = false
    preview = !this.show

    private _animation: Array<() => Promise<void>> = []

    get animation() {
      let {_animation: a} = this
      return a || null
    }

    set animation(v) {
      let {animation} = this

      if(animation && animation.length)
        animation.splice(0, animation.length)

      !(async () => {
        while(v.length)
          await v.shift()()
      })()

      this._animation = v
    }

    get className() {
      let { className = '' } = this.props
      let { classNames } = this.state
      let names = className.trim()
        .split(/\s+/)

      return [...names, ...classNames].join(' ')
    }

    get time() {
      return this.props.time || 400
    }

    get show() {
      return !!this.props.children
    }

    async componentWillReceiveProps() {
      this.change = false
    }

    componentDidMount() {
      this.startAnimation()
    }
    componentDidUpdate() {
      this.startAnimation()
    }

    async startAnimation() {
      if (this.change)
        return null

      this.change = true

      if (this.preview === this.show)
        return null

      this.preview = this.show

      await animate({ c: this, key, name })
    }

    render() {
      let { className, props, state } = this
      let { realShow, animation } = state
      let { children } = props


      return (
        realShow && 
        (
          <div className={className} style={{ animation }}>
            {children && children}
          </div>
        ) 
      )
    }
  }
}

type TAnimations = typeof animations

const output: any = {}
const Animations: {
  [key in keyof TAnimations]: typeof Animation
} = output

for (let key in animations)
  output[key] = Anim(key, animations[key])

export = Animations