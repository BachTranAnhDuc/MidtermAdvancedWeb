const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
        login: (data) => ipcRenderer.send("user:login", data),
        logout: () => ipcRenderer.send("user:logout"),
        createStudent: (data) => ipcRenderer.send("student:create", data),
        updateStudent: (data) => ipcRenderer.send("student:update", data),
        loginFail: ()=> ipcRenderer.on("loginFail",(event,message) => {
                // render to front end msg err
                document.getElementById("login__form--alert-container").innerHTML = message.msg;
        }),
});
