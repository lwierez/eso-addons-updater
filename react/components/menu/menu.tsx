import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState('My Addons')
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
          linkImg="img/download-solid.svg"
        />
        <Button
          text="Manage Addons"
          selected={openedPage == 'Manage Addons'}
          setSelectedButton={setOpenedPage}
          linkImg="img/arrows-rotate-solid.svg"
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
          linkImg="img/gear-solid.svg"
        />
      </div>

      <div className="page">
        {openedPage == 'My Addons' && <MyAddons addonsConfig={addonsConfig} />}
        {openedPage == 'Manage Addons' && (
          <ManageAddons text={'Manage Addons'} />
        )}
        {openedPage == 'Settings' && <Settings text={'Settings'} />}
      </div>
    </div>
  )
}
