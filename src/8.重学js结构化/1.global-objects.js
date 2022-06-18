const globalProperties = [
	// value properties of the global object
	'Infinity',
	'NaN',
	'undefined',
	// function properties of the global object
	'eval',
	'isFinite',
	'isNaN',
	'parseFloat',
	'parseInt',
	'decodeURI',
	'decodeURIComponent',
	'encodeURI',
	'encodeURIComponent',
	// constructor properties of the global object
	'Array',
	'Date',
	'RegExp',
	'Promise',
	'Proxy',
	'Map',
	'WeakMap',
	'Set',
	'WeakSet',
	'Function',
	'Boolean',
	'String',
	'Number',
	'Symbol',
	'Object',
	'Error',
	'EvalError',
	'RangeError',
	'ReferenceError',
	'SyntaxError',
	'TypeError',
	'URIError',
	'ArrayBuffer',
	'SharedArrayBuffer',
	'DataView',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8ClampedArray',
	// other properties of the global object
	'Atomics',
	'JSON',
	'Math',
	'Reflect'
]

let queue = []
for (var p of globalProperties) {
	queue.push({
		path: [p],
		object: this[p]
	})
}

let current
let set = new Set()
while (queue.length) {
	current = queue.shift()

	if (set.has(current.object)) continue

	set.add(current.object)
	if (!current.object) {
		continue
	}
	console.log(current.path.join('.'))

	for (let p of Object.getOwnPropertyNames(current.object)) {
		var property = Object.getOwnPropertyDescriptor(current.object, p)
		// console.log(property, current.path);

		if (property.hasOwnProperty('value') &&
			(typeof property.value != null &&
				typeof property.value === 'object' ||
				typeof property.value === 'function' &&
				property.value instanceof Object)) {
			queue.push({
				path: current.path.concat([p]),
				object: property.value
			})
		}

		if (property.hasOwnProperty('get') && typeof property.get === 'function') {
			queue.push({
				path: current.path.concat([p]),
				object: property.get
			})
		}

		if (property.hasOwnProperty('set') && typeof property.set === 'function') {
			queue.push({
				path: current.path.concat([p]),
				object: property.set
			})
		}
	}
}

console.log(set)