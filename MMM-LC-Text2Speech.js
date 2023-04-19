

Module.register("MMM-LC-Text2Speech", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000
	},

	//requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
		// Schedule update timer.
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {

	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
		};
	},


	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {


		if(notification === "stop-text2speech") {

			this.sendNotification("start-record");

		}

	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "start-text2speech") {
			this.sendSocketNotification("start-text2speech", payload);
		}
	}
});
