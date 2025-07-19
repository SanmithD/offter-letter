
export const errorFunction = (code, success, msg, res) =>{
    return res.status(code).json({
        success,
        message: msg
    });
}