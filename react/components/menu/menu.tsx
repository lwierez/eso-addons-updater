import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    window.electron.fileApi.getAddonsConfig().then((data: IAddonsConfig) => {
      setAddonsConfig(data)
    })
  })

  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My Addons"
          selected={openedPage == 'My Addons'}
          setSelectedButton={(text: string) => {
            setOpenedPage(text)
            window.electron.fileApi.getAddonsConfig().then((data: IAddonsConfig) => {
              setAddonsConfig(data)
            })
          }}
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
            window.electron.fileApi.getSettings().then((settings?: ISettings) => {
              setSettings(settings)
            })
          }}
          linkImg="img/gear-solid.svg"
        />
      </div>

      <div className="page">
        {openedPage == 'My Addons' && <MyAddons addonsConfig={addonsConfig} />}
        {openedPage == 'Manage Addons' && <ManageAddons text={'Manage Addons'} />}
        {openedPage == 'Settings' && (
          <Settings
            settings={settings}
            signalSettingsChange={() => {
              window.electron.fileApi.getSettings().then((settings?: ISettings) => {
                setSettings(settings)
              })
            }}
          />
        )}
      </div>
    </div>
  )
}
