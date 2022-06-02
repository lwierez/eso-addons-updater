import React from 'react'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'
import AddonEntry from '../addonEntry/addonEntry'

interface IProps {
  addonsConfig: IAddonsConfig
  directory?: string
}

export default function AddonsList(props: IProps) {
  const { addonsConfig, directory } = props

  return (
    <div>
      {addonsConfig.mods.map((addonEntry: IAddonEntry) => {
        return (
          <AddonEntry
            key={addonEntry.name}
            addonEntry={addonEntry}
            directory={directory}
          />
        )
      })}
    </div>
  )
}
