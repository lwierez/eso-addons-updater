import React, { useState } from 'react'
import { IAddonsConfig } from '../../../types/types'
import AddonsList from '../addonsList/addonsList'

interface IProps {
  text: string
}

export default function MyAddons(props: IProps) {
  const { text } = props

  return <p>{text}</p>
}
