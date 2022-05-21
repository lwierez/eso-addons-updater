import { IAddonsConfig } from '../types/types'

const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(createWindow)

ipcMain.on('get-addons-config', (event: any, path: string) => {
  fs.readFile(path, (_error: any, data: string) => {
    event.sender.send('reply-addons-config', JSON.parse(data) as IAddonsConfig)
  })
})
