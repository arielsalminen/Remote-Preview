# RemoteLoader

### RemoteLoader allows you to see any URL on all mobile test devices/browsers simultaneously. Just enter the URL into the file called 'url' and hit Cmd+S. New URL is then automatically loaded inside iFrame on each device. Built by [Viljami Salminen](http://twitter.com/viljamis) for the [Helsinki Device Lab](http://devicelab.fi).

## Basic usage

1. Run on your localhost + Make sure all test devices are using the same wireless network (alternatively you can run this on any server, when it won't matter which network your devices are using).
2. Open remoteLoader from any browser/test device. You might want to bookmark this to your device's home screen for fast & easy access in the future.
3. Next, open the file called `url` from the server which is running RemoteLoader, enter new URL, and Hit Cmd+S.
4. All test devices should now start automatically loading the new URL.
5. Repeat step 3 to load new url.

## Browser support

Current alpha version is tested to be working on at least following platforms:

* Android OS 2.1 - 4.1.2 (Default browser + Chrome)
* Blackberry OS 7.0 (Default browser)
* iOS 4.2.1 - 6 (Default browser)
* Mac OS X (Safari, Chrome, Firefox, Opera)
* Meego 1.2 (Default browser)
* Symbian 3 (Default browser)
* WebOS 3.0.5 (Default browser)
* Windows Phone 7.5 (Default browser)
* Windows 7 (IE9)

## Known bugs

* On Windows Phone 7.5 the iFrame's src attribute can't be empty. Otherwise the script doesn't load anything
* If window.resize event is used on the page which gets loaded, RemoteLoader might make it trigger endlessly
* On some platforms empty space is being added below the iFrame

## TODO

* Add a video demonstrating how the tool can be used
* Get rid of most of the known bugs

## License

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Changelog

`v0.1` (2012-11-8) - Release