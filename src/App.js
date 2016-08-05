import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getUserData } from './helpers/api';

export default class App extends Component {
  constructor(props) {
       super(props);
       this.state = {
           username: '',
           loading: false,
       };
   }

   handleSubmit = (event) => {
     event.preventDefault();
     this.setState({loading: true});
     const username = this.state.username;

     if (username) {
       getUserData(username)
        .then((response) => {
          this.setState({
            userData: response,
            loading: false
          });
        });
      } else {
        this.setState({
          userData: {},
          loading: false
        });
      }
   }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Get github user info</h2>
          <div className="App-form">
            <input type="text" onChange={(event) => {
              this.setState({username: event.target.value});
            }}/>
            <button type="submit" onClick={this.handleSubmit}>Procurar</button>
          </div>
        </div>
        <div className="App-intro">
          {this.state.loading && <img src={logo} className="App-logo" alt="Carregando" />}
          {! this.state.loading && this.state.userData && <UserInfo data={this.state.userData} />}
        </div>
      </div>
    );
  }
}


class UserInfo extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (data.login &&
      <div>
        {data.avatar_url  && <img src={data.avatar_url} alt={data.login} width="100" />}
        <p>Usuário: {data.login}</p>
        <p>Repositórios Públicos: {data.public_repos}</p>
        <p>Seguidores: {data.followers}</p>
        <p>Seguindo: {data.following}</p>
      </div>
    ) || <p>Usuário não encontrado.</p>;
  }
}
