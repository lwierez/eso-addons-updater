import { IAddonEntry, IAddonsConfig, ISettings } from '../types/types'

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

ipcMain.on('get-settings-entry', (event: any, key: string) => {
  fs.readFile('settings.json', (error: any, data: string) => {
    if (error) {
      event.sender.send('reply-settings-entry', undefined)
      return
    }
    try {
      let config = JSON.parse(data)
      event.sender.send('reply-settings-entry', config[key])
    } catch (error) {
      event.sender.send('reply-settings-entry', undefined)
    }
  })
})

ipcMain.on('get-settings', (event: any) => {
  fs.readFile('settings.json', (error: any, data: string) => {
    if (error) {
      event.sender.send('reply-settings', undefined)
      fs.writeFile('settings.json', JSON.stringify({}), () => {})
      return
    }
    try {
      let settings = JSON.parse(data)
      event.sender.send('reply-settings', settings)
    } catch (error) {
      event.sender.send('reply-settings', undefined)
    }
  })
})

ipcMain.on('save-settings', (_event: any, settings: ISettings) => {
  fs.writeFile('settings.json', JSON.stringify(settings), (error: any) => {
    if (error) return
  })
})

ipcMain.on('get-addon-infos', (event: any, manifest_path: string) => {
  fs.readFile(manifest_path, (error: any, data: string) => {
    if (error) event.sender.send('reply-settings', undefined)
    event.sender.send('reply-addon-infos', data)
  })
})