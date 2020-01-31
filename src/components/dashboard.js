import React, { Component } from 'react';
import '../css/style.css';
import Nav from './childComponent/navbar';
import StatsTile from './childComponent/statusTile';
import PushDetails from './childComponent/pushDetails';
import PushStats from './childComponent/pushStates';
import { connect } from 'react-redux';
import { fetchUsers, fetchSubscribeUsers, fetchAppDetail } from '../store/userData';
import * as moment from 'moment';
var globlelineGraph = [];
export class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: localStorage.username,
            email: localStorage.email
        }
    }

    componentDidMount() {
        let url_app = "api/OneSignal/user-app"
        let url_player = "api/OneSignal/user-players"
        let url_subscribe = "api/OneSignal/user-subscribe"
        this.props.fetchData(url_player)
        this.props.fetchAppDetail(url_app)
        this.props.fetchNotification(url_subscribe)
    }
    getHours = () => {
        let start = moment().subtract(1, 'day').format('LLL')
        let end = moment().format('LLL')
        let hours = []
        let dt = moment(start).format('LLL')
        while (dt < end) {
            hours.push(dt)
            dt = moment(dt).add(1, 'hour').format('LLL')
        }
        console.log("hours",hours)
    }
    getDeviceName = (device_id, chrome, firefox, edge) => {
        let platformobj = {};
        switch (device_id) {
            case 5:
                chrome++;
                break;
            case 8:
                firefox++;
                break;
            default:
                edge++;
                break;
        }

        platformobj.chrome = chrome;
        platformobj.firefox = firefox;
        platformobj.edge = edge;
        return platformobj;
    }

    getSubscribers = (filterby, jsondata) => {

        let chrome = 0;
        let firefox = 0;
        let edge = 0;
        let lineGraph = [];

        var set = new Set()

        jsondata.map((el, id) => {

            switch (filterby) {
                case "past_month":
                    let myObj = JSON.parse(el.created_at),
                        myDate = new Date(1000 * myObj);
                    let str = myDate.toDateString();
                    if (!set.has(str)) {
                        set.add(str);
                        lineGraph.push({ "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, chrome, firefox, edge) });
                    }
                    else {
                        const existingIndex = lineGraph.findIndex(p => p.createdate === str);
                        if (existingIndex > -1) {
                            const updatedObject = { "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, lineGraph[existingIndex].platform.chrome, lineGraph[existingIndex].platform.firefox, lineGraph[existingIndex].platform.edge) };

                            lineGraph[existingIndex] = updatedObject;
                        }
                    }
                    break;
                case "past_day":
                    let daymyObj = JSON.parse(el.created_at),
                        daymyDate = new Date(1000 * daymyObj);
                    let daystr = daymyDate.toDateString();
                    if (!set.has(daystr)) {
                        set.add(daystr);
                        lineGraph.push({ "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, chrome, firefox, edge) });
                    }
                    else {
                        const existingIndex = lineGraph.findIndex(p => p.createdate === daystr);
                        if (existingIndex > -1) {
                            const updatedObject = { "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, lineGraph[existingIndex].platform.chrome, lineGraph[existingIndex].platform.firefox, lineGraph[existingIndex].platform.edge) };

                            lineGraph[existingIndex] = updatedObject;
                        }
                    }
                    break;
                default:
                    let yearObj = JSON.parse(el.created_at),
                        yearDate = new Date(1000 * yearObj);
                    let yearstr = yearDate.toDateString();
                    if (!set.has(yearstr)) {
                        set.add(yearstr);
                        lineGraph.push({ "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, chrome, firefox, edge) });
                    }
                    else {
                        const existingIndex = lineGraph.findIndex(p => p.createdate === yearstr);
                        if (existingIndex > -1) {
                            const updatedObject = { "createdate": myDate.toDateString(), platform: this.getDeviceName(el.device_type, lineGraph[existingIndex].platform.chrome, lineGraph[existingIndex].platform.firefox, lineGraph[existingIndex].platform.edge) };

                            lineGraph[existingIndex] = updatedObject;
                        }
                    }
                    break;
            }
        });

        console.log(lineGraph);
        return lineGraph;

    }

    componentWillReceiveProps(nextProps) {
        this.getHours()
        if (nextProps.playerData) {
            if (nextProps.playerData.data) {
                if (nextProps.playerData.data.players) {

                    
                    globlelineGraph = this.getSubscribers("past_month", nextProps.playerData.data.players);
                   
                    //console.log('globlelineGraph---', nextProps.playerData.data.players);

                    //console.log('Match-->', el.created_at);
                    //nextProps.playerData.data.players.map((el, id) => {


                    //    const currentdatetime = new Date().getTime();
                    //    console.log('today -- ', currentdatetime, " actual : ", new Date(currentdatetime));

                    //    const yesterdaydatetime = Math.round(new Date().getTime() / 1000);
                    //    const tsYesterday = yesterdaydatetime - (24 * 3600);

                    //    let yesObj = JSON.parse(tsYesterday),
                    //        yesDate = new Date(1000 * yesObj).getTime();

                    //    console.log('Yesterday ---:', yesDate, " actual : ", new Date(yesDate));

                    //    let matchObj = JSON.parse(el.created_at),
                    //        matchDate = new Date(1000 * matchObj).getTime();
                    //    console.log('Match---', matchDate, " actual : ", new Date(matchDate));

                    //    if ((matchDate <= yesDate && matchDate >= currentdatetime)) {
                    //        console.log('ander hai', el.created_at);
                    //    }

                    //});


                    //console.log('players---', nextProps.playerData.data.players);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <Nav username={this.state.username} email={this.state.email} />
                <section className="page-content">
                    <h2 className="page-title">Dashboard</h2>
                    <StatsTile />
                    <div className="main-content">
                        {
                            (this.props.graphDetail) ? <PushDetails platform={this.props.graphDetail} device={globlelineGraph} /> : <div className='loader'></div>
                        }

                        <PushStats />
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notificationData.data.notifications,
        graphDetail: state.appDetail,
        playerData: state.playerData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchUsers(url)),
        fetchNotification: (url) => dispatch(fetchSubscribeUsers(url)),
        fetchAppDetail: (url) => dispatch(fetchAppDetail(url))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(dashboard)