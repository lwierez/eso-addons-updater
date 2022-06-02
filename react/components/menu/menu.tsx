import React, { useEffect, useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonsConfig, ISettings } from '../../../types/types'
import { isEqual } from 'lodash'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState<string>()
  const [addonsConfig, setAddonsConfig] = useState<IAddonsConfig>()
  const [settings, setSettings] = useState<ISettings>()

  // Effect on first mount of the component, then 'My Addons' is shown by default
  useEffect(() => {
    setOpenedPage('My Addons')
  }, [])

  // Effect if current page is changed. Then settings will be reloaded
  useEffect(() => {
    window.electron.fileApi.getSettings().then((newSettings?: ISettings) => {
      if (isEqual(newSettings, settings)) return
      setSettings(newSettings)
    })
  }, [openedPage])

  // Effect if settings have been reloaded. Then addons data will be changed
  useEffect(() => {
    if (!settings?.config_path) return
    window.electron.fileApi
      .getAddonsConfig()
      .then((newAddonsConfig: IAddonsConfig) => {
        setAddonsConfig(newAddonsConfig)
      })
  }, [settings])

  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My Addons"
          selected={openedPage == 'My Addons'}
          setSelectedButton={setOpenedPage}
          linkImg="img/pencil-solid.svg"
        />
        <Button
          text="Manage Addons"
          selected={openedPage == 'Manage Addons'}
          setSelectedButton={setOpenedPage}
          linkImg="img/pencil-solid.svg"
        />
        <Button
          text="Settings"
          selected={openedPage == 'Settings'}
          setSelectedButton={setOpenedPage}
          linkImg="img/gear-solid.svg"
        />
      </div>

      <div className="page">
        {openedPage == 'My Addons' && addonsConfig && (
          <MyAddons
            addonsConfig={addonsConfig}
            directory={settings?.addons_folder_path}
          />
        )}
        {openedPage == 'Manage Addons' && (
          <ManageAddons text={'Manage Addons'} />
        )}
        {openedPage == 'Settings' && (
          <Settings
            settings={settings}
            signalSettingsChange={() => {
              window.electron.fileApi
                .getSettings()
                .then((settings?: ISettings) => {
                  setSettings(settings)
                })
            }}
          />
        )}
      </div>
    </div>
  )
}
