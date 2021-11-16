const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')

module.exports = async function (name, options) {
  console.log(name, options, 'options');
  const cwd = process.cwd()
  const targetAir = path.join(cwd, name)

  console.log(cwd, targetAir, 'cwd');

  if(fs.existsSync(targetAir)) { // 如果该目录已存在
    if(options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
      let {action} = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target already exists',
          choices: [
            {
              name: 'overwrite',
              value: 'overwrite'
            },
            {
              name: 'cancel',
              value: false
            }
          ]
        }
      ])
      if(!action) {
        return
      } else {
        await fs.remove(targetAir) // 删除文件夹
      }
    }
  }

  const args = require('./ask')
  console.log(args, 'args');

  const ask = await inquirer.prompt(args)

  console.log(ask, 'ask');

  // 创建项目
  const generator = new Generator(name, targetAir, ask)
  generator.create()
}
