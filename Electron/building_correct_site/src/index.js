const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { default: puppeteer } = require("puppeteer");
const athome = require("../js/athome.js");
const hatomark = require("../js/hatomark.js");
const housego = require("../js/housego.js");
const nifty = require("../js/nifty.js");
const aisumu = require("../js/aisumu.js");
if (require("electron-squirrel-startup")) {
  app.quit();
}
function handleSetTitle(event, title) {
  //ipcMainの構造体,title文字列
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}
async function AutomationPuppeteer() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "defaultViewport: null"],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  let property = {
    build_src: "",
    link: "",
    address: "",
    traffic: "",
    price: "",
    land_area: "",
    site: "",
    build_area: "",
    build_date: "",
  };
  let build_array = [];
  let build_src = [];
  let link = [];
  let address = [];
  let traffic = [];
  let price = [];
  let land_area = [];
  let site = [];
  let build_area = [];
  let build_date = [];

  build_array.push(await hatomark.hatomark(page));
  //build_array.push(await athome.athome(page));
  build_array.push(await housego.housego(page));
  build_array.push(await nifty.nifty(page));
  build_array.push(await aisumu.aisumu(page));
  for (i = 0; i < build_array.length; i++) {
    for (j = 0; j < build_array[i].build_src.length; j++) {
      build_src.push(build_array[i].build_src[j]);
      link.push(build_array[i].link[j]);
      address.push(build_array[i].address[j]);
      traffic.push(build_array[i].traffic[j]);
      price.push(build_array[i].price[j]);
      land_area.push(build_array[i].land_area[j]);
      site.push(build_array[i].site[j]);
      build_area.push(build_array[i].build_area[j]);
      build_date.push(build_array[i].build_date[j]);
    }
  }
  property.build_src = build_src;
  property.link = link;
  property.address = address;
  property.traffic = traffic;
  property.price = price;
  property.land_area = land_area;
  property.site = site;
  property.build_area = build_area;
  property.build_date = build_date;
  console.log(property);
  console.log(property.build_src.length);
  browser.close();
  return property;
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), //(実行中のスクリプトパス,レンダリング前にバージョン公開)非同期でスクリプトをロード
    },
  });

  //(preloadのkey"set-title"からtitle文字列取得,handleSetTitleにipcMainEvent構造体とtitleを送る)
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  //mainWindowにindex.html読み込み
  mainWindow.webContents.openDevTools(); //Developerツールを開いてサイトを開く
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong"); //setup送信,preloadのinvoke("ping")
  ipcMain.handle("automation", AutomationPuppeteer);
  createWindow();
  app.on("activate", () => {
    //activateをリッスン(mac用)
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  //全てのウィンドウが閉じられると終了(終了するまでアクティブ)
  if (process.platform !== "darwin") {
    //darwin=macOS
    app.quit();
  }
});
