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

function renderCallback() {
	// Krom.begin(null, null);
	
	// var flags = 0;
	// flags |= 1; // Color
	// flags |= 2; // Depth
	// Krom.clear(flags, 0xff000000, 1.0, null);

	// Krom.setPipeline(pipeline);
	// Krom.setVertexBuffer(vb);
	// Krom.setIndexBuffer(ib);
	// Krom.drawIndexedVertices(0, -1);

	// Krom.end();
}

// var vs = `
// #version 330
// in vec3 pos;
// void main() {
// 	gl_Position = vec4(pos, 1.0);
// }
// `;

// var fs = `
// #version 330
// out vec4 fragColor;
// void main() {
// 	fragColor = vec4(1.0, 0.0, 0.0, 1.0);
// }
// `;

// var vertices = [
//    -1.0, -1.0, 0.0,
//     1.0, -1.0, 0.0,
//     0.0,  1.0, 0.0
// ];

// var indices = [0, 1, 2];

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

// var pipeline = Krom.createPipeline();
// var elem = { name: "pos", data: ["Float3", 2] };
// var structure0 = { elements: [elem] };
// var vert = Krom.createVertexShaderFromSource(vs);
// var frag = Krom.createFragmentShaderFromSource(fs);
// Krom.compilePipeline(pipeline, structure0, null, null, null, 1, vert, frag, null, null, null, {
// 	interleavedLayout: true,
// 	cullMode: 0,
// 	depthWrite: true,
// 	depthMode: 0,
// 	stencilMode: 0,
// 	stencilBothPass: 0,
// 	stencilDepthFail: 0,
// 	stencilFail: 0,
// 	stencilReferenceValue: 0,
// 	stencilReadMask: 0,
// 	stencilWriteMask: 0,
// 	blendSource: 0,
// 	blendDestination: 0,
// 	alphaBlendSource: 0,
// 	alphaBlendDestination: 0,
// 	colorWriteMaskRed: true,
// 	colorWriteMaskGreen: true,
// 	colorWriteMaskBlue: true,
// 	colorWriteMaskAlpha: true,
// 	conservativeRasterization: false
// });

// var vb = Krom.createVertexBuffer(vertices.length / 3, structure0.elements, 0);
// var vbData = Krom.lockVertexBuffer(vb);
// for (i = 0; i < vertices.length; i++) vbData[i] = vertices[i];
// Krom.unlockVertexBuffer(vb);

// var ib = Krom.createIndexBuffer(indices.length);
// var ibData = Krom.lockIndexBuffer(ib);
// for (i = 0; i < indices.length; i++) ibData[i] = indices[i];
// Krom.unlockIndexBuffer(ib);


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

var tfbin = Krom.loadBlob("tfjs.js");
var ar = new Uint8Array(tfbin, 0, tfbin.byteLength);
var tfstr = getString(ar, 0, ar.length); // String.fromCharCode.apply(null, new Uint16Array(buf));
var console = {};
console.log = Krom.log;
console.warn = Krom.log;
var document = {};

// ENV = {};
// ENV.get = function(p) {
// 	if (p == "WEBGL_FLOAT_TEXTURE_ENABLED") return 1;
// 	if (p == "WEBGL_VERSION") return 2;
// 	// WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED
// 	// WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION
// 	// DEBUG
// 	// BACKEMD
// };

document.createElement = function() {
	var o = {};
	o.getContext = function(s) {
		var webgl = {};
		// enable
		webgl.SCISSOR_TEST = 0;
		webgl.CULL_FACE = 1;
		// disable
		webgl.DEPTH_TEST = 2;
		webgl.STENCIL_TEST = 3;
		webgl.BLEND = 4;
		webgl.DITHER = 5;
		webgl.POLYGON_OFFSET_FILL = 6;
		webgl.SAMPLE_COVERAGE = 7;
		// cullFace
		webgl.FRONT = 0;
		webgl.BACK = 1;
		// getParameter
		webgl.GPU_DISJOINT_EXT = 0;
		webgl.MAX_TEXTURE_SIZE = 1;
		// getShaderParameter
		webgl.COMPILE_STATUS = 0;
		// bindBuffer
		webgl.ARRAY_BUFFER = 0;
		webgl.ELEMENT_ARRAY_BUFFER = 1;
		webgl.PIXEL_PACK_BUFFER = 2;
		// usage
		webgl.STATIC_DRAW = 0;
		// target
		webgl.TEXTURE_2D = 0;
		webgl.FRAMEBUFFER = 1;
		// internalFormat
		webgl.RGBA = 0;
		webgl.RGBA32F = 1;
		webgl.R32F = 2;
		webgl.RED = 3;
		// type
		webgl.UNSIGNED_BYTE = 0;
		webgl.FLOAT = 1;
		// framebufferTexture2D
		webgl.COLOR_ATTACHMENT0 = 0;
		// checkFramebufferStatus
		webgl.FRAMEBUFFER_COMPLETE = 0;
		webgl.NO_ERROR = 0;
		// texParameter
		webgl.TEXTURE_WRAP_S = 0;
		webgl.TEXTURE_WRAP_T = 1;
		webgl.CLAMP_TO_EDGE = 0;
		webgl.TEXTURE_MIN_FILTER = 2;
		webgl.TEXTURE_MAG_FILTER = 3;
		webgl.NEAREST = 0;
		// createShader
		webgl.VERTEX_SHADER = 0;
		webgl.FRAGMENT_SHADER = 1;
		// getProgramParameter
		webgl.LINK_STATUS = 0;
		webgl.VALIDATE_STATUS = 1;
		// activeTexture
		webgl.TEXTURE0 = 0;
		// drawElements
		webgl.TRIANGLES = 0;

		webgl.getExtension = function(s) {
			if (s == 'WEBGL_lose_context') {
				var ext = {};
				ext.loseContext = function() {};
				//ext.restoreContext = function() {};
				return ext;
			}
			if (s == 'EXT_color_buffer_float') {
				var ext = {};
				return ext;
			}
		}
		var activeVB = null;
		var activeIB = null;
		webgl.createBuffer = function() {
			var buf = {};
			buf.data = null;
			return buf;
		};
		webgl.bindBuffer = function(target, buffer) {
			// ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER
			if (target == webgl.ARRAY_BUFFER) activeVB = buffer;
			else activeIB = buffer;
		};
		webgl.bufferData = function(target, srcData, usage) {
			if (target == webgl.ARRAY_BUFFER) {
				var e1 = {}
				e1.name = "clipSpacePos";
				e1.data = 2; // Float3
				var e2 = {}
				e2.name = "uv";
				e2.data = 1; // Float2
				var structure = [e1, e2]; // Hard-coded structure for now
				activeVB.data = Krom.createVertexBuffer(srcData.length, structure, 0);
				var ar = Krom.lockVertexBuffer(activeVB.data);
				for (i = 0; i < srcData.length; i++) {
					ar[i] = srcData[i];
				}
				Krom.unlockVertexBuffer(activeVB.data);
			}
			else {
				activeIB.data = Krom.createIndexBuffer(srcData.length);
				var ar = Krom.lockIndexBuffer(activeIB.data);
				for (i = 0; i < srcData.length; i++) {
					ar[i] = srcData[i];
				}
				Krom.unlockIndexBuffer(activeIB.data);
			}
		};
		// var activeFB = null;
		webgl.createFramebuffer = function() {
			var fb = {};
			// fb.data = null;
			return fb;
		};
		webgl.enable = function(cap) {
			// SCISSOR_TEST, CULL_FACE
		};
		webgl.disable = function(cap) {
			// DEPTH_TEST, STENCIL_TEST, BLEND, DITHER, POLYGON_OFFSET_FILL, SAMPLE_COVERAGE
		};
		webgl.getParameter = function(pname) {
			if (pname == webgl.GPU_DISJOINT_EXT) return 0;
			if (pname == webgl.MAX_TEXTURE_SIZE) return 16384;
		};
		var activeTex = null;
		webgl.createTexture = function() {
			var tex = {};
			tex.data = null;
			return tex;
		};
		webgl.bindTexture = function(target, texture) {
			activeTex = texture; // TEXTURE_2D
		};
		webgl.texImage2D = function(target, level, internalformat, width, height, border, format, type, data) {
			// data==null
			var format = 0;
			// activeTex.data = Krom.createTexture(width, height, format);
			activeTex.data = Krom.createRenderTarget(width, height, 0, format, 0, 0);
		};
		webgl.bindFramebuffer = function(target, framebuffer) {
			// FRAMEBUFFER
			// activeFB = framebuffer;
		};
		webgl.framebufferTexture2D = function(target, attachment, textarget, texture, level) {
			// activeFB.data = Krom.createRenderTarget();
		};
		webgl.checkFramebufferStatus = function(target) {
			return webgl.FRAMEBUFFER_COMPLETE;
		};
		webgl.readPixels = function(x, y, width, height, format, type, pixels) {
			Krom.getRenderTargetPixels(activeTex.data, pixels.buffer);
		};
		webgl.cullFace = function() {
			return webgl.BACK;
		};
		webgl.getError = function() {
			return webgl.NO_ERROR;
		};
		webgl.texParameteri = function(target, pname, param) {
			// Krom.log(param);
			// clamp, clamp, nearest, nearest, nomip
			// Krom.setTextureParameters(texunit, 2, 2, 0, 0, 0);
		};
		webgl.texSubImage2D = function(target, level, xoffset, yoffset, width, height, format, type, data) {
			// var b = Krom.lockRenderTarget(activeTex.data, 0);
			// Krom.unlockRenderTarget(activeTex.data);

			// var format = 0;
			// activeTex.data = Krom.createTexture(width, height, format);
			// activeTex.data = Krom.createRenderTarget(width, height, 0, format, 0, 0);
		};
		webgl.createShader = function(type) {
			var sh = {};
			sh.source = "";
			sh.type = type;
			return sh;
		};
		webgl.shaderSource = function(shader, source) {
			shader.source = source;
			// Krom.log(source);
		};
		webgl.compileShader = function(shader) {
			if (shader.type == webgl.VERTEX_SHADER) shader.data = Krom.createVertexShaderFromSource(shader.source);
			else shader.data = Krom.createFragmentShaderFromSource(shader.source);
		};
		webgl.getShaderParameter = function(shader, pname) {
			return true; // COMPILE_STATUS
		};
		webgl.createProgram = function() {
			var prog = {};
			prog.data = null;
			prog.vertexShader = null;
			prog.fragmentShader = null;
			return prog;
		};
		webgl.attachShader = function(program, shader) {
			if (shader.type == webgl.VERTEX_SHADER) program.vertexShader = shader;
			else program.fragmentShader = shader;
		};
		webgl.linkProgram = function(program) {
			var e1 = {}
			e1.name = "clipSpacePos";
			e1.data = 2; // Float3
			var e2 = {}
			e2.name = "uv";
			e2.data = 1; // Float2
			var structure = [e1, e2]; // Hard-coded structure for now
			program.data = Krom.createPipeline();
			Krom.compilePipeline(program.data, structure, null, null, null, 1, program.vertexShader.data, program.fragmentShader.data, null, null, null, {
				interleavedLayout: true,
				cullMode: 0,
				depthWrite: false,
				depthMode: 0,
				stencilMode: 0,
				stencilBothPass: 0,
				stencilDepthFail: 0,
				stencilFail: 0,
				stencilReferenceValue: 0,
				stencilReadMask: 0,
				stencilWriteMask: 0,
				blendSource: 0,
				blendDestination: 0,
				alphaBlendSource: 0,
				alphaBlendDestination: 0,
				colorWriteMaskRed: true,
				colorWriteMaskGreen: true,
				colorWriteMaskBlue: true,
				colorWriteMaskAlpha: true,
				conservativeRasterization: false
			});
		};
		webgl.getProgramParameter = function(program, pname) {
			return true; // LINK_STATUS, VALIDATE_STATUS
		};
		webgl.useProgram = function(program) {
			Krom.setPipeline(program.data);
		};
		webgl.getAttribLocation = function(program, name) {
			// missing
			if (name == "clipSpacePos") return 0;
			else if (name == "uv") return 1;
			return 0;
		};
		webgl.vertexAttribPointer = function(index, size, type, normalized, stride, offset) {
			// Krom.log(offset);
			// clipSpacePos=0 size3, uv=1 size2
		};
		webgl.enableVertexAttribArray = function(index) {
			// 0
			// in VertexBuffer::_set()
		};
		webgl.getUniformLocation = function(program, name) {
			// Krom.log(name);
			return Krom.getConstantLocation(program.data, name);
		};
		webgl.viewport = function(x, y, width, height) {
			Krom.viewport(x, y, width, height);
		};
		webgl.scissor = function(x, y, width, height) {
			Krom.scissor(x, y, width, height);
		};
		webgl.activeTexture = function(texture) {
			// in Krom
			// TEXTURE0+n
		};
		webgl.uniform1i = function(location, v0) {
			Krom.setInt(location, v0);
		};
		webgl.uniform2i = function(location, v0, v1) {
			// missing
			Krom.setFloat2(location, v0, v1);
		};
		webgl.uniform1f = function(location, v0) {
			Krom.setFloat(location, v0);
		};
		webgl.drawElements = function(mode, count, type, offset) {
			// TRIANGLES,6,UNSIGNED_SHORT,0
			activeTex.renderTarget_ = activeTex.data;
			Krom.begin(activeTex, null);
			Krom.setVertexBuffer(activeVB.data);
			Krom.setIndexBuffer(activeIB.data);
			Krom.drawIndexedVertices(0, count);
			Krom.end();
		};
		return webgl;
	};
	return o;
};

(1, eval)(tfstr);

const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
model.fit(xs, ys).then(() => {
	model.predict(tf.tensor2d([5], [1, 1])).print();
});
