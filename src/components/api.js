const baseurl = 'https://api.github.com/';

function getUser(username) {
  return fetch(baseurl + 'users/' + username)
          .then((response) => {
            return response.json();
          });
}
function getRepos(username) {
  return fetch(baseurl + 'users/' + username + '/repos')
          .then((response) => {
            return response.json();
          });
}
function getSearchRepos(terms) {
  return fetch(baseurl + 'search/repositories?q=' + terms.join('+'))
          .then((response) => {
            return response.json();
          });
}
module.exports = {
  getUser: getUser,
  getRepos: getRepos,
  getSearchRepos: getSearchRepos
}
