chrome.contextMenus.create ({
    "title": "Αποθήκευση τραγουδιού",
    "documentUrlPatterns": ["https://kithara.to/stixoi/*"],
    "contexts": ["page"],
    "onclick": saveStixous()
});

function saveStixous() {

    return function(info, tab) {

        const save = async function save_function(contents) {
            if (contents[0][0] !== "") {
                chrome.storage.sync.get({
                    kt_save_url: false,
                    kt_save_album: false,
                    kt_save_songwriter: false,
                    kt_browse_on_save: true,
                    kt_title_order: "sno_fs"
                }, function(items) {
                    var pre_content = "";
                    var content = contents[0][0];
    
                    // Check settings to save in file
                    if (items.kt_save_url) {
                        pre_content += "Σύνδεσμος τραγουδιού: " + contents[0][1] + "\n";
                    }
                    if (items.kt_save_album) {
                        pre_content += "Έτος άλμπουμ: " + contents[0][2] + "\n";
                        pre_content += "Όνομα άλμπουμ: " + contents[0][3] + "\n";
                    }
                    if (items.kt_save_songwriter) {
                        pre_content += contents[0][4] + "\n";
                    }

                    if (items.kt_title_order == "sno_fs") {
                        var file_title = contents[0][5] + " - " + contents[0][6] + ".txt";
                    } else {
                        var file_title = contents[0][6] + " - " + contents[0][5] + ".txt";
                    }
                    
                    if (pre_content !== "") {
                        content = pre_content + "\n" + content;
                    }
                    var blob = new Blob([content], {type: "text/plain"});
                    var url = URL.createObjectURL(blob);
                    chrome.downloads.download({
                        url: url,
                        filename: file_title,
                        saveAs: items.kt_browse_on_save
                    });
                });
            } else {
                alert("Η σελίδα που προσπαθείτε να αποθηκεύσετε δεν είναι σωστή.");
            }
        }
    
        chrome.tabs.executeScript({  
            file: '/js/parser.js'
        }, save);

    }

}