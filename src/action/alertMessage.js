import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Msg = (props) => {
    return (
        <div>
            <span>{props.message}</span>
        </div>
    )
}
export const notify = (message,type) => {
toast(<Msg message={message} />, {
        position: toast.POSITION.TOP_RIGHT,
        className: (type) ? 'text-success' : 'text-danger',
        delay: 0,
        autoClose:2000
    });
};
