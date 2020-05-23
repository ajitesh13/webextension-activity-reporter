"use strict";

let currentView;
let count = 0;

function setupView(view) {
  view.selector.addEventListener("click", () => {
    if (view === currentView) { return; }

    currentView.selector.setAttribute("class", "");
    currentView.hide();

    currentView = view;
    currentView.selector.setAttribute("class", "selected");
    currentView.show();
  });
}

function downloadFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
}

const IMG_DROPDOWN = "chrome://global/skin/icons/arrow-dropdown-12.svg";
const IMG_UP = "chrome://global/skin/icons/arrow-up-12.svg";

function _pad(v, l) {
  let s = String(v);
  while (s.length < l) {
    s = "0" + s;
  }
  return s;
}

function formatTime(ts) {
  // return `${ts.getHours()}:${_pad(ts.getMinutes(), 2)}:${_pad(ts.getSeconds(), 2)}.${_pad(ts.getMilliseconds(), 3)}`;
  return `${ts.getHours()}:${_pad(ts.getMinutes(), 2)}:${_pad(ts.getSeconds(), 2)}`;
}

const rawView = {
  init() {
    this.selector = document.getElementById("select-raw");
    this.container = document.getElementById("content-raw");
    this.log = document.getElementById("log");
    document.getElementById("raw-clear").addEventListener("click", () => {
      this._clear();
    });
    document.getElementById("downloadLog").addEventListener('click', () => {
      this._download();
    });
    setupView(this);
  },

  show() {
    this.container.setAttribute("class", "");
  },

  hide() {
    this.container.setAttribute("class", "hidden");
    this._clear();
  },

  _clear() {
    while (this.log.firstChild) {
      this.log.firstChild.remove();
    }
  },

  _download() {
      let log = document.getElementById('log');
      let text = "";
      const id = window.location.hash.slice(1);
      for(let i=0; i<log.rows.length; i++) {
        let objCells = log.rows.item(i).cells;
        for(let j=0; j<objCells.length; j++) {
          text = text + '  ' + objCells.item(j).innerText; 
        }
        if(text.includes("args")) {
          text = text + "\n\n";
        } else {
          text = text + "\n";
        }
      }
      const blob = new Blob([`${id}` + `\n` + `${text}` + `\n`], {type: "text/plain"});
      downloadFile(blob, `activityLog_${id}.txt`);
  },

  onLog(details) {
    let row =  document.createElement("tr");

    let time = document.createElement("td");
    time.innerText = formatTime(details.timeStamp);
    row.appendChild(time);

    let type = document.createElement("td");
    type.innerText = details.type;
    row.appendChild(type);

    let name = document.createElement("td");
    name.innerText = details.name;
    row.appendChild(name);

    let marker = document.createElement("td");
    let dropdown = document.createElement("img");
    dropdown.src = IMG_DROPDOWN;
    marker.appendChild(dropdown);
    row.appendChild(marker);

    let entry;
    marker.addEventListener("click", () => {
      if (entry && !entry.hidden) {
        entry.hidden = true;
        dropdown.src = IMG_DROPDOWN;

        row.setAttribute("class", "");
      } else {
        if (!entry) {
          entry = document.createElement("tr");
          entry.setAttribute("class", "detailrow");
          let inner = document.createElement("td");
          inner.setAttribute("colspan", 4);
          inner.innerText = JSON.stringify(details.data);
          entry.appendChild(inner);
          this.log.insertBefore(entry, row.nextSibling);
        }
        entry.hidden = false;
        dropdown.src = IMG_UP;
        row.setAttribute("class", "detailopen");
      }
    });

    this.log.appendChild(row);
  },
};

const treeView = {
  init() {
    this.selector = document.getElementById("select-tree");
    this.container = document.getElementById("content-tree");
    setupView(this);

    this.root = {
      listEl: document.getElementById("api-tree"),
      children: new Map(),
    };
  },

  show() {
    this.container.setAttribute("class", "");
  },

  hide() {
    this.container.setAttribute("class", "hidden");
  },

  _insert(tree, names, details) {
    let name = names.shift();

    let child = tree.children.get(name);
    if (!child) {
      let item = document.createElement("li");

      let label = document.createElement("span");
      let listEl = document.createElement("ul");

      item.appendChild(label);
      item.appendChild(listEl);

      tree.listEl.appendChild(item);

      child = {label, listEl};

      if (names.length) {
        child.leaf = false;
        child.children = new Map();
        child.count = 0;
      } else {
        child.leaf = true;
        child.entries = [];

        item.addEventListener("click", () => {
          if (child.listEl.children.length) {
            while (child.listEl.firstChild) {
              child.listEl.firstChild.remove();
            }
          } else {
            for (let entry of child.entries) {
              let li = document.createElement("li");
              li.innerText = JSON.stringify(entry);
              child.listEl.appendChild(li);
            }
          }
        });
      }

      tree.children.set(name, child);
    }
    
    if (child.leaf) {
      child.entries.push(details);
    } else {
      child.count++;
      this._insert(child, names, details);
    }

    let count = child.count || child.entries.length;
    child.label.innerText = `${name} (${count})`;
  },

  onLog(data) {
    if (data.type != "api_call") { return; }
    let names = data.name.split(".");
    this._insert(this.root, names, data);
  },
};

async function init() {
  const id = window.location.hash.slice(1);
  // const addon = await AddonManager.getAddonByID(id);
  // const title = `Activity Log for ${addon.name}`;
  const title = `Activity Log for ${id}`;

  let header = document.getElementById("title");
  header.innerText = title;

  currentView = rawView;
  rawView.init();
  treeView.init();

  function onLog(...args) {
    currentView.onLog(...args);
  }

  await browser.activityLog.onExtensionActivity.addListener(onLog, id);
}

addEventListener("DOMContentLoaded", init);
