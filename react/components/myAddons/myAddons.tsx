import React, { useState } from 'react'
import { IAddonsConfig } from '../../../types/types'
import AddonsList from '../addonsList/addonsList'

interface IProps {
  addonsConfig: IAddonsConfig
}

export default function MyAddons(props: IProps) {
  const { addonsConfig } = props

  return (
    <>
      <AddonsList addonsConfig={addonsConfig} />
    </>
  )
}
