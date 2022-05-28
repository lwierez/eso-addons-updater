import React, { useEffect, useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonsConfig, ISettings } from '../../../types/types'
import { addonVersionFromManifest } from '../../utils/regex'

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
    window.electron.fileApi.getSettings()
      .then((newSettings?: ISettings) => {
        setSettings(newSettings)
      })
  }, [openedPage])

  // Effect if settings have been reloaded. Then addons data will be changed
  useEffect(() => {
    if (!settings?.config_path)
      return
    window.electron.fileApi.getAddonsConfig()
      .then((newAddonsConfig: IAddonsConfig) => {
        for (let ii = 0; ii < newAddonsConfig.mods.length; ii++) {
          window.electron.fileApi.getAddonInfos(`${settings.addons_folder_path}${newAddonsConfig.mods[ii].folder}/${newAddonsConfig.mods[ii].folder}.txt`)
            .then((data?: string) => {
              if (!data)
                return
              newAddonsConfig.mods[ii].manifest_data = data
              let versionFromManifest = addonVersionFromManifest.exec(data)
              if (versionFromManifest && versionFromManifest[0])
                newAddonsConfig.mods[ii].installed_version = versionFromManifest[0]
              if (ii == newAddonsConfig.mods.length-1)
                setAddonsConfig(newAddonsConfig)
            })
        }
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
        {openedPage == 'My Addons' && addonsConfig && <MyAddons addonsConfig={addonsConfig} />}
        {openedPage == 'Manage Addons' && <ManageAddons text={'Manage Addons'} />}
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
