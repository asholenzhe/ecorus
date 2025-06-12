const OpenAPI = require('openapi-typescript-codegen');
const { exec } = require('child_process');

OpenAPI.generate({
	input: `http://ecoapp-itis.ru/docs-json`,
	output: './src/app/models/generated',
	indent: 'tab',
	exportServices: false,
	exportCore: false,
}).then((r) =>
	exec(`npm run prettier --write "src/app/models/generated/**/*.ts"`),
);
