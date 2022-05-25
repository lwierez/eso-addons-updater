import React from 'react'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'
import AddonEntry from '../addonEntry/addonEntry'

interface IProps {
  addonsConfig: IAddonsConfig
}

export default function AddonsList(props: IProps) {
  const { addonsConfig } = props

  return (
    <div>
      {addonsConfig.mods.map((addonEntry: IAddonEntry) => {
        return <AddonEntry key={addonEntry.name} addonEntry={addonEntry} />
      })}
    </div>
  )
}
