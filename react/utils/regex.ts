export const addonVersionFromManifest = new RegExp(
  '(?<=## Version: ).+'
)

export const addonVersionOnline = new RegExp(
  '(?<=<div id="version">Version: ).+(?=</div>)'
)

export const esouiDownloadLink = new RegExp(
  '\/.+(?=">Download<\/a>)'
)

export const esouiManualDownloadLink = new RegExp(
  'https.+(?=">Click here<\/a>)'
)