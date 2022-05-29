import React from 'react'
import './app.scss'
import Menu from '../menu/menu'

export default function App() {
  return (
    <>
      <div className="header">
        <div className="top-bar">
          <img className="eso-img" src="img/eso.jpg" />
          <h1 className="title">ESO Addons Updater</h1>
        </div>
      </div>
      <Menu />
    </>
  )
}
