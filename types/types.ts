export interface IAddonEntry {
    name: string,
    folder: string,
    url: string,
    manifest_data?: string,
    installed_version?: string,
    online_version?: string
}

export interface IAddonsConfig {
    mods: Array<IAddonEntry>
}

export interface ISettings {
    config_path: string,
    addons_folder_path: string
}