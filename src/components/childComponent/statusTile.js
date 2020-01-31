import React, { Component } from 'react';
import '../../css/style.css';
import {connect} from 'react-redux';
import * as moment from 'moment';
import Loader from './loader';
import Tooltip from './tooltip';

export class statusTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribed_user: 0,
            total_user: 0,
            monthly_user:0
        }
    }
    calculate_monthly_user = (players) => {
        let upperBound = new Date().getTime()
        let lowerBound = moment().subtract(1, 'month').format('x');
        let refer_ml = moment([new Date().getFullYear()]).format('x');
        let counter = 0
        
            if (players) {
                players.map((e, key) => {
                    let ml = e.last_active;
                    let active_ml = parseInt(refer_ml, 10) + ml;
                    if (upperBound > active_ml && active_ml > lowerBound) {
                        counter = counter + 1;
                    }
                })
        }
        this.setState({
            monthly_user:counter
        })
      
    }
    componentWillReceiveProps(nextProps) {
        
        this.setState({
            subscribed_user: nextProps.subscribed_user,
            total_user: nextProps.total_user
        })
        if (nextProps.players !== this.props.players) {
           
            this.calculate_monthly_user(nextProps.players.players)
        }
    }
  
    render() {
        
        return (
            <div>
                <div className="stats">
                    <div className="stats-tile">
                        <Tooltip item = "subscribed_user"/>
                        <label>Subscribed User</label>
                        <div className="numbers">{(this.state.subscribed_user) ? this.state.subscribed_user :<Loader />}</div>
                    </div>
                    <div className="stats-tile">
                        <Tooltip item="monthly_user"/>
                       
                        <label>Monthly Active Users</label>
                        <div className="numbers">{(this.state.monthly_user) ? this.state.monthly_user : <Loader />}</div>
                    </div>
                    <div className="stats-tile">
                        <Tooltip item="total_user"/>
                      
                        <label>Total Users</label>
                        <div className="numbers">{(this.state.total_user)?this.state.total_user:<Loader />}<small></small></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        total_user:state.playerData.data.total_count,
        subscribed_user: state.appDetail.payload.messageable_players,
        players:state.playerData.data
    }
}
export default connect(mapStateToProps,null)(statusTile)
