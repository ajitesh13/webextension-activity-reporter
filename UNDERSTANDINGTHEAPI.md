# Understanding the Activity Log API

This entire project is about leveraging the ActivtyLog API. To create an end product for user, that let them track the activities of other WebExtensions, in the Firefox browser, such as altered browser settings or network requests and the messages exchanged between the different parts of the Extension.

For implementing all these functionalities, we have to make use of some of the existing Firefox features, WebExtension APIs, web APIs and a lot of JavaScript DOM to make our desired end product handy and useful to the users.

#### Some of the Web Extensions APIs used in the project are:

* management
* browserAction
* runtime
* tabs
* windows (this API is not yet implemented, but can be used to displpay the Activity Log in a different browser windows)

#### Some of the Web APIs used in the project are:

* window
* Blob
* URL

#### How the Activity Log is developed ?

The Activity Log is devloped by using the Activity Log API of Mozilla Firefox.

#### What is Activity Log API ?

It is a WebExtension API developed by Mozilla for the Firefox Browser, in mid-2019. It is not yet implemented as a product for end user.

### What does the activity log API provide ?

The Activity Log API provide an event `onExtensionActivity(details, id)` which will listen to extension activity and execute a call back function. It will take the extension id as its parameter and return back `details` which contain the following structure.

![parameter diagram](presentations/parmeter%20diagram%20of%20activity%20log%20event%20.jpeg)

As the call back function, I have passed a logging function `_log()`, so that the `onExtensionActivity()` event will listen for the activities of other extensions and execute the logging function, whenever it detects an extension activity.

To know more about the API click the below link:
* [API Implementation file](https://searchfox.org/mozilla-central/source/toolkit/components/extensions/parent/ext-activityLog.js)
* [API Test file](https://searchfox.org/mozilla-central/source/toolkit/components/extensions/test/mochitest/test_ext_activityLog.html)
* [API JSON schema](https://searchfox.org/mozilla-central/source/toolkit/components/extensions/schemas/activity_log.json)
