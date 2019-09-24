if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI:
        'mongodb://newdown:newdown1234@ds263927.mlab.com:63927/heroku_fw9f58vn'}

}else{
    module.exports = {mongoURI: 'mongodb://127.0.0.1:27017/LocalDev'}

}