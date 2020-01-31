import React, { Component } from 'react'
import Logo from '../../img/logo.png';
import UserIcon from '../../img/user-icon.svg';
import '../../css/style.css';

class navbar extends Component {


    constructor(props) {
        super(props)
        this.state = {
            username: localStorage.username,
            email: localStorage.email
        }
    }

    logout = (e) => {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return (
            <nav>
                <div className="page-content">
                    <div className="logo"><img src={Logo} alt="" /></div>
                    <div className="user-info">
                        <span className="user-name">Hi, {this.state.username}</span>
                        <span className="user-avatar">
                            <i className="material-icons">account_circle</i>
                            <div className="account-dropdown">
                                <div className="flex p-20 v-align">
                                    <div className="avatar-pic">
                                        <img src={UserIcon} alt="" />
                                        <div className="change-pic">{this.state.username}</div>
                                    </div>
                                    <div className="user-details">
                                        <span className="user-name">{this.state.email}</span>
                                        <span className="user-mail">{this.state.username}</span>
                                    </div>
                                </div>
                                <div className="dropdown-footer">
                                    <button className="sign-out" onClick={() => { this.logout() }}>Sign Out</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default navbar
