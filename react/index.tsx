import React from 'react'
import { createRoot } from 'react-dom/client'
import { IAddonEntry, IAddonsConfig, ISettings } from '../types/types'

import App from './components/app/app'
import './index.scss'

// Defining the contextBridge structure
declare global {
  interface Window {
    electron: {
      fileApi: {
        getAddonsConfig(): Promise<IAddonsConfig>,
        getSettings(): Promise<ISettings|undefined>,
        saveSettings(settings: ISettings): void,
        getAddonInfos(path: string): Promise<string|undefined>,
        installAddon(args: { addon: IAddonEntry; directory: string }): void
      }
    }
  }
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
