export const addonVersionFromManifest = new RegExp(
  '(?<=## Version: ).+'
)

export const addonVersionOnline = new RegExp(
  '(?<=<div id="version">Version: ).+(?=</div>)'
)