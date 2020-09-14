'use strict';

window.addEventListener('load', async () => {
	let list = document.getElementById('list');
	let addons = await browser.management.getAll();
	console.log('List of Addons: ');
	for (let addon of addons) {
		if (addon.type !== 'extension' || !addon.enabled) {
			continue;
		}
		console.log(addon);

		if (addon.name !== 'extension logging') {
			let item = document.createElement('li');
			item.innerHTML = addon.name;
			item.addEventListener('click', () => {
				browser.tabs.create({
					url: `${browser.runtime.getURL('log/log.html')}#${addon.id}`
				});
				window.close();
			});
			list.appendChild(item);
		}
	}

	var gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
	gettingActiveTab.then((tabs) => {
		let currentTab = tabs[0];
		let tabid = currentTab.id;
		// console.log(currentTab.id);
		let para = document.getElementById('para');
		para.innerText = `Current Tab Id : ${tabid}`;
	});
});
