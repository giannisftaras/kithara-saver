document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        if (tab[0].url.includes("https://kithara.to/stixoi/")) {
            document.getElementById("saveSong").disabled = false;
        } else {
            document.getElementById("saveSong").disabled = true;
        }
    });
    
    document.getElementById("saveSong").addEventListener("click", function(){
        saveStixous();
    });

    document.getElementById("settings-btn").addEventListener("click", function(){
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

}, false);

function saveStixous() {

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
            document.getElementById("err-message").innerHTML = "Η σελίδα που προσπαθείτε να αποθηκεύσετε δεν είναι σωστή.";
            document.getElementById("err-message").style.display = "block";
            setTimeout(function() {
                document.getElementById("err-message").innerHTML = "";
                document.getElementById("err-message").style.display = "none";
            }, 2500);
        }
    }

    chrome.tabs.executeScript({  
        file: '/js/parser.js'
    }, save);

}