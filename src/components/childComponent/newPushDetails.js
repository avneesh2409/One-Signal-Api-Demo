import axios from 'axios';
import React, { Component } from 'react';
import '../../css/style.css';
import { connect } from 'react-redux';
import { storePreviewDetail } from '../../store/userData';
import { notify } from '../../action/alertMessage';
require('dotenv').config()

class newPushDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            message: '',
            imageFile: '',
            iconFile: '',
            url: ''
        }
    }

    onChangeHandler = (e) => {
        if (e.target.name === 'imageFile') {
            this.setState({
                [e.target.name]: e.target.files[0].name
            })
            let imageFile = this.imageHandler(e.target.files[0].type, e.target.files[0])

            //if (imageFile) {
            //    this.setState({
            //        imageFile
            //    })
            //}
            //else {
            //    notify("Image file not supported ! please select jpg image file only", false)
            //}


        }
        else if (e.target.name === 'iconFile') {
            this.setState({
                [e.target.name]: e.target.files[0].name
            })
            let iconFile = this.iconHandler(e.target.files[0].type, e.target.files[0])

            //if (iconFile) {
            //    this.setState({
            //        iconFile
            //    })
            //}
            //else {
            //    notify("Icon file not supported ! please select a icon in png format", false)
            //}

        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    }



    getImageUrl = (fileName) => {
        var formData = new FormData();
        formData.append("file", fileName);
        axios.post('api/account/upload-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.result) {
                console.log('Image : ', response.data.result);
                this.setState({ imageFile: response.data.result });
                let result = response.data.result;
                return result;
            }
            else {
                alert(response.data.error);
            }
        });
    }

    getIconUrl = (fileName) => {
        var formData = new FormData();
        formData.append("file", fileName);
        axios.post('api/account/upload-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.result) {
                console.log('Icon : ', response.data.result);
                this.setState({ iconFile: response.data.result });
                return response.data.result;
            }
            else {
                alert(response.data.error);
            }
        });
    }
    onSubmitHandler = (e) => {


        let data = {
            Title: this.state.message,
            Message: this.state.title,
            Launchurl: this.state.url,
            icon: this.state.iconFile,
            Image: this.state.imageFile,
        }
        console.log(data);
        axios.post('api/OneSignal/push-notifications', data).then((response) => {
            this.setState({ message: "", title: "", url: "" });
            notify("successfully sent", true);
           
        });
    }
    previewHandler = () => {
        this.props.storePreviewDetail(this.state)
    }


    imageHandler = (imageType, imageName) => {
        let imageUrl = ''
        if (imageType === 'image/jpg' || imageType === 'image/jpeg') {
            this.getImageUrl(imageName);
            this.setState({
                checkImage: true
            })
            notify("image is successfully uploaded", true)
            return imageUrl
        }
        else {
            return null
        }
    }

    iconHandler = (iconType, iconName) => {
        let iconUrl = ''
        if (iconType === 'image/png') {
            this.getIconUrl(iconName);
            this.setState({
                checkIcon: true
            })
            notify("icon is successfully uploaded", true)
            return iconUrl
        }
        else {
            return null
        }
    }


    render() {
        return (
            <div className="new-push-details">
                <div className="field">
                    <label>Title</label>
                    <div className="field-control"><input type="text" name="title" placeholder="Title" onChange={this.onChangeHandler} /></div>
                </div>
                <div className="field">
                    <label>Message</label>
                    <div className="field-control"><textarea placeholder="Message" name="message" onChange={this.onChangeHandler}></textarea></div>
                </div>
                <div className="field">
                    <label>Image</label>
                    <div className="field-control upload"><input type="file" placeholder="Upload image" accept="image/*" name="imageFile" onChange={this.onChangeHandler} /></div>
                </div>
                <div className="field">
                    <label>Icon</label>
                    <div className="field-control upload"><input type="file" placeholder="Upload icon" accept="image/*" name="iconFile" onChange={this.onChangeHandler} /></div>
                </div>
                <div className="field">
                    <label>Launch url</label>
                    <div className="field-control url"><input type="text" name="url" placeholder="URL" onChange={this.onChangeHandler} /></div>
                </div>
                <div className="field">
                    <button className="send-btn" onClick={() => (this.state.IconFile !== '' && this.state.imageFile !== '') ? this.onSubmitHandler() : notify("enter the valid details image is in jpg and icon in png", false)}> Send </button>
                    <button style={{ marginLeft: '20px' }} className="send-btn" onClick={() => (this.state.IconFile !== '' && this.state.imageFile !== '') ? this.previewHandler() : notify("enter all the details please", false)}>Test Preview</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storePreviewDetail: (payload) => dispatch(storePreviewDetail(payload))
    }
}
export default connect(null, mapDispatchToProps)(newPushDetails)
