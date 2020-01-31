import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../css/style.css';
import { connect } from 'react-redux';
import { notify } from '../../action/alertMessage';
export class pushPreview extends Component {
    render() {
        return (

            <div className="push-preview-section">
                <button className="back-to-home" onClick={() => window.location.href = '/'}>Return To Main Page </button>
                <div className="push-preview">
                        <div className="advertise-block flex">
                            
                        <div className="bgImg" >
                            {(this.props.previewDetail && this.props.previewDetail.imageFile) ?
                                    <img src={this.props.previewDetail.imageFile} className="bgimgwd" alt='unable to load ' />
                                    :
                                    null
                                }
                                </div>
                                <div className="adverties-bottom flex">
                            <span className="samll-icon">
                                {(this.props.previewDetail && this.props.previewDetail.iconFile) ?
                                    <img src={this.props.previewDetail.iconFile} alt='unable to load' />
                                    :
                                    null
                                }      
                                    </span>
                                    <div className="detail-block">
                                {(this.props.previewDetail && (this.props.previewDetail.title || this.props.previewDetail.message)) ?
                                    <Fragment>
                                        <label> {this.props.previewDetail.title} </label>
                                        <div className="text-content">{this.props.previewDetail.message} </div>
                                    </Fragment>
                                    :null
                                        }
                                       
                                    </div>

                                </div>
                        <div className="field">
                            <button className="send-btn" onClick={() => { (this.props.previewDetail && this.props.previewDetail.url) ? window.open(this.props.previewDetail.url, '_blank') : notify("please enter the url field", false) }}>Get going</button>
                                </div>
                            
                        </div>
                </div>

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        previewDetail: state.playerData.payload
    }
}
export default connect(mapStateToProps, null)(pushPreview)
