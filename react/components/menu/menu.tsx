import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import Update from '../update/update'
import MyDirectory from '../myDirectory/myDirectory'
import { IAddonEntry, IAddonsConfig } from '../../../types/types'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState('My directory')
  const [addonsConfig, setAddonsConfig] = useState({
    mods: Array<IAddonEntry>(),
  })

  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My directory"
          selected={openedPage == 'My directory'}
          setSelectedButton={(text: string) => {
            setOpenedPage(text)
            window.electron.fileApi
              .getAddonsConfig()
              .then((data: IAddonsConfig) => {
                setAddonsConfig(data)
              })
          }}
        />
        <Button
          text="My addons"
          selected={openedPage == 'My addons'}
          setSelectedButton={setOpenedPage}
        />
        <Button
          text="Update"
          selected={openedPage == 'Update'}
          setSelectedButton={setOpenedPage}
        />
      </div>
      <div className="page">
        {openedPage == 'My directory' && (
          <MyDirectory addonsConfig={addonsConfig} />
        )}
        {openedPage == 'My addons' && <MyAddons text={'my directory'} />}
        {openedPage == 'Update' && <Update text={'Update'} />}
      </div>
    </div>
  )
}
