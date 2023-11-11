const execa = require('execa');
const ora = require('ora');
const fs = require('fs-extra');
const copy = require('copy-template-dir');

const cwd = process.cwd();
const path = require('path');

const questions = require('./questions');

module.exports = async () => {
  const vars = await questions();
  const projectName = vars.name;
  const spinner = ora({ text: '' });

  try {
    // Create project
    spinner.start('Creating your project');
    await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', 'react-ts']);
    spinner.succeed('Project created successfully.');


    process.chdir(projectName);


    // Install dependencies
    spinner.start('Installing tailwindcss and its peer dependencies');
    const pkgs = [
      'postcss@^8.4.31',
      'tailwindcss@^3.3.5',
      'autoprefixer@^10.4.16',
    ];
    await execa('npm', ['install', ...pkgs, '-D']);
    await execa('npm', ['dedupe']);
    spinner.succeed('Dependencies installed successfully.');


    await execa('npx', ['tailwindcss', 'init', '-p']);


    // Copy files
    spinner.start('Configuring template path');
    const templateFolderPath = path.resolve(__dirname, '..', 'template');

    const tailwindConfigSource = path.join(templateFolderPath, 'tailwind.config.js');
    const tailwindConfigDestination = path.join(cwd, projectName, 'tailwind.config.js');

    const indexCssSource = path.join(templateFolderPath, 'index.css');
    const indexCssDestination = path.join(cwd, projectName, 'src', 'index.css');
    const appTsxSource = path.join(templateFolderPath, 'App.tsx');
    const appTsxDestination = path.join(cwd, projectName, 'src', 'App.tsx');

    const githubSvgSource = path.join(templateFolderPath, 'github.svg');
    const githubSvgDestination = path.join(cwd, projectName, 'src', 'assets', 'github.svg');

    await fs.copy(tailwindConfigSource, tailwindConfigDestination, { overwrite: true });
    await fs.copy(indexCssSource, indexCssDestination, { overwrite: true });
    await fs.copy(appTsxSource, appTsxDestination, { overwrite: true });
    await fs.copy(githubSvgSource, githubSvgDestination, { overwrite: true });
		spinner.succeed('Template path configured successfully.');

    console.log(`\nDone. Now run:\n`);
    console.log('\t' + `cd ${projectName}`);
    console.log('\t' + `npm run dev`);
  } catch (error) {
    spinner.fail();
    console.error(`Error creating project: ${error.message}`);
  }
};
