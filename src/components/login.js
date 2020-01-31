import React, { Component } from 'react'
import PushImage from '../img/push-icon.svg';
import LoginImage from '../img/login-illus.svg';
import '../css/style.css';
import axios from 'axios';
import Loader from './childComponent/loader';

class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isLoggedIn: false,
            email: ''
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.parseJwt = this.parseJwt.bind(this)
    }
    onSubmitHandler = async (e) => {
        e.preventDefault();
        let x = document.getElementById('spinner').classList
        x.add('spinner')
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('api/account/token', data).then((response) => {
            if (response.data.token) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    let data = this.parseJwt(response.data.token);
                    localStorage.setItem('username', data.sub);
                    localStorage.setItem('email', data.email);
                    this.setState({
                        username: data.sub,
                        email: data.email,
                        isLoggedIn: true
                    });
                    window.location.href = '/dashboard'
                }
            }
        });
    }
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {
                    (!this.state.isLoggedIn) ?
                        <section className="login-section">
                            <div className="login-form">
                                <img src={PushImage} className="push-icon" alt="" />
                                <h1>Sign In</h1>
                                <p>Hello there! Sign in and start managing your push account</p>
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className="field">
                                        <label>Login</label>
                                        <input type="text" placeholder="email id" name="username" value={this.state.username} onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="field">
                                        <label>Password</label>
                                        <input type="password" placeholder="password" value={this.state.password} name="password" onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="field text-center">
                                        <button className="login-btn" >SIGN IN</button><span id='spinner'></span>
                                    </div>
                                    <div className="field text-center">
                                        Forgot Password? <a href="/">Reset</a>
                                    </div>
                                </form>

                            </div>
                            <img src={LoginImage} alt="" />
                        </section>
                        :
                        <Loader />
                }
            </div>

        )
    }
}

export default login

