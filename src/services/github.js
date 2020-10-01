import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

const clientID = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
const clientSecret = `&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

const today = new Date();

let day = today.getDate();
if (day < 10) {
  day = '0' + today.getDate();
}

const correctMonth = month => {
  return month >= 10 ? month : month === 0 ? 12 : '0' + month;
};

const previousMonth = correctMonth(today.getMonth());
const thisMonth = correctMonth(today.getMonth() + 1);

const year = today.getFullYear();

const lastMonth = year + '-' + previousMonth + '-' + day;
const lastYear = year - 1 + '-' + thisMonth + '-' + day;

console.log(lastMonth);

// REQUEST FOR THE MOST TRENDING USERS FROM API
// https://api.github.com/search/users?q=created:>=2020-08-25+followers:>=0&sort:followers
export const loadTrendingUsers = () => api.get('/search/users?q=created:>=' + lastMonth + '&sort=followers&order=desc').then(response => response.data);

// REQUEST FOR SINGLE USER DETAILS
export const loadUserDetails = name => api.get(`/users/${name}?`).then(response => response.data);

// REQUEST FOR USER REPOS
export const loadUserRepos = name => api.get(`/users/${name}/repos?`).then(response => response.data);

// REQUEST FOR THE MOST ACTIVE USERS FROM API
// https://api.github.com/search/users?q=created:>=2020-08-25&order=desc&sort=repositories
export const loadActiveUsers = () => api.get('/search/users?q=created:>=' + lastMonth + '&order=desc&sort=repositories').then(response => response.data);

// GET REPOSITORIES FROM API
// https://api.github.com/search/repositories?q=created:>=2019-09-27&sort=stars&order=desc
export const loadTopRepositories = () => api.get('/search/repositories?q=created:>=' + lastYear + '+stars:>10000&sort=stars&order=desc&per_page=100&').then(response => response.data);
