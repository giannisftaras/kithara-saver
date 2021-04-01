document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-options').addEventListener('click', save_options);

function save_options() {
    var save_url_chk = document.getElementById("save-url-to-file").checked;
    var save_album_chk = document.getElementById("save-album-to-file").checked;
    var save_songwriter_chk = document.getElementById("save-songwriter-to-file").checked;
    var save_browse_os = document.getElementById("browse-on-save").checked;
    var title_order = document.getElementById("save_name_order").value;
    chrome.storage.sync.set({
        kt_save_url: save_url_chk,
        kt_save_album: save_album_chk,
        kt_save_songwriter: save_songwriter_chk,
        kt_browse_on_save: save_browse_os,
        kt_title_order: title_order
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Οι ρυθμίσεις αποθηκεύτηκαν';
        toastList[0].show();
    });
}

function restore_options() {
    chrome.storage.sync.get({
        kt_save_url: false,
        kt_save_album: false,
        kt_save_songwriter: false,
        kt_browse_on_save: true,
        kt_title_order: "sno_fs"
    }, function(items) {
        document.getElementById('save-url-to-file').checked = items.kt_save_url;
        document.getElementById('save-album-to-file').checked = items.kt_save_album;
        document.getElementById('save-songwriter-to-file').checked = items.kt_save_songwriter;
        document.getElementById("browse-on-save").checked = items.kt_browse_on_save;
        document.getElementById("save_name_order").value = items.kt_title_order;
    });
}

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
});