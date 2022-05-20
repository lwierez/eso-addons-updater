import React from 'react'
import './menu.scss'

interface IProps {}

export default class Menu extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return <div className="menu">Menu</div>
  }
}
