import React, { useEffect, useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import ManageAddons from '../manageAddons/manageAddons'
import Settings from '../settings/settings'
import { IAddonEntry, IAddonsConfig, ISettings } from '../../../types/types'
import { addonVersionFromManifest, addonVersionOnline } from '../../utils/regex'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState<string>()
  const [addonsConfig, setAddonsConfig] = useState<IAddonsConfig>()
  const [settings, setSettings] = useState<ISettings>()

  const getAddonVersionFromManifest = (manifest_data: string) => {
    let versionFromManifest = addonVersionFromManifest.exec(manifest_data)
    if (versionFromManifest && versionFromManifest[0])
      return versionFromManifest[0]
  }

  const getAddonOnlineVersion = (resolve: Function, addonEntry: IAddonEntry) => {
    fetch(addonEntry.url)
      .then(response => response.text())
      .then(response => {
        let versionOnline = addonVersionOnline.exec(response)
        if (versionOnline && versionOnline[0])
          addonEntry.online_version = versionOnline[0]
        resolve()
      })
  }

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
        Promise.all(newAddonsConfig.mods.map((addonEntry: IAddonEntry) => {
          return window.electron.fileApi.getAddonInfos(`${settings.addons_folder_path}${addonEntry.folder}/${addonEntry.folder}.txt`)
            .then((data?: string) => {
              if (!data)
                return
              addonEntry.manifest_data = data
              addonEntry.installed_version = getAddonVersionFromManifest(data)
            })
        }))
          .then(() => {
            Promise.all(newAddonsConfig.mods.map((addonEntry: IAddonEntry) => {
              return new Promise<void>((resolve) => {
                getAddonOnlineVersion(resolve, addonEntry)
              })
            }))
              .then(() => {
                setAddonsConfig(newAddonsConfig)
              })
          })
      })
  }, [settings])

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
          setSelectedButton={setOpenedPage}
        />
      </div>

      <div className="page">
        {openedPage == 'My Addons' && addonsConfig && <MyAddons addonsConfig={addonsConfig} />}
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
