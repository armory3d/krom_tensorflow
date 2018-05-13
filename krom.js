// ./Krom_bin/win32/Krom.exe . . --stdout out.txt

function dropFilesCallback(path) {}
function keyboardDownCallback(key) {}
function keyboardUpCallback(key) {}
function keyboardPressCallback(char) {}
function mouseDownCallback(button, x, y) {}
function mouseUpCallback(button, x, y) {}
function mouseMoveCallback(x, y, mx, my) {}
function mouseWheelCallback(delta) {}
function gamepadAxisCallback(gamepad, axis, value) {}
function gamepadButtonCallback(gamepad, button, value) {}
function penDownCallback(x, y, pressure) {}
function penUpCallback(x, y, pressure) {}
function penMoveCallback(x, y, pressure) {}
function audioCallback(samples) {}
function renderCallback() {}
Krom.init("KromApp", 640, 480, 0, false, 0);
Krom.setCallback(renderCallback);
Krom.setDropFilesCallback(dropFilesCallback);
Krom.setKeyboardDownCallback(keyboardDownCallback);
Krom.setKeyboardUpCallback(keyboardUpCallback);
Krom.setKeyboardPressCallback(keyboardPressCallback);
Krom.setMouseDownCallback(mouseDownCallback);
Krom.setMouseUpCallback(mouseUpCallback);
Krom.setMouseMoveCallback(mouseMoveCallback);
Krom.setMouseWheelCallback(mouseWheelCallback);
Krom.setGamepadAxisCallback(gamepadAxisCallback);
Krom.setGamepadButtonCallback(gamepadButtonCallback);
Krom.setPenDownCallback(penDownCallback);
Krom.setPenUpCallback(penUpCallback);
Krom.setPenMoveCallback(penMoveCallback);
Krom.setAudioCallback(audioCallback);

function getString(b, pos, len) {
	var s = "";
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos+len;
	// utf8-decode and utf16-encode
	while( i < max ) {
		var c = b[i++];
		if( c < 0x80 ) {
			if( c == 0 ) break;
			s += fcc(c);
		} else if( c < 0xE0 )
			s += fcc( ((c & 0x3F) << 6) | (b[i++] & 0x7F) );
		else if( c < 0xF0 ) {
			var c2 = b[i++];
			s += fcc( ((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (b[i++] & 0x7F) );
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			var u = ((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 & 0x7F) << 6) | (b[i++] & 0x7F);
			// surrogate pair
			s += fcc( (u >> 10) + 0xD7C0 );
			s += fcc( (u & 0x3FF) | 0xDC00 );
		}
	}
	return s;
}

var libbin = Krom.loadBlob("krom_lib.js");
var ar = new Uint8Array(libbin, 0, libbin.byteLength);
var libstr = getString(ar, 0, ar.length); // String.fromCharCode.apply(null, new Uint16Array(buf));

(1, eval)(libstr);

// Tensorflow
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
model.fit(xs, ys).then(() => {
	model.predict(tf.tensor2d([5], [1, 1])).print();
});
