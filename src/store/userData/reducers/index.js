import { FETCH_USER_FAILURE, STORE_APP_DETAIL, FETCH_USER_SUCCESS, STORE_PREVEIW_DETAIL, STORE_STATS_DETAIL, STORE_PLATFORM, FETCH_USER_REQUEST, FETCH_NOTIFICATIONS, STORE_DURATION } from '../constants'


const initialState = {
    loading: false,
    error: '',
    data: [],
    payload: null
}

export const playerReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            }
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: action.message,
                loading: false
            }
        case STORE_PREVEIW_DETAIL:
            return {
                ...state,
                payload: action.payload
            }
        default: return state
    }
}
const initial = {
    data: [],
    payload: null
}
export const subscribeReducer = (state = initial, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                data: action.data
            }
        case STORE_STATS_DETAIL:
            return {
                ...state,
                payload: action.payload
            }
        default: return state
    }
}


const appInitial = {
    payload: [],
    platform: "all",
    duration: "past_month"
}

export const AppDetailReducer = (state = appInitial, action) => {
    switch (action.type) {
        case STORE_APP_DETAIL:
            return {
                ...state,
                payload: action.payload
            }
        case STORE_DURATION:
            return {
                ...state,
                duration: action.duration,
            }
        case STORE_PLATFORM:
            return {
                ...state,
                platform: action.platform
            }
        default: return state
    }
}

