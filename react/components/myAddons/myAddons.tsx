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

    // TODO: do fetching config in parent code, on button click
    window.electron.fileApi.getAddonsConfig().then((data: IAddonsConfig) => {
      this.setState({ addonsConfig: data })
    })
  }

  render() {
    return (
      <>
        <AddonsList addonsConfig={this.state.addonsConfig} />
      </>
    )
  }
}
