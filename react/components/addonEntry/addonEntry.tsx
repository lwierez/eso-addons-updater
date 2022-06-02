import './addonEntry.scss'

import React, { useEffect, useState } from 'react'
import { IAddonEntry } from '../../../types/types'
import { addonVersionFromManifest, addonVersionOnline } from '../../utils/regex'

interface IProps {
  addonEntry: IAddonEntry
  directory?: string
}

export default function AddonEntry(props: IProps) {
  const { addonEntry, directory } = props

  const [manifest, setManifest] = useState<string>()
  const [installedVersion, setInstalledVersion] = useState<string>()
  const [onlineVersion, setOnlineVersion] = useState<string>()

  useEffect(() => {
    fetch(addonEntry.url)
      .then((response) => response.text())
      .then((response) => {
        let versionFromOnline = addonVersionOnline.exec(response)
        if (versionFromOnline && versionFromOnline[0])
          setOnlineVersion(versionFromOnline[0])
      })
  }, [addonEntry])

  useEffect(() => {
    if (!directory) return
    window.electron.fileApi
      .getAddonInfos(
        `${directory}${addonEntry.folder}/${addonEntry.folder}.txt`
      )
      .then((data?: string) => {
        setManifest(data)
      })
  }, [addonEntry])

  useEffect(() => {
    if (!manifest) return
    let versionFromManifest = addonVersionFromManifest.exec(manifest)
    if (versionFromManifest && versionFromManifest[0])
      setInstalledVersion(versionFromManifest[0])
  }, [manifest])

  return (
    <div className="entry">
      <div className="entry__name">{addonEntry.name}</div>
      <div className="entry__version">{installedVersion}</div>
      <div className="entry__version">{onlineVersion}</div>
      <button className="entry__button">
        <img className="icon" src="img/arrows-rotate-solid.svg" />
      </button>
      <button
        className={`entry__button ${
          installedVersion == onlineVersion ? 'entry__disabled' : ''
        }`}
      >
        <img className="icon" src="img/download-solid.svg" />
      </button>
    </div>
  )
}
