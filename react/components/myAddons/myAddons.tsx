import React from 'react'
import { IAddonsConfig } from '../../../types/types'
import AddonsList from '../addonsList/addonsList'
import './myAddons.scss'

interface IProps {
  addonsConfig: IAddonsConfig
  directory?: string
}

export default function MyAddons(props: IProps) {
  const { addonsConfig, directory } = props

  return (
    <>
      {(addonsConfig.mods.length > 0 && (
        <div>
          {/* <div className="top-lign">
            <button className="entry__button">
              <img className="icon" src="img/download-solid.svg" />
            </button>
            <button className="entry__button">
              <img className="icon" src="img/arrows-rotate-solid.svg" />
            </button>
          </div> */}
          <AddonsList addonsConfig={addonsConfig} directory={directory} />
        </div>
      )) || (
        <div>No addon found (please insert funny image)! Is ESO Addons Updater configured?</div>
      )}
    </>
  )
}
