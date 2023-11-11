const ask = require('./ask');

module.exports = async () => {
	const name = await ask({
		name: `name`,
		message: `Project Name?`,
		hint: `(kebab-case only)`
	});
	

	const vars = {
		name,
	};

	return vars;
};