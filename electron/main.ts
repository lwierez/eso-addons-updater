const { BrowserWindow, app } = require('electron')
const path = require('path')


function createWindow() {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}


app.whenReady().then(createWindow)