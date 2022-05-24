import React from 'react'
import { ISettings } from '../../../types/types'

interface IProps {
  settings?: ISettings
}

export default function Settings(props: IProps) {
  const { settings } = props

  return <>
    {settings && <div>Settings</div> || <div>No settings</div>}
  </>
}
