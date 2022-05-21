import React from 'react'
import './menu.scss'

interface IProps {}

export default class Menu extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <div className="menu">
        <input
          type="file"
          onChange={(event) => {
            console.log(event.target.files)
            if (event.target.files)
              window.electron.fileApi
                .getAddonsConfig(event.target.files[0].path)
                .then((data) => {
                  console.log(data)
                })
          }}
        />
      </div>
    )
  }
}
