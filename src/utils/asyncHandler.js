const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        return Promise.resolve(requestHandler(req,res,next)).catch((err) =>next(err))
    }
}
export {asyncHandler}

//const asyncHandler = () => {}
//const asyncHandler = (func) => {=> {}}
//const asyncHandler = (func) => () => {}//removing the curly braces from the above line would result in the current line's code.

// const asyncHandler = (func) => async(req,res,next) => {
//     try{
//        await func(req,res,next);
//     }catch(err){
//         req.status(err.code || 500).json({
//             sucess: false,
//             message: err.message
//         })
//     }
// }