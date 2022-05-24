export interface IAddonEntry {
    name: string,
    folder: string,
    url: string
}

export interface IAddonsConfig {
    mods: Array<IAddonEntry>
}