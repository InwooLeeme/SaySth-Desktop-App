const { app, BrowserWindow } = require("electron");

const { spawn } = require('child_process');
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    center : true
  });
  win.loadFile("index.html");
  const pyPath = path.join(__dirname, 'python_scripts', 'test.py');
  const pythonProcess = spawn("python", [pyPath]);
  /* console.log(pyPath);
  console.log(pythonProcess);
  pythonProcess.stdout.on("data", (data) => {
    console.log(`${data}`);
    
  }) */
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
