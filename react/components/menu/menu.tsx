import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonEntry, IAddonsConfig, ISettings } from '../../../types/types'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState('My Addons')
  const [addonsConfig, setAddonsConfig] = useState({
    mods: Array<IAddonEntry>(),
  })
  const [settings, setSettings] = useState<ISettings>()

  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My Addons"
          selected={openedPage == 'My Addons'}
          setSelectedButton={(text: string) => {
            setOpenedPage(text)
            window.electron.fileApi
              .getAddonsConfig()
              .then((data: IAddonsConfig) => {
                setAddonsConfig(data)
              })
          }}
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
            window.electron.fileApi.getSettings().then((settings?: ISettings) => {
              setSettings(settings)
            })
          }}
        />
      </div>

      <div className="page">
        {openedPage == 'My Addons' && <MyAddons addonsConfig={addonsConfig} />}
        {openedPage == 'Manage Addons' && (
          <ManageAddons text={'Manage Addons'} />
        )}
        {openedPage == 'Settings' && <Settings settings={settings} />}
      </div>
    </div>
  )
}
