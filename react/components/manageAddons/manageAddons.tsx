import React from 'react'

interface IProps {
  text: string
}

export default function ManageAddons(props: IProps) {
  const { text } = props

  return <p>{text}</p>
}
