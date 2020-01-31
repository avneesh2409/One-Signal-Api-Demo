import React from 'react'
import './tooltip.module.css'
import { Image } from './image';
const Tooltip = (props) => {
        let  message = ''
        switch (props.item) {
            case "subscribed_user":
                message =  'This number is a count of devices who have opted-in and can receive your messages.' +
                        'The number of subscribed devices may decrease after sending messages,' +
                        ' because sending messages is one of the methods we use to detect unsubscribed devices and users who have uninstalled your app.'
   
                break;
            case "monthly_user":
                
                message =  'An estimate of the number of users who have used your app in the last 30 days. Examples of activity include opening a notification,'
                        + ' opening the app, and receiving tags from the app.' +
                        'Devices that receive notifications or tag updates from the API but are otherwise inactive are not included in this count.'
               

                break;
            case "total_user":
               message = 'All devices that have ever subscribed to your website or opened your mobile app with the OneSignal SDK active.'
                        + ' Also counts all email records provided to OneSignal.' +
                        ' This number will never decrease even if users uninstall your app or unsubscribe from your messages.'

                break;
        }

    return (
        <div className="tooltip">
            <Image />
            <div className="right">
                <div className="text-content">
                    {message}
                </div>
                <i></i>
            </div>
        </div>
        )
}

export default Tooltip