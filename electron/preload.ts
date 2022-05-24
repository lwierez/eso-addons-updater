import { IAddonEntry, IAddonsConfig, ISettings } from '../types/types'

const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  fileApi: {
    getAddonsConfig() {
      ipcRenderer.send('get-settings-entry', 'config_path')

      return new Promise<IAddonsConfig>((resolve) => {
        ipcRenderer.once('reply-settings-entry', (_event: any, path?: string) => {
          if (!path) {
            resolve({"mods": Array<IAddonEntry>()})
            return
          }
          ipcRenderer.send('get-addons-config', path)
          ipcRenderer.once(
            'reply-addons-config',
            (_event: any, arg: IAddonsConfig) => {
              resolve(arg)
            }
          )
        })
      })
    },

    getSettings() {
      ipcRenderer.send('get-settings')

      return new Promise<ISettings | undefined>((resolve) => {
        ipcRenderer.once('reply-settings', (_event: any, settings?: ISettings) => {
          resolve(settings)
        })
      })
    }
  },
})
