#! /usr/bin/env node

const program = require('commander');

// option 选项
program.version('1.0.0', '-V, --version')
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-t, --type <type>', 'choice', 'tp2')
  .option('-n, --number <numbers...>', 'specify numbers')
  // .requiredOption('-c, --cheese <type>', 'pizza must have cheese')
  .parse(process.argv);
// console.log(program.opts(), program.getOptionValue("debug"), program.getOptionValue("small"));
const options = program.opts()
// console.log(options);
if (options.debug) console.log('output extra debugging');
if (options.small) console.log('small pizza size');

// command 命令
// program
//   .command('create <username> <password>' )
//   .description('example program for argument')
//   .action((username, password) => {
//     console.log('username:', username, password);
//   });
// program.parse();
//
// program.command('password <password>', 'user paddword')

// program
//   .command('create')
//   .argument('<username>', 'user to login')
//   .argument('<password>', 'user to password')
//   .action((useraname, password) => {
//     console.log(useraname, password, 'username');
//   })
//
// program.parse();
// program
//   .command('name <name>')
//   .option('-t, --title <honorific>', 'title to use before name')
//   .option('-d, --debug', 'display some debugging')
//   .action((name, options, command) => {
//     if (options.debug) {
//       console.error('Called %s with options %o', command.name(), options);
//     }
//     const title = options.title ? `${options.title} ` : '';
//     console.log(`Thank-you ${title}${name}`);
//   });
// program.parse();
// program
//   .version('0.1.0')
//   .command('install [name]', 'install one or more packages')
//   .command('search [query]', 'search with optional query')
//   .command('update', 'update installed packages', { executableFile: 'myUpdateSubCommand' })
//   .command('list', 'list packages installed', { isDefault: true });

// program
//   .option('-t, --trace', 'display trace statements for commands')
//   .hook('preAction', (thisCommand, actionCommand) => {
//     if (thisCommand.opts().trace) {
//       console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
//       console.log('arguments: %O', actionCommand.args);
//       console.log('options: %o', actionCommand.opts());
//     }
//   });

// console.log(process.argv, 'process.argv');

// program.storeOptionsAsProperties().option('-d, --debug')
// program.parse();
// if(program.debug) {console.log(program.debug);}


// const { program } = require('commander');

// program
//   .description('An application for pizza ordering')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-c, --cheese <type>', 'Add the specified type of cheese', 'marble')
//   .option('-C, --no-cheese', 'You do not want any cheese');
//
// program.parse();
//
// const options = program.opts();
// console.log('you ordered a pizza with:');
// if (options.peppers) console.log('  - peppers');
// const cheese = !options.cheese ? 'no' : options.cheese;
// console.log('  - %s cheese', cheese);

// program.option('-c --config', 'set config path', './test.js')
// program.parse();

// const options = program.opts();
// console.log(options);

// program
//   .version('0.1.0')
//   .command('create <name>')
//   .description('create a new project')
//   .action(name => {
//     console.log('project name is', name);
//   })
const spawn = require('cross-spawn')
const chalk = require('chalk')

const dependencies = ['vue', 'vuex', 'vue-router', 'hsjy-lcd']

const child = spawn('npm', ['install', '-D'].concat(dependencies), {stdio: 'inherit'})

  child.on('close', function (code) {
    if(code !== 0) {
      process.exit(1)
    } else {
      console.log(chalk.cyan('Install finished'))
    }
  })


program.parse()
