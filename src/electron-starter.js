const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const connectDB = require('./db/connect')
const dotenv = require('dotenv')
dotenv.config();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const User = require('./model/user')
let mainWindow;


const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
  }
  catch(error){
    console.log(`Something went wrong! ${error}`);
  }
}

start()



function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "login.js"),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000/login");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}


// LOGIN 
const { ipcMain } = require("electron");

// listen event login get data from channel user:login
ipcMain.on("user:login", async(event, data) => {
  console.log(data)
  const checkUser = await User.findOne({username: data.username})
  if(checkUser == null || checkUser == undefined) {
    return console.log("Not exists")
  }
  console.log(checkUser)
  const isMatch = await checkUser.comparePassword(data.password)
  if(!isMatch)
    return console.log("Password is not correct")
  console.log("Login success")
  mainWindow.loadURL("http://localhost:3000/") // after login success redirect to homepage
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

