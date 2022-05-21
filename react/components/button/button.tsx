import React from 'react'
import './button.scss'

interface IProps {
  text: string
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
        className={this.state.isClicked ? 'button' : 'button clicked'}
        onClick={() => {
          this.setState((previousState: IState) => {
            return { isClicked: !previousState.isClicked }
          })
        }}
      >
        {this.props.text}
      </button>
    )
  }
}
