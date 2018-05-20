//Generate and Download Screenshot of webpage without lossing the styles https://stackoverflow.com/questions/44494447/generate-and-download-screenshot-of-webpage-without-lossing-the-styles/44495166#44495166

(function (exports) {
	function urlsToAbsolute(nodeList) {
		if (!nodeList.length) {
			return [];
		}
		var attrName = 'href';
		if (nodeList[0].__proto__ === HTMLImageElement.prototype || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
			attrName = 'src';
		}
		nodeList = [].map.call(nodeList, function (el, i) {
			var attr = el.getAttribute(attrName);
			if (!attr) {
				return;
			}
			var absURL = /^(https?|data):/i.test(attr);
			if (absURL) {
				return el;
			} else {
				return el;
			}
		});
		return nodeList;
	}

	function screenshotPage() {
		var capture = document.getElementById('capture');
		html2canvas(capture, {
			onrendered: function (canvas) {
				canvas.toBlob(function (blob) {
					saveAs(blob, 'Saap.png');
				});
			}
		});
	}

	function addOnPageLoad_() {
		window.addEventListener('DOMContentLoaded', function (e) {
			var scrollX = document.documentElement.dataset.scrollX || 0;
			var scrollY = document.documentElement.dataset.scrollY || 0;
			window.scrollTo(scrollX, scrollY);
		});
	}

	function generate() {
		screenshotPage();
	}
	exports.screenshotPage = screenshotPage;
	exports.generate = generate;
})(window);

//Is it possible to control the camera light on a phone via a website? https://stackoverflow.com/questions/37848494/is-it-possible-to-control-the-camera-light-on-a-phone-via-a-website

//Test browser support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
	//Get the environment camera (usually the second one)
	navigator.mediaDevices.enumerateDevices().then(devices => {

		const cameras = devices.filter((device) => device.kind === 'videoinput');

		if (cameras.length === 0) {
			throw 'No camera found on this device.';
		}
		const camera = cameras[cameras.length - 1];

		// Create stream and get video track
		navigator.mediaDevices.getUserMedia({
			video: {
				deviceId: camera.deviceId,
				facingMode: ['user', 'environment'],
				height: {
					ideal: 1080
				},
				width: {
					ideal: 1920
				}
			}
		}).then(stream => {
			const track = stream.getVideoTracks()[0];

			//Create image capture object and get camera capabilities
			const imageCapture = new ImageCapture(track)
			const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

				//Let there be light!
				const btn = document.querySelector('.flash');
				btn.addEventListener('click', function () {
					var flag = true;
					track.applyConstraints({
						advanced: [{
							torch: flag;
						}]
					});
					flag = !flag;
				});
			});
		});
	});
}

//Toggle brightness

function toggleBrightness() {
	var e = document.getElementById('capture');
	e.classList.toggle('brightness');
}

//Toggle grid

function toggleGrid() {
	var e = document.getElementById('grid');
	e.classList.toggle('hidden');
}
