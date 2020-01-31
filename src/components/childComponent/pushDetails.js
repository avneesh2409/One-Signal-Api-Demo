import React, { Component } from 'react';
import '../../css/style.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LineGraph } from './Graph';
import { storePlatform, storeStatsDetail } from '../../store/userData/index'
import Loader from './loader';
var messages = null
export class pushDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }
    onChangeHandler = (e) => {
        this.props.storePlatform(e.target.value)
    }
    clickHandler = (id) => {
        //let statsDetail = this.props.statsDetail
        let notifications = this.props.notifications
        let notify = notifications.find(x => x.id === id);
        let clicked = notify.converted
        let delivered = notify.successful
        let failed = notify.failed
        let error = notify.errored
        clicked = ((clicked / delivered) * 100).toFixed(2)
        this.props.storeStatsDetail(delivered, clicked, failed, error)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications !== this.props.notifications) {
            messages = nextProps.notifications.map((message, i) => {
                const msgDate = (message.data != null ? message.data.send_date : "");
                return (

                    <ul className='message-list' key={i} id={message.id} onClick={() => this.clickHandler(message.id)}>
                        <li className='message'><strong>{message.contents.en}</strong><p>{msgDate}</p></li>
                    </ul>
                )

            })
        }
        this.setState({
            platform: this.props.platform,
            device: this.props.device
        })
    }


    render() {



        return (
            <div className="push-details">
                <select onChange={this.onChangeHandler}>
                    <option value="25" >All Platforms</option>
                    <option value="12">Edge</option>
                    <option value="5">Google Chrome</option>
                    <option value="8">Firefox</option>
                </select>
                <div className='graph' >
                    {
                        (this.state.platform && this.state.device) ? <LineGraph platform={this.state.platform} device={this.state.device} /> : <Loader />
                    }
                </div>
                <div className="message-section"  >
                    <h2 className="page-title">Messages</h2>
                    <Link to='/new-push'><button className="new-push" >New Push</button></Link>
                    <Scrollbars style={{ height: 600 }} autoHide autoHideTimeout={1000}>
                        {(messages) ? messages : <Loader />}
                    </Scrollbars>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        notifications: state.notificationData.data.notifications,
        statsDetail: state.notificationData.payload,
        duration: state.appDetail.duration,
        graphDetail: state.appDetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storePlatform: (platform) => dispatch(storePlatform(platform)),
        storeStatsDetail: (delivered, clicked, failed, error) => dispatch(storeStatsDetail(delivered, clicked, failed, error))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(pushDetails)
