import React from 'react'
import { createRoot } from 'react-dom/client'
import { IAddonsConfig } from '../types/types'

import App from './components/app/app'
import './index.scss'

// Defining the contextBridge structure
declare global {
  interface Window {
    electron: {
      fileApi: {
        getAddonsConfig(path: string): Promise<IAddonsConfig>
      }
    }
  }
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
