'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var author = 'tradingideas'
var permlink = '5zkyuz-test'

steem.api.getActiveVotes(author, permlink, function (err, voters) {

    var msg = "total # of voter : " + voters.length;    // voters ���� ���
    console.log(msg);
    for (var i = 0; i < voters.length; i++) {   // voters �� ��ŭ �ݺ�
        var str = voters[i].voter + ' ;  '  + voters[i].rshares;

        console.log(str);
    }
});
