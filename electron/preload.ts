import { IAddonsConfig } from '../types/types'

const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  fileApi: {
    getAddonsConfig(path: string) {
      ipcRenderer.send('get-addons-config', path)

      return new Promise<IAddonsConfig>((resolve) => {
        ipcRenderer.once(
          'reply-addons-config',
          (_event: any, arg: IAddonsConfig) => {
            resolve(arg)
          }
        )
      })
    },
  },
})
