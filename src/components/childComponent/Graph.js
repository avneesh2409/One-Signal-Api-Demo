import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ReferenceDot } from 'recharts';
import * as moment from 'moment';


export class LineGraph extends Component {
    constructor(Props) {
        super(Props)
        this.state = {
            data: null
        }
    }
    componentWillReceiveProps(records) {
        if (records.platform !== this.props.platform) {
            let statePoints = []
            let data = []
            let count = 0
            let duration = this.props.platform.duration
            let platform = this.props.platform.platform
            console.log('Graph--', this.props.device);
            const monthData = this.props.device.length > 0 ? this.props.device : [];
            switch (duration) {
                case "past_day":
                    data = [{
                        createdate: "January 27, 2020 11:45 AM", platform: { chrome: 1, edge: 0, firefox: 1 }
                    }, {
                        createdate: "January 27, 2020 12:45 PM", platform: { chrome: 1, edge: 0, firefox: 2 }
                    },
                    {
                        createdate: "January 27, 2020 1:45 PM", platform: { chrome: 2, edge: 0, firefox: 0 }
                    },
                    {
                        createdate: "January 27, 2020 2:45 PM", platform: { chrome: 0, edge: 1, firefox: 1 }
                    },
                    {
                        createdate: "January 27, 2020 3:45 PM", platform: { chrome: 1, edge: 1, firefox: 1 }
                    },
                    {
                        createdate: "January 27, 2020 4:45 PM", platform: { chrome: 1, edge: 2, firefox: 2 }
                    },
                    {
                        createdate: "January 27, 2020 5:45 PM", platform: { chrome: 1, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "January 27, 2020 6:45 PM", platform: { chrome: 1, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "January 27, 2020 7:45 PM", platform: { chrome: 1, edge: 2, firefox: 1 }
                    },
                    {
                        createdate: "January 27, 2020 8:45 PM", platform: { chrome: 0, edge: 1, firefox: 1 }
                    },
                    {
                        createdate: "January 27, 2020 9:45 PM", platform: { chrome: 0, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "January 27, 2020 10:45 PM", platform: { chrome: 0, edge: 2, firefox: 1 }
                    },
                    {
                        createdate: "January 27, 2020 11:45 PM", platform: { chrome: 1, edge: 1, firefox: 0 }
                    }]
                    break;
                case "past_month":
                    data = monthData;
                    break;
                case "past_year":
                    data = [{
                        createdate: "January 28, 2019 11:52 AM", platform: { chrome: 1, edge: 0, firefox: 2 }
                    },
                    {
                        createdate: "February 28, 2019 11:52 AM", platform: { chrome: 2, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "March 28, 2019 11:52 AM", platform: { chrome: 0, edge: 1, firefox: 2 }
                    },
                    {
                        createdate: "May 28, 2019 11:52 AM", platform: { chrome: 1, edge: 2, firefox: 1 }
                    },
                    {
                        createdate: "June 28, 2019 11:52 AM", platform: { chrome: 1, edge: 0, firefox: 0 }
                    },
                    {
                        createdate: "July 28, 2019 11:52 AM", platform: { chrome: 1, edge: 0, firefox: 0 }
                    },
                    {
                        createdate: "August 28, 2019 11:52 AM", platform: { chrome: 1, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "September 28, 2019 11:52 AM", platform: { chrome: 1, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "October 28, 2019 11:52 AM", platform: { chrome: 0, edge: 1, firefox: 0 }
                    },
                    {
                        createdate: "November 28, 2019 11:52 AM", platform: { chrome: 0, edge: 0, firefox: 0 }
                    },
                    {
                        createdate: "December 28, 2019 11:52 AM", platform: { chrome: 0, edge: 0, firefox: 0 }
                    }]
                    break;
                default:
            }
            if (data) {
                switch (platform) {
                    case "5":
                        count = 0
                        data.map(e => {
                            count = count + e.platform.chrome
                            statePoints.push({ dates: moment(e.createdate).format('LLL'), subscriber: count })
                        })

                        break;
                    case "8":
                        count = 0
                        data.map(e => {
                            count = count + e.platform.firefox
                            statePoints.push({ dates: moment(e.createdate).format('LLL'), subscriber: count })
                        })
                        break;
                    case "12":
                        count = 0
                        data.map(e => {
                            count = count + e.platform.edge
                            statePoints.push({ dates: moment(e.createdate).format('LLL'), subscriber: count })
                        })
                        break;
                    default:
                        count = 0
                        data.map(e => {
                            count = count + e.platform.chrome + e.platform.firefox + e.platform.edge
                            statePoints.push({
                                dates: moment(e.createdate).format('LLL'), subscriber: count
                            })
                        })

                }
            }
            this.setState({
                data: statePoints
            })

        }

    }
    render() {
        return (
            <div>
                {
                    (this.state.data) ?

                        <AreaChart width={568} height={145} data={this.state.data} margin={{ top: 10, right: 0, left: 0, bottom: 0, }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="dates" hide={true} />
                            <YAxis hide={true} />
                            <CartesianGrid strokeDasharray="5 5" vertical={false} horizontal={false} />
                            <Tooltip active="true" />

                            <Area type="monotone" dataKey="subscriber" stackId="1" stroke="#8884d8" fillOpacity={20} fill="url(#colorPv)" activeDot={{ r: 4 }} dot={true} />


                        </AreaChart>

                        : <h6>Loading</h6>
                }
            </div >
        )
    }
}

export class PieChart extends Component {


    render() {
        const state = [this.props.delivered, this.props.failed, this.props.error];
        const labels = ['Delivered ' + state[0], 'Failed ' + state[1], 'Error ' + state[2]]
        const colors = ['blue', 'red', 'green']
        return (
            <div>
                <Pie

                    data={{

                        labels: labels,
                        datasets: [{
                            data: state,
                            backgroundColor: colors,
                            borderColor: ['white', 'white', 'white'],
                            borderColor: [4, 2, 2]
                        }]
                    }}
                    options={{
                        responsive: true,
                        legend: {
                            position: 'right',
                        }
                    }}
                />
            </div >
        )
    }
}
