const path = require('path')


module.exports = {
    mode: 'development',
    entry: './react/index.tsx',
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [[
							'@babel/preset-env', {
								targets: {
									esmodules: true
								}
							}],
							'@babel/preset-react']
					}
				}
			}
        ]
    },
    resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build', 'js')
    }
}