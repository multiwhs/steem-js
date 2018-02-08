'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var voter = 'tradingideas'
var wif = '5JKXXX7Qc'
var title = ''
var body = "auto comment test4"
var jsonMetadata = ''

var author = 'tradingideas'
var permlink = 'test2'
var weight = 100

var parentPermlink = permlink
var parentAuthor = author
// permlink for comment
var commentPermlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink)

// making comment
steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, commentPermlink, title, body, jsonMetadata, function (err, commentResult) {
    if(err == null) {
        console.log(err, commentResult);
        // voint on this comment
        steem.broadcast.vote(wif, voter, author, commentPermlink, weight, function (err, voted) {
            if (err === null) {
                console.log("voting success");
            }
            else {
                console.log(err.message.split("{}")[0])
            }
        });
    }
    else {
        console.log(err.message.split("{}")[0])
    }
});
