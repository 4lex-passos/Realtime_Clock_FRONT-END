const {
    app,
    globalShortcut,
    ipcMain,
    BrowserWindow,
    nativeImage,
    Menu,
} = require("electron");

const Store = require("electron-store");

const { shell } = require("electron");

const path = require("path");

let win;

const store = new Store({
    configName: "USER_INFO",
    defaults: {
        windowBounds: { width: 800, height: 600 },
        userInfo: {},
        token: false,
    },
});

function createWindow() {
    const icon = nativeImage.createFromPath(
        `${app.getAppPath()}/public/icon.png`
    );

    if (app.dock) {
        app.dock.setIcon(icon);
    }
    let { width, height } = store.get("windowBounds");

    win = new BrowserWindow({
        icon,
        width,
        height,
        backgroundColor: "white",
        //titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            frame: false,
            transparent: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    //SET MENUBAR ============================================//
    const menu = Menu.buildFromTemplate([
        {
            label: "Exit",
            click() {
                app.quit();
            },
            accelerator: "CmdOrCtrl+E",
        },
    ]);
    Menu.setApplicationMenu(menu);

    win.on("resize", () => {
        let { width, height } = win.getBounds();

        store.set("windowBounds", { width, height });
    });

    win.loadFile("index.html");
}

function toggleDevTools() {
    win.webContents.toggleDevTools();
}

function createShortcuts() {
    globalShortcut.register("CommandOrControl+D", toggleDevTools);
}

//COMUNICATION BETWEEN ELECTRO AND REACT ===============//
ipcMain.on("authentication", (event, apiUserInfo) => {
    store.set("userInfo", apiUserInfo);

    win.webContents.send("getUserInfo", store.get("userInfo"));
});

ipcMain.on("updateUserInfo", (event, data) => {
    win.webContents.send("getUserInfo", store.get("userInfo"));
});

ipcMain.on("setToken", (event, newToken) => {
    store.set("token", newToken);

    win.webContents.send("getToken", store.get("token"));
});

ipcMain.on("updateToken", (event, newToken) => {
    win.webContents.send("getToken", store.get("token"));
});

ipcMain.on("resetToken", (event, data) => {
    store.reset("token");
    store.reset("isConnected");
});

ipcMain.on("reload", (event, data) => {
    win.reload();
});

//START APP ============================================//
app.whenReady().then(() => {
    createWindow(), createShortcuts();
});
