import './addonEntry.scss'

import React from 'react'
import { IAddonEntry } from '../../../types/types'

interface IProps {
  addonEntry: IAddonEntry
}

export default function AddonEntry(props: IProps) {
  const { addonEntry } = props

  return (
    <div className="entry">
      <div className="entry__name">{addonEntry.name}</div>
      <div className="entry__version">2.1</div>
      <button className="entry__button">
        <img className="icon" src="img/arrows-rotate-solid.svg" />
      </button>
      <button className="entry__button">
        <img className="icon" src="img/download-solid.svg" />
      </button>
    </div>
  )
}
