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
      {(addonsConfig.mods.length > 0 && (
        <AddonsList addonsConfig={addonsConfig} />
      )) || <div>No addon found (please insert funny image)! Is ESO Addons Updater configured?</div>}
    </>
  )
}
