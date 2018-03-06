//Made for node.js
var sass = require('node-sass');
var fs = require('fs');
const cssFolder = "css";
const sassFolder = "sass";

var fsTimeout = false;

console.log(new Date());

function compile(file) {
    console.log("Compiling" + file);
    sass.render({
        file: sassFolder + "/" + file + ".scss",
        outFile: cssFolder + "/" + file + ".css"
    }, function (err, result) {
        if (err) {
            console.log("error");
            console.log(err);
            return;
        }
        fs.writeFile(cssFolder + "/" + file + ".css", result.css, function (err) {
            if (!err) {
                console.log("No errors");
            } else {
                console.log(err);
            }
        });
    });
}

//TODO: Make a watcher to check for new files and file changes

function fileChanged(eventType, fileName) {
    if (!fsTimeout) {
        if (eventType == "change") {
            if (fileName.substr(fileName.length - 5) == ".scss") {
                if (fileName.substring(0, 1) == "_") {
                    //This is a library file, so we need to compile all files
                    console.log("Compile all files");
                    //Iterate through each file, and compile them
                    fs.readdir("sass/", function (err, items) {

                        for (var i = 0; i < items.length; i++) {
                            let item = items[i].toString();
                            if (fileName.substr(item.length - 5) == ".scss") {
                                //Check to make sure that it's not a library file
                                if (item.substring(0, 1) != "_") {
                                    console.log("Compiling " + item);
                                    compile(item.substring(0, item.length - 5));
                                }
                            }
                        }
                    });
                } else {
                    compile(fileName.substring(0, fileName.length - 5));
                }
            }
        }
        fsTimeout = true;
        setTimeout(function () {
            fsTimeout = false;
        }, 1000);
    }
}


//Watch the directory
fs.watch("sass/", {
    recursive: true,
    encoding: "utf8"
}, fileChanged);
