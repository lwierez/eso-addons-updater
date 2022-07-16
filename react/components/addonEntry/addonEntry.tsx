import './addonEntry.scss'

import React, { useEffect, useState } from 'react'
import { IAddonEntry } from '../../../types/types'
import {
  addonVersionFromManifest,
  addonVersionOnline,
  esouiDownloadLink,
  esouiManualDownloadLink,
} from '../../utils/regex'

interface IProps {
  addonEntry: IAddonEntry
  directory?: string
}

export default function AddonEntry(props: IProps) {
  const { addonEntry, directory } = props

  const [manifest, setManifest] = useState<string>()
  const [addonPageContent, setAddonPageContent] = useState<string>()
  const [installedVersion, setInstalledVersion] = useState<string>()
  const [onlineVersion, setOnlineVersion] = useState<string>()

  const getOnlineVersion = () => {
    fetch(addonEntry.url)
      .then((response) => response.text())
      .then((response) => {
        setAddonPageContent(response)
        let versionFromOnline = addonVersionOnline.exec(response)
        if (versionFromOnline && versionFromOnline[0]) setOnlineVersion(versionFromOnline[0])
      })
  }

  const getInstalledVersion = () => {
    if (!directory) return
    window.electron.fileApi
      .getAddonInfos(`${directory}${addonEntry.folder}/${addonEntry.folder}.txt`)
      .then((data?: string) => {
        setManifest(data)
      })
  }

  useEffect(() => {
    getOnlineVersion()
  }, [addonEntry])

  useEffect(() => {
    getInstalledVersion()
  }, [addonEntry])

  const onClickDownload = () => {
    if (!addonPageContent) return
    let esouiDownloadLinkMatches = esouiDownloadLink.exec(addonPageContent)
    if (esouiDownloadLinkMatches && esouiDownloadLinkMatches[0]) {
      esouiDownloadLinkMatches[0] = esouiDownloadLinkMatches[0].replace(/&amp;/g, '&')
      fetch(`https://www.esoui.com${esouiDownloadLinkMatches[0]}`)
        .then((response) => response.text())
        .then((response) => {
          let esouiManualDownloadLinkMatches = esouiManualDownloadLink.exec(response)
          if (esouiManualDownloadLinkMatches && esouiManualDownloadLinkMatches[0]) {
            fetch(esouiManualDownloadLinkMatches[0])
              .then((response) => response.blob())
              .then((response) => response.arrayBuffer())
              .then((response) => {
                if (!directory) return
                addonEntry.archive = response
                window.electron.fileApi
                  .installAddon({ addon: addonEntry, directory: directory })
                  .then(() => {
                    getInstalledVersion()
                  })
              })
          }
        })
    }
  }

  useEffect(() => {
    if (!manifest) return
    let versionFromManifest = addonVersionFromManifest.exec(manifest)
    if (versionFromManifest && versionFromManifest[0]) setInstalledVersion(versionFromManifest[0])
  }, [manifest])

  return (
    <div className="entry">
      <div className="entry__name">{addonEntry.name}</div>
      <div className="entry__version">{installedVersion}</div>
      <div className="entry__version">{onlineVersion}</div>
      <button
        className="entry__button"
        onClick={() => {
          getInstalledVersion()
          getOnlineVersion()
        }}
      >
        <img className="icon" src="img/arrows-rotate-solid.svg" />
      </button>
      <button
        className={`entry__button ${installedVersion == onlineVersion ? 'entry__disabled' : ''}`}
        onClick={onClickDownload}
      >
        <img className="icon" src="img/download-solid.svg" />
      </button>
    </div>
  )
}
