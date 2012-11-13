# Remote Preview

### [Remote Preview](http://viljamis.com/blog/2012/remote-preview/) allows you to preview any URL on large number of mobile devices simultaneously. Just enter a URL, hit Cmd+S, and new URL gets automatically loaded on each device. Works on platforms like Android, Blackberry, iOS, Maemo, Meego, Symbian, Windows Phone and WebOS. Built by [@viljamis](http://twitter.com/viljamis) for the [Helsinki Device Lab](http://devicelab.fi) for fast site previewing. [Watch a video on Youtube](http://www.youtube.com/watch?v=-n64Cswel6o) to see the tool in action.

Remote Preview works by making an ajax call every 1100ms to check if the url in the 'url' file is changed. If it is, the script will then change the src attribute of the iframe and load a new page into it. If there's no changes, the script will just keep polling the url file until something changes. Remote Preview allows very fast previewing of different URL's to check for possible layout problems, which can then be debugged using various other tools depending on the platform where they occur.

## Basic usage

1. Switch on OS X's WebSharing and put these files (index.html, jquery.js and url) in 'Sites' folder under your home directory. [Here's](http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion) a good tutorial on how to config Apache on OS X 10.8 and [here's](http://clickontyler.com/blog/2012/02/web-sharing-mountain-lion/) even easier way to do it straight from the System Preferences.
2. After you have the server running, you can open Remote Preview from any device which is using the same wireless network. You can find your local IP address under System Preferences/Network. The URL where you have to connect, is something like http://192.168.1.5/~username/. You might also want to bookmark Remote Preview to your device's home screen for fast & easy application like access.
3. Once you have Remote Preview open on all your devices, open the file called `url` on the server, enter a new URL, and Hit Cmd+S.
4. That's it. Repeat step 3 to refresh all connected devices. It'll even update all your desktop browsers which are viewing the page.
5.  Alternatively you can just copy these files to a public Dropbox folder, edit 'url' file locally and wait for devices to refresh.

## Browser support

Current alpha version is tested to be working on at least following platforms:

* Android OS 2.1 - 4.1.2 (Default browser + Chrome)
* Blackberry OS 7.0 (Default browser)
* iOS 4.2.1 - 6 (Default browser)
* Mac OS X (Safari, Chrome, Firefox, Opera)
* Maemo 5.0 (Default browser)
* Meego 1.2 (Default browser)
* Symbian 3 (Default browser)
* Symbian Belle (Default browser)
* WebOS 3.0.5 (Default browser)
* Windows Phone 7.5 (Default browser)
* Windows 7 (IE9)

## Known issues

* Pages open inside iframe
* You have to write the url with `http://` prefix
* On Windows Phone 7.5 the iframe's src attribute can't be empty
* On Android 4.0.4, when using Chrome browser, a fixed positioned element inside iframe seems to prevent the whole page's scrolling
* On Android 2.1, when using default browser, the page stops auto updating after user scrolls down

## TODO

* Add a simple "remote" page for easier syncing and browsing
* Make a browser extension for easier usage
* Fix some issues

## License

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Changelog

`v0.21` (2012-11-13) - Adds icon for touch devices.

`v0.2` (2012-11-12) - Fixes some issues which where present in the initial release and makes Remote Preview a tad faster.

`v0.1` (2012-11-8) - Release


## Want to do a pull request?

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](https://github.com/viljamis/Remote-Preview/wiki/Pull-Request-Guidelines) first before doing so.
