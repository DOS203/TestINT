if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI:
        'mongodb://users:Test123@ds157946.mlab.com:57946/heroku_tlms4x2k'}

}else{
    module.exports = {mongoURI: 'mongodb://127.0.0.1:27017/LocalDev'}

}