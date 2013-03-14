// Saves options to localStorage.
function save_options() {
  var urlText = document.getElementById("txtUrl");
  var url = urlText.value;
  localStorage["url"] = url;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var url = localStorage["url"];
  if (!url) {
    return;
  }
  var urlText = document.getElementById("txtUrl");
  
  urlText.value = url;
  
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);