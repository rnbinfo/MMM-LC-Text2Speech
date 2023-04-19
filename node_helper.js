// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const AudioPlayer = require("sox-play");

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
let path = require("path");

const Log = require("logger");
let NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: async function (notification, payload) {
		if (notification === "start-text2speech") {
			await this.synthesis(payload);
		}
	},

	// // Test another function
	// anotherFunction: function() {
	// 	return {date: new Date()};
	// }

	async synthesis(text) {
		// The text to synthesize
		// let text = ctx.params.text;

		// Construct the request
		let request = {
			input: { text: text },
			// Select the language and SSML voice gender (optional)
			voice: { languageCode: "cmn-TW", name: "cmn-TW-Wavenet-A", ssmlGender: "FEMALE" },
			// select the type of audio encoding
			audioConfig: { audioEncoding: "MP3" }
		};

		// Performs the text-to-speech request
		const [response] = await client.synthesizeSpeech(request);
		// Write the binary audio content to a local file
		const writeFile = util.promisify(fs.writeFile);
		let dirPath = path.resolve(__dirname, "..") + "/MMM-LC-LPCM/sound/answer.mp3";
		await writeFile(dirPath, response.audioContent, "binary");
		Log.info("Audio content written to file: answer.mp3");
		let player = new AudioPlayer({ file: dirPath });
		player.on("stop", async () => {
			Log.info("end playing answer");
			// ctx.emit("stop.playing",ctx);
			this.sendSocketNotification("stop-text2speech");
		});
		Log.info("start playing answer");
		await player.play();
	}
});
