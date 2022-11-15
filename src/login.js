const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
        login: (data) => ipcRenderer.send("user:login", data),
        getUser: async () => {
                const user = await ipcRenderer.invoke("user:get");
                return user;
        },
        logout: () => ipcRenderer.send("user:logout"),
        createStudent: (data) => ipcRenderer.send("student:create", data),
        updateStudent: (data) => ipcRenderer.send("student:update", data)
});