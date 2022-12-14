const electron = require("electron");
// Module to control application life.
const app = electron.app;
const session = electron.session;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const User = require("./model/user");
let mainWindow;
const student = require("./model/student");
const { dialog } = require("electron");

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

/* const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
  }
  catch(error){
    console.log(`Something went wrong! ${error}`);
  }
}

start() */

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,

      preload: path.join(__dirname, "render.js"),
    },
  });
  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000/login");

  let server = require("./server/server");
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
const {Notification} = require("electron")
const { RocketLaunch } = require("@mui/icons-material");

// listen event login get data from channel user:login
ipcMain.on("user:login", async (event, data) => {
  // console.log(data)
  // const checkLogin = await axios.post("http://localhost:5000/login", {
  //   username: data.username,
  //   password: data.password,
  // });
  // console.log(checkLogin.status)
  // if (checkLogin.status === 200) {
  //   mainWindow.loadURL("http://localhost:3000/"); // after login success redirect to homepage
  // } else {
  //   const msg = checkLogin.data.msg;
  //   console.log("MSG" ,msg);
  // }
  //
  axios
    .post("http://localhost:5000/login", {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      }
      mainWindow.loadURL("http://localhost:3000/");
      return response.data;
    })
    .catch((error) => {
      console.log("Electron catch error here");
      console.log(error.response.data);
      event.reply("loginFail", error.response.data);
      return error.response.data;
    });
  //
  // const checkUser = await User.findOne({username: data.username})
  // if(checkUser == null || checkUser == undefined) {
  //   return console.log("Not exists")
  // }
  // console.log(checkUser)
  // const isMatch = await checkUser.comparePassword(data.password)
  // if(!isMatch)
  //   return console.log("Password is not correct")
  // console.log("Login success")

  // await axios.post("http://localhost:5000/login", {
  //   username: data.username,
  //   password: data.password,
  // });
});

// listen event login get data from channel user:login
// ipcMain.on("user:loggin", async (event, data) => {
//   await axios.post("http://localhost:5000/login", {
//     username: data.username,
//     password: data.password,
//   });
// });

ipcMain.on("user:logginSuccess", () => {
  mainWindow.loadURL("http://localhost:3000/");
});

// STUDENT
//listen event create new student
ipcMain.on("student:create", async (event, data) => {
  axios
    .post("http://localhost:5000/addNewStudent", {
      id: data.id,
      name: data.name,
      major: data.major,
      age: data.age,
      address: data.address,
      phone: data.phone,
      email: data.email,
    })
    .then((response) => {
      if (response.status === 201) {
        const notification= new Notification({title:"Add Student success", body: "Add Student success"})
        notification.show()
        mainWindow.reload();
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      const msg = error.response.data.msg;
      dialog.showErrorBox("ERROR WHEN ADD STUDENT", msg);
    });
  return;
});

//update event update student
ipcMain.on("student:update", async (event, data) => {
  const id = data.id;
  console.log(data);
  console.log(id);
  axios
    .patch(`http://localhost:5000/updateStudent/${id}`, {
      id: data.id,
      name: data.name,
      major: data.major,
      age: data.age,
      address: data.address,
      phone: data.phone,
      email: data.email,
    })
    .then((response) => {
      if (response.status === 201) {
        const notification= new Notification({title:"Update Student success", body: `Update student id ${data.id} success`})
        notification.show()
        mainWindow.reload();
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      const msg = error.response.data.msg;
      dialog.showErrorBox("ERROR WHEN UPDATE STUDENT", msg);
    });
  return;
});

ipcMain.on("student:delete", async (event, data) => {
  const id = data.id;
  axios
    .delete(`http://localhost:5000/deleteStudent/${id}`)
    .then((response) => {
      if (response.status === 202){
        const notification= new Notification({title:"Delete Student success", body: `Delete student id ${data.id} success`})
        notification.show()        
      }
      mainWindow.reload();
      return;
    })
    .catch((err) => {
      const msg = err.response.data.msg;
      dialog.showErrorBox("ERROR WHEN DELETE STUDENT", msg);
    });
});
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

// const reactDevToolsPath = path.join(
//   os.homedir(),
//   "C:Users/btanh/AppData/Local/Google/Chrome/User Data/Default/Extensions/nmmhkkegccagdldgiimedpiccmgmieda"
// );

// app.whenReady().then(async () => {
//   await session.defaultSession.loadExtension(reactDevToolsPath);
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
