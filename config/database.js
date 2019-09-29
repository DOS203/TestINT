if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI:
        'mongodb://newdown:newdown1234@ds263927.mlab.com:63927/heroku_fw9f58vn'}

}else{
    module.exports = {mongoURI: 'mongodb://users:usertest1@ds157946.mlab.com:57946/heroku_tlms4x2k'}

}