import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'

interface IProps {}

interface IState {
  OpenedPage: string
}

export default class Menu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      OpenedPage: 'My directory',
    }
  }

  render() {
    return (
      <div className="content">
        <div className="menu">
          <Button text="My directory" />
          <Button text="My addons" />
          <Button text="Update" />
        </div>
        <div className="page"></div>
      </div>
    )
  }
}
