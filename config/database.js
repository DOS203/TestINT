if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI:
        'mongodb://dino:dino203@ds163517.mlab.com:63517/heroku_c4k6ns9h'}

}else{
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}

}