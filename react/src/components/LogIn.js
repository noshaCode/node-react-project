// import React from 'react'

// export default function LogIn() {
//   return (
//     <div>Log in</div>
//   )
// }




import React, { Component } from 'react';
import axios from 'axios';

export default class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      result: ''
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post("http://localhost:4000/login", data)
          .then( response => {
            let token = response.data.token;
            localStorage.setItem('user', token)
            /////////////////////////////////////////////
            this.props.history.push('/')
          })
          .catch( err => {
            this.setState({ result: err.response.data })
          })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='email' type="text" placeholder='email' onChange={this.handleChange} />
          <input name='password' type="password" placeholder='password' onChange={this.handleChange} />
          <input type="submit" value='Log in'  onSubmit={this.handleSubmit} />
        </form>
        { this.state.result ? this.state.result : null }
      </div>
    )
  }
}

