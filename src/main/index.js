const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
// ready is a preset string (event) that we know that the app is going to issue
// Note that this just the app not the window.
let mainWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        // I added this object because of nodeIntegration is false by default (true WAS the default)
        // this object for writing nodejs code inside HTML
        // but in best practices try to avoid these because it uses nodejs it self (can access and do anything nodejs can)
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: "./icon.ico",
    });
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/../GUI/index.html`);
});
