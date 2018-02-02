'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var author = 'tradingideas'
var permlink = '5zkyuz-test'

steem.api.getActiveVotes(author, permlink, function (err, voters) {

    var msg = "total # of voter : " + voters.length;    // voters 수를 출력
    console.log(msg);
    for (var i = 0; i < voters.length; i++) {   // voters 수 만큼 반복
        var str = voters[i].voter + ' ;  '  + voters[i].rshares;

        console.log(str);
    }
});
