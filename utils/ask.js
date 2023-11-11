const os = require('os');
const fs = require('fs');
const path = require('path');
const { Input } = require('enquirer');
const to = require('await-to-js').default;
const { Store } = require('data-store');
const {handleError, shouldCancel} = require('./hooks.js');

module.exports = async ({ name, message, hint, initial }) => {
	let history = false;
	if (
		!initial &&
		name !== `name` &&
		name !== `command` &&
		name !== `description`
	) {
		history = {
			autosave: true,
			store: new Store({
				path: path.join(
					os.homedir(),
					`.history/react-tailwind-app/${name}.json`
				)
			})
		};
	}
	const [err, response] = await to(
		new Input({
			name,
			message,
			hint,
			initial,
			history,
			validate(value, state) {
				if (state && state.name === `command`) return true;
				if (state && state.name === `name`) {
					if (fs.existsSync(value)) {
						return `Directory already exists: ./${value}`;
					} else {
						return true;
					}
				}
				return !value ? `Please add a value.` : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);

	return response;
};