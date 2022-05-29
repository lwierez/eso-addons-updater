import React from 'react'
import { ISettings } from '../../../types/types'
import './settings.scss'

interface IProps {
  signalSettingsChange: () => void
  settings?: ISettings
}

interface IState {}

export default class Settings extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  saveSettings(newSettings: ISettings) {
    window.electron.fileApi.saveSettings(newSettings)
  }

  render() {
    return (
      <>
        {(this.props.settings && (
          <div>
            <p className="input-name">Addons configuration files:</p>
            <p className="file-name">{this.props.settings.config_path}</p>
            <p className="input-name">
              Change or add configuration file directory:
            </p>
            <input
              type="file"
              onChange={(event) => {
                if (!this.props.settings) return
                if (!event.target.files) return
                let newSettings = this.props.settings
                newSettings.config_path = event.target.files[0].path
                this.saveSettings(newSettings)
                this.props.signalSettingsChange()
              }}
            />
          </div>
        )) || <div>No settings</div>}
      </>
    )
  }
}
