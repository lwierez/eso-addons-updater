import React from 'react'
import './button.scss'

interface IProps {
  text: string
  selected: boolean
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
        {this.props.text}
      </button>
    )
  }
}
