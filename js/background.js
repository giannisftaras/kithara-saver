chrome.runtime.onInstalled.addListener(function() {
    // Create context menu
    chrome.contextMenus.create ({
        "id": "kithara-saver",
        "title": "Αποθήκευση τραγουδιού",
        "documentUrlPatterns": ["https://kithara.to/stixoi/*"],
        "contexts": ["page"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "kithara-saver") {
        const save = async function save_function(contents) {
            if (contents[0]['result'][0] !== "") {
                // Load extension settings
                chrome.storage.sync.get({
                    kt_save_url: false,
                    kt_save_album: false,
                    kt_save_songwriter: false,
                    kt_title_order: "sno_fs"
                }, function(items) {
                    var pre_content = "";
                    var content = contents[0]['result'][0];
    
                    // Check settings to save in file
                    if (items.kt_save_url) {
                        pre_content += "Σύνδεσμος τραγουδιού: " + contents[0]['result'][1] + "\n";
                    }
                    if (items.kt_save_album) {
                        pre_content += "Έτος άλμπουμ: " + contents[0]['result'][2] + "\n";
                        pre_content += "Όνομα άλμπουμ: " + contents[0]['result'][3] + "\n";
                    }
                    if (items.kt_save_songwriter) {
                        pre_content += contents[0][4] + "\n";
                    }

                    if (items.kt_title_order == "sno_fs") {
                        var file_title = contents[0]['result'][5] + " - " + contents[0]['result'][6] + ".txt";
                    } else {
                        var file_title = contents[0]['result'][6] + " - " + contents[0]['result'][5] + ".txt";
                    }
                    
                    if (pre_content !== "") {
                        content = pre_content + "\n" + content;
                    }

                    // Save the file
                    var url = 'data:text/plain;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(content)));
                    chrome.downloads.download({
                        url: url,
                        filename: file_title
                    });
                });
            }
        }
        // Run the page parser script
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['/js/parser.js']
        }, save);
    }
});