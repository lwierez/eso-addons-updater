import React from 'react'

interface IProps {
  text: string
}

export default function Settings(props: IProps) {
  const { text } = props

  return <p>{text}</p>
}
