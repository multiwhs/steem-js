'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var voter = 'tradingideas'
var wif = '5JKbt8zpe5LfUuLRH2f7VKjUbKUKjdYPgiD8XnT22mXUzAjQ7Qc'

var author = 'tradingideas'
var permlink = '5nnwke-test'
var weight = 100    // 1.0%

steem.broadcast.vote(wif, voter, author, permlink, weight, function (err, voted) {
    if (err === null) {
        console.log("voting success");
        steem.api.getActiveVotes(author, permlink, function (err, response) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].voter == voter) {
                    var msg = "voted ok" + response[i].rshares
                    console.log(msg);
                }
            }
        });
    }
    else {
        console.log(err.message.split("{}")[0])
    }
});

