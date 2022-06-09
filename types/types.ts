export interface IAddonEntry {
    name: string,
    folder: string,
    url: string,
    archive?: ArrayBuffer
}

export interface IAddonsConfig {
    mods: Array<IAddonEntry>
}

export interface ISettings {
    config_path: string,
    addons_folder_path: string
}