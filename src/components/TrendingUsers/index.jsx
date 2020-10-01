import React, { Component } from 'react';
import UserCard from './../userCard';
import { loadUserDetails, loadUserRepos } from './../../services/github';

class TrendingUsers extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      trendingUsers: []
    };
  }

  componentDidMount() {
    let topUsers = [];
    let topRepos = [];

    const users = this.props.trendingUsers;

    const firstUser = users[0].login;
    const secondUser = users[1].login;
    const thirdUser = users[2].login;

    const loadUser = user => {
      return new Promise((resolve, reject) => {
        resolve(
          loadUserDetails(user)
            .then(data => {
              topUsers.push(data);
            })
            .catch(error => {
              console.log(error);
            })
        );
      });
    };

    const loadRepos = user => {
      return new Promise((resolve, reject) => {
        resolve(
          loadUserRepos(user)
            .then(data => {
              let mostStarredRepos = data.slice(0, 3);
              mostStarredRepos = mostStarredRepos.sort((a, b) => Number(b.stargazers_count) - Number(a.stargazers_count));

              topRepos.push(mostStarredRepos);
            })
            .catch(error => {
              console.log(error);
            })
        );
      });
    };

    Promise.all([loadUser(firstUser), loadRepos(firstUser), loadUser(secondUser), loadRepos(secondUser), loadUser(thirdUser), loadRepos(thirdUser)]).then(result => {
      let trendingUsers = [];

      topUsers.sort((a, b) => Number(b.followers) - Number(a.followers));

      for (let i = 0; i < topUsers.length; i++) {
        if (!topUsers[i].public_repos) {
          trendingUsers.push({ userDetails: topUsers[i], repos: [] });
        } else {
          for (let j = 0; j < topRepos.length; j++) {
            if ((topRepos[j][0] && topRepos[j][0].owner.login) === topUsers[i].login) {
              trendingUsers.push({ userDetails: topUsers[i], repos: topRepos[j] });
            }
          }
        }
      }

      this.setState({
        trendingUsers,
        loaded: true
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Trending Users</h2>
        <div className="row">
          {this.state.loaded &&
            this.state.trendingUsers.map(user => (
              <div className="col-sm" key={user.userDetails.id}>
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default TrendingUsers;
