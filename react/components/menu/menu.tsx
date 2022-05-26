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
    window.electron.fileApi
      .getSettings()
      .then((initialSettings?: ISettings) => {
        setSettings(initialSettings)
        return initialSettings
      })
      .then((initialSettings?: ISettings) => {
        window.electron.fileApi
          .getAddonsConfig()
          .then((initialAddonsConfig: IAddonsConfig) => {
            for (let ii = 0; ii < initialAddonsConfig.mods.length; ii++) {
              window.electron.fileApi
                .getAddonInfos(
                  `${initialSettings?.addons_folder_path}${initialAddonsConfig.mods[ii].folder}/${initialAddonsConfig.mods[ii].folder}.txt`
                )
                .then((data?: string) => {
                  initialAddonsConfig.mods[ii].manifest_data = data
                  setAddonsConfig(initialAddonsConfig)
                })
            }
          })
      })
  }, [])

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
              .then(() => {
                for (let ii = 0; ii < addonsConfig.mods.length; ii++)
                  window.electron.fileApi
                    .getAddonInfos(
                      `${settings?.addons_folder_path}${addonsConfig.mods[ii].folder}/${addonsConfig.mods[ii].folder}.txt`
                    )
                    .then((data?: string) => {
                      addonsConfig.mods[ii].manifest_data = data
                      setAddonsConfig(() => {
                        return addonsConfig
                      })
                    })
              })
          }}
          linkImg="img/download-solid.svg"
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
          setSelectedButton={(text: string) => {
            setOpenedPage(text)
            window.electron.fileApi
              .getSettings()
              .then((settings?: ISettings) => {
                setSettings(settings)
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
