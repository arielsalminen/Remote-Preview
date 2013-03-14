// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var on = true;
var currentUrl ='';

function updateIcon() {
  
  on = (on) ? false : true;
  
  var current = (on) ? 'enabled' : 'disabled';
  
  chrome.browserAction.setIcon({path:"icon-" + current + ".png"});
  
  getActiveTab();
  
}

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status == 'complete'){
    loadURL(tab.url);
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  getActiveTab();
});

function getActiveTab(){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    loadURL(tabs[0].url);
  });
}

function loadURL(url){
  
  var remoteUrl = localStorage["url"];
  
  
  if(url.indexOf('chrome://')==-1 && on && url!=currentUrl){
    
    if (!remoteUrl) {
      alert('The RemotePreview URL has not been set in the options.');
      return false;
    }
    
    if(url.indexOf('google')>=0){
      var addition = (url.indexOf('?')>=0) ? '&embed=true' : '?embed=true';
      url+=addition;
    }
    
    var parameters = 'url=' + url;
    var xhReq = new XMLHttpRequest();
    xhReq.open('POST', remoteUrl, false);
    xhReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhReq.send(parameters);
    
    currentUrl = url;
  }
}
