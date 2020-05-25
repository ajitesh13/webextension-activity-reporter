# Extension Activity Monitor

## What is the significance of this project ?

Extensions do most of their work invisibly from users and hence Extension activity is a complete mystery for most users, even advanced ones. Providing more transparency could help increase reliability of abuse reporting and accountability for developers, as well as providing an additional useful tool to aid investigating bugs in the Extensions or in the Firefox WebExtensions internals.

The activityLog Extension will help the user to track the activities of the activated Extensions in their browser. For example, the network requests they are making, altered browser settings, the API function calls and events they are executing or listening during the background functioning of Firefox. This will also let the user know which component of an activated Extensions is activated currently and what task it is concerned with.

Unlike the `about:addons` which is the primary way how all Firefox users manage their addons which includes listing, enabling/disabling, setting preferences, etc. This Extension will list out the activities other extensions are doing and will enable a feature for firefox developers, WebExtension developers, reviewers and sophisticated users to trace the individual Extensions. This feature is not meant to provide information in a format that's useful for the average user, just for the people who already have a thorough understanding of how Extensions work.

This project is tested on Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0

**Note:-** Make sure you have some loaded extensions in the Firefox Browser, before testing. If you haven't loaded any, I recommend in using the extensions [HTTPS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/https-everywhere/) and [Dark Background and light text](https://addons.mozilla.org/en-US/firefox/addon/dark-background-light-text/) for getting quick result of logged actvity in this project.

## Setting up the Project

### Loading the Extension into Firefox

1. Open your Firefox Browser (make sure Firefox is >= 70).
2. In the search bar type `about:config` and press enter. A screen with  titled **Proceed with Caution** will appear, click on **Accept the Risk and Continue**
3. You will be taken to a page warning you **Changing these preferences can impact Firefox performance or security**, in the page you will find a search bar at the top and in the search bar, type `extensions.experiments.enabled` which would be initially set to `false`
4. Click on the switch button at the far right-end of the row and change the preference to `true`.

Now your Firefox is ready to experiment with unreleased WebExtensions APIs.

5. Now clone this repo
6. Open a new tab in the Firefox Browser(you can definitely close the old one) and in the search bar, type `about:debugging#/runtime/this-firefox` and press enter.
7. You will find a button `Load Temporary Add-on...` below the section **Temporary Extensions**
8. Click on the button and load the `manifest.json` from the cloned repo.

Contratulation! You have successfully loaded the ActivityLog WebExtension in your firefox browser. So get ready for testing

### Testing the Extension

1. After loading the extension as a temporary extension into your browser. You will get a `inspect` button which will open a console for some developement related testing, which may not be useful for majority of users.
2. To open the activity Log click the extension icon in the browser toolbar, which will give a message "view Extensions Activity" on hovering, a pop up will open listing the extensions installed in the browser and click one of them to view their activity (e.g. HTTPS Everywhere)
3. You will be redirected to a new page where all the extension activity will be logged
4. For more extensive testing, open a new tab and search anything(e.g. <https://www.google.com/)> you will see more activity in the HTTPS extension.
5. You can similarly test this with other extensions installed in your browser.
6. Whenever you want to Download the log for further analysis, click on `Download Log` button. And you can download the activity logged to that perticular point of time for further analysis of the logs
7. For viewing the activity Log in tree format, click on `Tree` and reload the google page you have opened, in another tab

**Note:-** Reloading the google page is an event, that will trigger the activities for HTTPS extensions and you can view more activities in the log, but for testing the activities of any other Extensions you have to trigger an event accordingly that can generate more activities that will be uniques for that perticular extension

### Understanding the Activity Log

To understand the activity Log in a more detailed way or for using it in a more effective manner, click [here](UNDERSTANDINGTHEAPI.md)

## Some Todos for further development of the project:

* [x] Listing out all the extensions, currently activated in Firefox Browser
* [x] Real time activity log of each extensions in tabular format
* [x] Real time activity log of each extensions in tree view format
* [x] Load the activity log to file in .txt format
* [ ] Load the activity log to file in .json format
* [ ] Listing out the extensions, which are activated in the current browser tab

## Contributions

* For existing bugs and adding more features open a issue [here](https://github.com/Ajitesh13/Extension-Activity-Monitor/issues).
* Feel free to open a PR if you want to contribute in this awesome project, please try to maintain all the ES6 coding standards. As this will enabling us to keep the code updated according to the latest released Gecko Engine( currently it is tested with Gecko/20100101 Firefox/76.0)

## Licence

[MIT License](LICENSE)

Copyright (c) 2020 Ajitesh Panda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
