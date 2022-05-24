import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState('Settings')
  const [addonsConfig, setAddonsConfig] = useState({
    mods: Array<IAddonEntry>(),
  })

  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My Addons"
          selected={openedPage == 'My Addons'}
          setSelectedButton={setOpenedPage}
        />
        <Button
          text="Manage Addons"
          selected={openedPage == 'Manage Addons'}
          setSelectedButton={setOpenedPage}
        />

        <Button
          text="Settings"
          selected={openedPage == 'Settings'}
          setSelectedButton={(text: string) => {
            setOpenedPage(text)
            window.electron.fileApi
              .getAddonsConfig()
              .then((data: IAddonsConfig) => {
                setAddonsConfig(data)
              })
          }}
        />
      </div>

      <div className="page">
        {openedPage == 'Settings' && <Settings addonsConfig={addonsConfig} />}
        {openedPage == 'My Addons' && <MyAddons text={'My addons'} />}
        {openedPage == 'Manage Addons' && (
          <ManageAddons text={'ManageAddons'} />
        )}
      </div>
    </div>
  )
}
