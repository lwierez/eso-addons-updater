import React, { useState } from 'react'
import './menu.scss'

import Button from '../button/button'

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
      <div className="page"></div>
    </div>
  )
}
