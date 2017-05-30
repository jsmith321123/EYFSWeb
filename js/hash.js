//function that hashes users passwords

function hash (pass) {
	//take the password inputted and output the hashed version
	let finalInt = 0;

	let count = 1;
	for (var i = 0; i < pass.length; i++) {
		finalInt += pass.charCodeAt(i) * count + 1;

		count += 128;
	}

	return finalInt;
}

//export function so it can be imported
module.exports = {
	hash:hash,
}
