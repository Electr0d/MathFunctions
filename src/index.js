const electron = require('electron');
const { app, BrowserWindow } = electron;
const url = require('url');
const path = require('path');



app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		},
		height: 800,
		width: 1200,
		minHeight: 700,
		minWidth: 1200,
		title: 'math_functions',
		frame: false
	});
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname + '/mainWindow/mainWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	);
});
