const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    authApi: {
        // USER INFO ========================================//
        sendUserInfo: (apiUserInfo) => {
            ipcRenderer.send("authentication", apiUserInfo);
        },

        updateUserInfo: (data) => {
            ipcRenderer.send("updateUserInfo", data);
        },

        receiveUserInfo: (func) => {
            ipcRenderer.on("getUserInfo", (event, ...storeUserInfo) =>
                func(...storeUserInfo)
            );
        },

        // TOKEN ===========================================//

        sendToken: (setToken) => {
            ipcRenderer.send("setToken", setToken);
        },

        receiveToken: (func) => {
            ipcRenderer.on("getToken", (event, newToken) => func(newToken));
        },

        updateToken: (newToken) => {
            ipcRenderer.send("updateToken", newToken);
        },

        sendResetToken: (data) => {
            ipcRenderer.send("resetToken", data);
        },

        reloadWindow: (data) => {
            ipcRenderer.send("reload", data);
        },
    },
    batteryApi: {},
    filesApi: {},
});
