import { FETCH_USER_SUCCESS, STORE_APP_DETAIL, FETCH_USER_FAILURE, STORE_STATS_DETAIL, STORE_PREVEIW_DETAIL, FETCH_USER_REQUEST, STORE_PLATFORM, FETCH_NOTIFICATIONS, STORE_DURATION } from '../constants'
import axios from 'axios'

export const fetchUsers = (url) => {
    
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.post(url)
            .then(response => { dispatch(fetchUserSuccess(response.data)) })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}
export const fetchSubscribeUsers = (url) => {
    return (dispatch) => {
        axios.post(url)
            .then(response => { dispatch(storeNotifications(response.data)) })
            .catch(error => {
                console.log(error)
            })
    }
}
export const storeNotifications = (data) => {
    return {
        type: FETCH_NOTIFICATIONS,
        data: data
    }
}
export const fetchUserSuccess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        data: data
    }
}
export const fetchUserFailure = (message) => {
    return {
        type: FETCH_USER_FAILURE,
        error: message
    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}
export const fetchAppDetail = (url) => {
    return (dispatch) => {
        axios.post(url)
            .then(response => { dispatch(storeAppDetail(response.data)) })
            .catch(error => {
                console.log(error)
            })
    }
}
export const storeAppDetail = (payload) => {
    return {
        type: STORE_APP_DETAIL,
        payload: payload
    }
}

export const storeDuration = (duration) => {
    return {
        type: STORE_DURATION,
        duration: duration
    }
}
export const storePlatform = (platform) => {
    return {
        type: STORE_PLATFORM,
        platform: platform
    }
}

export const storeStatsDetail = (delivered, clicked, failed, error) => {
    return {
        type: STORE_STATS_DETAIL,
        payload: {
            delivered: delivered,
            clicked: clicked,
            failed: failed,
            error: error
        }
    }
}

export const storePreviewDetail = (payload) => {
    return {
        type: STORE_PREVEIW_DETAIL,
        payload: payload
    }
}