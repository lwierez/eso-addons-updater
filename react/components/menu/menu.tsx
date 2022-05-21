import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'
import MyAddons from '../myAddons/myAddons'
import Update from '../Update/update'
import MyDirectory from '../myDirectory/myDirectory'

interface IProps {}

export default function Menu(_props: IProps) {
  const [openedPage, setOpenedPage] = useState('My directory')
  return (
    <div className="content">
      <div className="menu">
        <Button
          text="My directory"
          selected={openedPage == 'My directory'}
          setSelectedButton={setOpenedPage}
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
        {openedPage == 'My directory' && <MyDirectory text={'my directory'} />}
        {openedPage == 'My addons' && <MyAddons text={'my addons'} />}
        {openedPage == 'Update' && <Update text={'Update'} />}
      </div>
    </div>
  )
}
