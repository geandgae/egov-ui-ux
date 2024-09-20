const fs = require("fs");
const path = require("path");

const folderPath = "./html"; // 대상폴더
const targetClassName = "accordion"; // 기존클래스
const newClassName = "krds-accordion"; // 변경할클래스

const fileExtensions = [".html"];

function readFilesRecursively(folder) {
  console.log(`Reading folder: ${folder}`);
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    if (files.length === 0) {
      console.log(`No files found in directory: ${folder}`);
    }

    let pendingFiles = files.length;
    if (!pendingFiles) {
      console.log("No files to process.");
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folder, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`Entering directory: ${filePath}`);
          readFilesRecursively(filePath);
        } else if (stats.isFile() && fileExtensions.some((ext) => file.endsWith(ext))) {
          console.log(`Processing file: ${filePath}`);
          processFile(filePath, () => {
            if (!--pendingFiles) {
              console.log("All files processed.");
              console.log("Script finished");
            }
          });
        } else {
          if (!--pendingFiles) {
            console.log("No HTML files to process.");
            console.log("Script finished");
          }
        }
      });
    });
  });
}

function processFile(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // targetClassName 정규 표현식
    const regex = new RegExp(`(?<=\\s|["'=])${targetClassName}(?=\\s|["'/>])`, "g");

    const updatedData = data.replace(regex, newClassName);

    if (updatedData !== data) {
      console.log(`Updating file: ${filePath}`);
      fs.writeFile(filePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log(`File updated: ${filePath}`);
        callback();
      });
    } else {
      console.log(`No changes needed for file: ${filePath}`);
      callback();
    }
  });
}

readFilesRecursively(folderPath);



// node ./test/z-debug/transform-class.js

// (?<![-\w])accordion(?![-\w])