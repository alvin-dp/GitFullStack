const ACTION_INCREMENT = 'ACTION_INCREMENT'
const ACTION_DECREMENT = 'ACTION_DECREMENT'
const ACTION_INCREMENT_ABOUT = 'ACTION_INCREMENT_ABOUT'
const ACTION_DECREMENT_ABOUT = 'ACTION_DECREMENT_ABOUT'
const types={ACTION_INCREMENT,ACTION_DECREMENT,ACTION_INCREMENT_ABOUT,ACTION_DECREMENT_ABOUT}

function incrementCounter(payload=1){
    return {
        type:ACTION_INCREMENT,
        payload
    }
}

function decrementCounter(payload=1){
    return {
        type:ACTION_DECREMENT,
        payload
    }
}
function incrementCounterAbout(payload=1){
    return {
        type:ACTION_INCREMENT_ABOUT,
        payload
    }
}
function decrementCounterAbout(payload=1){
    return {
        type:ACTION_DECREMENT_ABOUT,
        payload
    }
}

export {incrementCounter,decrementCounter,incrementCounterAbout,decrementCounterAbout,types}