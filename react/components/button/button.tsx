import React from 'react'
import './button.scss'

interface IProps {
  text: string
  selected: boolean
  linkImg: string
  setSelectedButton: (page: string) => void
}

interface IState {
  isClicked: boolean
}

export default class Button extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isClicked: false,
    }
  }

  render() {
    return (
      <button
        className={this.props.selected ? 'button clicked' : 'button'}
        onClick={() => {
          this.props.setSelectedButton(this.props.text)
        }}
      >
        <div>
          <img src={this.props.linkImg}></img>
          <p> {this.props.text}</p>
        </div>
      </button>
    )
  }
}
