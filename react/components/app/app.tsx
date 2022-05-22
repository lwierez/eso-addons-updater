import React from 'react'
import './app.scss'
import Menu from '../menu/menu'

export default function App() {
  //<img src="react/../../img/eso.jpg" />

  return (
    <>
      <div className="header">
        <img
          className="Eso-img"
          src="D:\Document\Cours\A4\Eso updater projet\eso-addons-updater\react\img\eso.jpg"
        />
        <h1 className="title">Eso addons updater</h1>
      </div>
      <Menu />
    </>
  )
}
