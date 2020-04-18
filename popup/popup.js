"use strict";

console.log("in popup");
window.addEventListener("load", async () => {
  console.log("in load");
  let list = document.getElementById("list");
  let addons = await browser.management.getAll();
  for (let addon of addons) {
    // if (addon.type !== "extension") { continue; }
    if (addon.type !== "extension" || !addon.enabled) { continue; }
    console.log(addon);

    ( ({name, id}) => {
      if(name != "extension logging") {
        let item = document.createElement("li");
        item.innerText = name;
        item.addEventListener("click", () => {
          browser.tabs.create({
            url: `${browser.runtime.getURL("log/log.html")}#${id}`,
          });
          window.close();
        });
        list.appendChild(item);
      }
    }) (addon);
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    console.log("insidequery");
    let currentTab = tabs[0];
    let tabid = currentTab.id;
    // console.log(currentTab.id);
    let para = document.getElementById("para");
    para.innerHTML = tabid;
  });
});


