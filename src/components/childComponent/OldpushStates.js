import React, { Component } from 'react';
import '../../css/style.css';
import { connect } from 'react-redux';
import { storeDuration } from '../../store/userData';
import { PieChart } from './Graph';

export class pushStates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            duration:null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    onChangeHandler = (e) => {
        this.props.storeDuration(e.target.value)
    }
 
    render() {
        let delivered  = 0
        let clicked = 0
        let error = 0
        let failed = 0
       
        if(this.props.notifications)
        {
            if(this.props.notifications.data.notifications)
            {
                delivered = this.props.notifications.data.notifications[0].successful
                error = this.props.notifications.data.notifications[0].errored
                failed = this.props.notifications.data.notifications[0].failed
                clicked = this.props.notifications.data.notifications[0].converted
                clicked = ((clicked / delivered) * 100).toFixed(2)
            }
        }
        return (
        <div className="push-stats">
                <select onChange={this.onChangeHandler}>
                    <option value="past_month">Past Month</option>
                    <option value="past_day">Past Day</option>
                    <option value="past_year">Past Year</option>
                </select>
                <div className="grey-card m-b-13">
                    <div className="message-period">
                        <div className="percent">
                            <label>(+0)</label>
                            <div className="numbers">+0.00%</div>
                        </div>
                        <div className="total">
                            <label>Total</label>
                            <div className="numbers">{this.props.total_user}<small></small></div>
                        </div>
                    </div>
                </div>
                <div className="grey-card">
                    <div className="message-selected">
                        <div className="delivered">
                            <label>Delivered</label>
                            <div className="numbers">{(delivered)?delivered:<div className='loader'></div>}</div>
                        </div>
                        <div className="clicked">
                            <label>clicked</label>
                                <div className="numbers">{(clicked)?clicked:<div className='loader'></div>}%</div>
                        </div>
                    </div>
                </div>
                <div className="grey-card">
                    <div className="delivery-stats">
                        <span>Delivery Statistics</span>
                    </div>
                    {(delivered) ?
                        <PieChart delivered={delivered} failed={failed} error={error} /> :
                        <div className='loading'></div>
                    }
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeDuration: (duration) => dispatch(storeDuration(duration))
    }
}
const mapStateToProps = (state) => {
    return {
        notifications: state.notificationData,
        total_user: state.playerData.data.total_count,
        playerData: state.playerData
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(pushStates)
