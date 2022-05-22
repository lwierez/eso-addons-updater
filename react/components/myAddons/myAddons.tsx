import React from 'react'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'
import AddonsList from '../addonsList/addonsList'

interface IProps {
  text: string
}

interface IState {
  addonsConfig: IAddonsConfig
}

export default class MyAddons extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      addonsConfig: {
        mods: Array<IAddonEntry>(),
      },
    }
  }

  render() {
    return (
      <>
        <div>
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files)
                window.electron.fileApi
                  .getAddonsConfig(event.target.files[0].path)
                  .then((data: IAddonsConfig) => {
                    this.setState({ addonsConfig: data })
                  })
            }}
          />
        </div>
        <AddonsList addonsConfig={this.state.addonsConfig} />
      </>
    )
  }
}
