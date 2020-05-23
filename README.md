# Extension Activity Monitor

This project is tested on Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0

**Note :-** Make sure you have some loaded extensions in the Firefox Browser, before testing. If you haven't loaded any, I recommend in using the extensions [HTTPS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/https-everywhere/) and [Dark Background and light text](https://addons.mozilla.org/en-US/firefox/addon/dark-background-light-text/) for getting quick result of logged actvity in this project.

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
4. For more extensive testing, open a new tab and search anything(e.g. https://www.google.com/) you will see more activity in the HTTPS extension.
5. You can similarly test this with other extensions installed in your browser.
6. Whenever you want to Download the log for further analysis, click on `Download Log` button. And you can download the activity logged to that perticular point of time for further analysis of the logs
7. For viewing the activity Log in tree format, click on `Tree` and reload the google page you have opened, in another tab (reloading the google page is an event, that will trigger the activities for HTTPS extensions and you can view more activities in the log, but for testing the activities of any other Extensions you have to trigger an event accordingly that can generate more activities that will be uniques for that perticular extension)