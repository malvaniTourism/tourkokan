import {
    SaveAccess_token,
    SaveLoginUser,
    SetDestination,
    SetLoader,
    SetSource,
} from "./Types";

const saveLoginUser = (data) => {
    return {
        type: SaveLoginUser,
        payload: data,
    };
};

const saveAccess_token = (data) => {
    return {
        type: SaveAccess_token,
        payload: data,
    };
};

const setLoader = (data) => {
    return {
        type: SetLoader,
        payload: data,
    };
};

const setSource = (data) => {
    return {
        type: SetSource,
        payload: data,
    };
};

const setDestination = (data) => {
    return {
        type: SetDestination,
        payload: data,
    };
};

export {
    saveLoginUser,
    saveAccess_token,
    setLoader,
    setSource,
    setDestination,
};
