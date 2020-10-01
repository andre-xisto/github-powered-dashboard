import React, { Component } from 'react';
import TrendingUsers from './../components/TrendingUsers';
import ActiveUsers from './../components/ActiveUsers';
import TopRepositories from './../components/TopRepositories';
import { loadTrendingUsers, loadActiveUsers } from './../services/github';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      trendingUsers: [],
      activeUsers: []
    };
  }

  componentDidMount() {
    let trendingUsers = [];
    let activeUsers = [];

    loadTrendingUsers()
      .then(data => {
        trendingUsers = data.items.slice(0, 3);
      })
      .then(() => {
        loadActiveUsers()
          .then(data => {
            activeUsers = data.items.slice(0, 3);
          })
          .then(() => {
            this.setState({
              trendingUsers,
              activeUsers,
              loaded: true
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.loaded && (
          <div className="container">
            <TrendingUsers trendingUsers={this.state.trendingUsers} />
            <ActiveUsers activeUsers={this.state.activeUsers} />
            <TopRepositories />
          </div>
        )}
      </div>
    );
  }
}

export default HomeView;
