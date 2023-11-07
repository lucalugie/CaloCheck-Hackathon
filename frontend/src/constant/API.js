const API ={
        "api": `${process.env.REACT_APP_BASE_URL}/api/`,
        "updateUser": `${process.env.REACT_APP_BASE_URL}/users/PersonalInformations`,
        "getTokenByLIFF": `${process.env.REACT_APP_BASE_URL}/api/getTokenByLIFF/`,
        "sendMessage": `${process.env.REACT_APP_BASE_URL}/api/sendMessage/`,
    }

module.exports = API