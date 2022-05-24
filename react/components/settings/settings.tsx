import React from 'react'
import { ISettings } from '../../../types/types'

interface IProps {
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
            <span>
              Addons configuration files: {this.props.settings.config_path}
            </span>
            <input
              type="file"
              onChange={(event) => {
                if (!this.props.settings) return
                if (!event.target.files) return
                let newSettings = this.props.settings
                newSettings.config_path = event.target.files[0].path
                this.saveSettings(newSettings)
              }}
            />
          </div>
        )) || <div>No settings</div>}
      </>
    )
  }
}
