const chalk = require('chalk');
const sym = require('log-symbols');
const yellow = chalk.yellow;
const green = chalk.green;
const greenI = chalk.green.inverse;
const red = chalk.red;
const redI = chalk.red.bold.inverse;
const orange = chalk.keyword('orange');
const orangeI = chalk.keyword('orange').inverse;
const blue = chalk.blue;
const blueI = chalk.blue.inverse;


/**  handleError **/
const handleError = (heading = `ERROR: `, err, displayError = true, exit = true) => {
	if (err) {
		console.log();
		if (displayError) {
			console.log(`${sym.error} ${red(heading)}`);
			console.log(`${sym.error} ${red(`ERROR →`)} ${err.name}`);
			console.log(`${sym.info} ${red(`REASON →`)} ${err.message}`);
			console.log(`${sym.info} ${red(`ERROR STACK ↓ \n`)} ${err.stack}\n`);
		} else {
			console.log(`${sym.warning}  ${yellow(heading)}\n`);
		}
		if (exit) {
			process.exit(0);
		} else {
			return false;
		}
	}
};

/**  unhandled **/
const unhandled = () => {
	process.on('unhandledRejection', err => {
		handleError(`UNHANDLED ERROR`, err);
	});
};

/**  shouldCancel **/
const shouldCancel = async action => {
	if (action === undefined) {
		console.log(yellow(`❯ Cancelled!\n`));
		process.exit(0);
	}
};

/**  alert **/
const alert = ((options) => {
	const defaultOptions = {
		type: `error`,
		msg: `You forgot to define all options.`,
		name: ``
	};
	const opts = {...defaultOptions, ...options};
	const {type, msg, name} = opts;
	const printName = name ? name : type.toUpperCase();

	if (type === `success`) {
		console.log(`\n${sym.success} ${greenI(` ${printName} `)} ${green(msg)}\n`);
	}

	if (type === `warning`) {
		console.log(`\n${sym.warning} ${orangeI(` ${printName} `)} ${orange(msg)}\n`);
	}

	if (type === `info`) {
		console.log(`\n${sym.info} ${blueI(` ${printName} `)} ${blue(msg)}\n`);
	}

	if (type === `error`) {
		console.log(`\n${sym.error} ${redI(` ${printName} `)} ${red(msg)}\n`);
	}
});

module.exports = {
	handleError,
	unhandled,
	shouldCancel,
	alert
};