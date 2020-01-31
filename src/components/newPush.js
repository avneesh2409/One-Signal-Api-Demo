import React, { Component } from 'react';
import '../css/style.css';
import Nav from './childComponent/navbar';
import NewPush from './childComponent/newPushDetails';
import PushPreview from './childComponent/pushPreview';

export class newPush extends Component {
    render() {
        return (
            <div>
            <div>
                <Nav />
                    <section className="page-content">
                        <h2 className="page-title">New Message</h2>
                        <div className="new-message">
                <NewPush />
                <PushPreview />
                </div>
                </section>
            </div>
        </div>
        )
    }
}

export default newPush
