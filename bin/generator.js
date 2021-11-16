const { getRepolist, getTaglist } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const downloadGitRepo = require('download-git-repo')

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()

  try{
    const result = await fn(...args)
    spinner.succeed()
    return result
  } catch (e) {
    spinner.fail('Request failed ……')
  }
}



class Generator {
  constructor(name, target, ask) {
    this.name = name
    this.target = target
    this.ask = ask
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  async getRepo() {
    const repolist = await wrapLoading(getRepolist, 'waiting fetch template')
    if(!repolist) return

    const repos = repolist.map(item => item.name)

    const {repo} = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template'
    })

    return repo
  }

  async getTag(repo) {
    const tags = await wrapLoading(getTaglist, 'waiting fetch tag', repo)
    if(!tags) return
    const taglist = tags.map(item => item.name)
    const {tag} = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: taglist,
      message: 'please choose a tag'
    })
    return tag
  }

  async download(repo, tag) {
    const requestUrl = `zhurong-cli/${repo}${tag?'#'+tag: ''}`
    console.log(requestUrl, 'requestUrl');
    await wrapLoading(
      this.downloadGitRepo,
      'waiting download template',
      requestUrl,
      path.resolve(process.cwd(), this.target)
    )
  }

  async create() {
    const repo = await this.getRepo()
    const tag = await this.getTag(repo)
    console.log('用户选择了', repo, tag)

    await this.download(repo, tag)

    let targetPath = path.resolve(process.cwd(), this.target)
    // let jsonPath = `${path1}\\package.json`
    let jsonPath = path.join(targetPath, 'package.json')
    console.log(jsonPath, 'jsonPath');

    if(fs.existsSync(jsonPath)){
      const data = fs.readFileSync(jsonPath).toString();
      let json = JSON.parse(data);
      json.name = this.name
      Object.keys(this.ask).forEach(item => {
        json[item] = this.ask[item]
      })
      //修改项目文件夹中 package.json 文件
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'), 'utf-8');
    }

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n cd ${chalk.cyan(this.name)}`)
    console.log(' npm run dev\r\n')
  }
}

module.exports = Generator
