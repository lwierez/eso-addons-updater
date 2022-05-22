import React from 'react'

interface IProps {
  text: string
}

interface IState {}

export default class MyDirectory extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return (
      <>
        <p>{this.props.text}</p>
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
      </>
    )
  }
}
