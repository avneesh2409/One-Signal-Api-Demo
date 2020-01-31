import React, { Component } from 'react';
import '../../css/style.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { LineGraph } from './Graph';
import { storePlatform } from '../../store/userData/index'

export class pushDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success:0
        }
     
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    onChangeHandler = (e) => { 
            this.props.storePlatform(e.target.value)
    }

    render() {
        let dates = this.props.dates
        let subscriber = this.props.subscriber
        let messages = null
        if(this.props.notifications)
        {
            messages = this.props.notifications.map((message,key) => {
                    if(message.data)
                    {
                    return (
                        <ul className='message-list' key={key}>
                                        <li className='message'><strong>{message.contents.en}</strong><p>{message.data.send_date}</p></li>
                                    </ul>
                                )
                    }
                    else{
                        return null
                    }
                })
        }
        return (
            <div className="push-details">
                <select onChange={this.onChangeHandler}>
                    <option value = "all" >All Platforms</option>
                    <option value="edge_web_push">Edge</option>
                    <option value="chrome_web_push">Google Chrome</option>
                    <option value="firefox_web_push">Firefox</option>
                </select>
                <div className = 'graph' >
                    {
                        (dates) ? <LineGraph dates={dates} subscriber={subscriber} /> : <div className="loader" ></div>
                    }
                </div>
                <div className="message-section"  >
                    <h2 className="page-title">Messages</h2>
                    <Link to='/new-push'><button className="new-push" >New Push</button></Link>
                    <Scrollbars style={{ width: 500, height: 600 }} autoHide autoHideTimeout={1000}>
                            {(messages)?messages:null}
                    </Scrollbars>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        notifications: state.notificationData.data.notifications,
        duration: state.appDetail.duration,
        graphDetail: state.appDetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storePlatform: (platform) => dispatch(storePlatform(platform))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pushDetails)
