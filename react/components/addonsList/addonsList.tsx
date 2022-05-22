import React from 'react'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'

interface IProps {
  addonsConfig: IAddonsConfig
}

export default function AddonsList(props: IProps) {
  const { addonsConfig } = props

  console.log('here')

  return <div>
    {addonsConfig.mods.map((addonEntry: IAddonEntry) => {
      return <div key={addonEntry.name}> {addonEntry.name} </div>
    })}
  </div>
}
