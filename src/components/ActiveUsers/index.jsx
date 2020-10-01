import React, { Component } from 'react';
import UserCard from './../userCard';
import { loadUserDetails, loadUserRepos } from './../../services/github';

class ActiveUsers extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      activeUsers: []
    };
  }

  componentDidMount() {
    let topUsers = [];
    let topRepos = [];

    const users = this.props.activeUsers;

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
      let activeUsers = [];

      topUsers.sort((a, b) => Number(b.public_repos) - Number(a.public_repos));

      for (let i = 0; i < topUsers.length; i++) {
        if (!topUsers[i].public_repos) {
          activeUsers.push({ userDetails: topUsers[i], repos: [] });
        } else {
          for (let j = 0; j < topRepos.length; j++) {
            if ((topRepos[j][0] && topRepos[j][0].owner.login) === topUsers[i].login) {
              activeUsers.push({ userDetails: topUsers[i], repos: topRepos[j] });
            }
          }
        }
      }

      this.setState({
        activeUsers,
        loaded: true
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Active Users</h2>
        <div className="row">
          {this.state.loaded &&
            this.state.activeUsers.map(user => (
              <div className="col-sm" key={user.userDetails.id}>
                <UserCard user={user} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ActiveUsers;
