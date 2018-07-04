import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV === "development";
let window: BrowserWindow;

app.on("ready", () => {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    title: "Leeched",
    backgroundColor: "#ffffff",
    webPreferences: {
      webSecurity: false,
    },
  });

  window.setFullScreen(false);
  window.setMenu(null);
  const url = isDev
    ? "http://localhost:8080"
    : `file://${__dirname}/index.html`;
  window.loadURL(url);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
