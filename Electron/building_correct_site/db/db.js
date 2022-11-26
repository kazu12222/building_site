const db = require("electron-db");
const path = require("path");

// JSON ファイルの保存場所
const location = path.join(
  "/Users/nosewataruwa/Documents/Electron/building_correct_site",
  ""
);
if (db.valid("mydb", location)) {
  db.insertTableContent("mydb", location, "a", (succ, msg) => {
    console.log("Success: ", succ);
    console.log("Message: ", msg);
  });
}
db.createTable("mydb", location, (succ, msg) => {
  if (succ) {
    console.log(msg);
  } else {
    console.log("An error has occured. " + msg);
  }
});
