import React from 'react'

interface IProps {
  text: string
}

interface IState {}

export default class ManageAddons extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return <p>{this.props.text}</p>
  }
}
