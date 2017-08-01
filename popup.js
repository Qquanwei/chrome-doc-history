function getCurrentTabUrl(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    callback(tabs)
  })
}

// start
function main () {
  getCurrentTabUrl(tabs => {
    console.info(tabs)
  })
}


document.addEventListener('DOMContentLoaded', main)
