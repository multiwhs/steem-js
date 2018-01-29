// moment : http://momentjs.com/docs/

'use strict';

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var moment = require('moment');

// (2) 서버의 실행 : 3000포트에서 응답을 기다리고 있는다
app.listen(3000, function () {
    console.log("start express server on port 3000")
});

// (3) 미들웨어 사용 설정
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// (4) 템플릿 엔진 설정 
app.set('view engine', 'ejs')

// (5) 클라이언트의 요청이 왔을때 index.html의 정적파일을 보내준다.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')

//    res.writeHead(200, { 'Content-Type': 'text/plain' });
 //   res.end('Hello World\n');
})

var author = ["tradingideas"]


app.post('/postcontent', function (req, res) {
    var str = 'Welcome ';
    if (req.body.myName != "")
        author[0] = req.body.myName;

    console.log('Author : %s', author[0]);

    var steem = require('steem');
    steem.api.setOptions({ url: 'https://api.steemit.com' });

    var str = "";
    steem.api.getAccounts(author, function (err, result) {
        var now = moment();
        var last_time = moment.utc(result[0].last_vote_time); // last_vote_time : based on UTC

        var diffSecond = now.valueOf() - last_time.valueOf();
        diffSecond /= 1000

        var vpNow = result[0].voting_power + (10000 * diffSecond / 432000);

        vpNow = (vpNow / 100).toFixed(2)

        str += author + "   "  + vpNow + '%'
        res.send(str)
        console.log('Send : %s', str);
    })
})
/*
app.post('/post_content2, function (req, res) {
    res.send('post ' + ' ' + req.body.myPost)
})
*/

/*
var steem = require('steem');
steem.api.setOptions({ url: 'https://api.steemit.com' });
var author = "tradingideas"
var permlink = "4vzy3w-3"
var str;
steem.api.getAccounts('steemit', function (result, err) {
    console.log(result, err);
})

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');

    steem.api.getActiveVotes(author, permlink, function (err, response) {
        // console.log(err, response);

        var msg = "total # of voter : " + response.length;
        str = msg + "\n"
        console.log(msg);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].voter, response[i].rshares);
            str = str + response[i].voter + "\n";
        }
        str = str + "\n";
        res.end(str);
    });
*/


/*
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/