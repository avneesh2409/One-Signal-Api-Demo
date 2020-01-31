import React, { Component } from 'react';
import '../../css/style.css';
import { connect } from 'react-redux';
import { storeDuration } from '../../store/userData';
import { PieChart } from './Graph';


export class pushStates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delivered: 0,
            clicked: 0,
            error: 0,
            failed:0
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }
    onChangeHandler = (e) => {
        this.props.storeDuration(e.target.value)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.statsDetail !== this.props.statsDetail) {
            console.log("from push states :-", nextProps.statsDetail)
            let delivered = nextProps.statsDetail.delivered
            let clicked = nextProps.statsDetail.clicked
            let error = nextProps.statsDetail.error
            let failed = nextProps.statsDetail.failed
            this.setState({
                delivered,
                clicked,
                error,
                failed
            })
        }
    }
    render() {
        let delivered = this.state.delivered
        let clicked = this.state.clicked
        let error = this.state.error
        let failed = this.state.failed
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
                            <div className="numbers">{delivered}</div>
                        </div>
                        <div className="clicked">
                            <label>clicked</label>
                            <div className="numbers">{clicked}%</div>
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
        playerData: state.playerData,
        statsDetail: state.notificationData.payload
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(pushStates)
