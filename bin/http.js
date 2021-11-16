const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})

async function getRepolist() {
  return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
  // return axios.get('https://api.github.com/orgs/13837120071/repos')
}

async function getTaglist(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepolist,
  getTaglist
}
