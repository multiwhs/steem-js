'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var voter = 'tradingideas'
var wif = '5JKbt8zpe5LfUuLRH2f7VKjUbKUKjdYPgiD8XnT22mXUzAjQ7Qc'
var title = ''
var body = "auto comment test1"
var jsonMetadata = ''

var author = 'tradingideas'
var permlink = '5nnwke-test'
var weight = 100

var parentPermlink = permlink
var parentAuthor = author


var commentPermlink = steem.formatter.commentPermlink(parentAuthor, parentPermlink)

// confirm!!
/*
steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, commentPermlink, title, body, jsonMetadata, function (err, result) {
    console.log(err, result);
});
*/
/*
function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}
*/

// weight를 구한다.
steem.api.getRewardFund("post", function (err, rewardFund) {    // 보상 풀에 있는 reward 잔액과 보상할 금액 정보 얻기

    var reward_balance, recent_claims, basePrice, retSBD;

    reward_balance = parseFloat(rewardFund.reward_balance.split(' ')) // 문자열인 값을 실수로 변환
    recent_claims = parseInt(rewardFund.recent_claims) // 문자열인 값을 정수로 변환
    steem.api.getCurrentMedianHistoryPrice(function (err, historyPrice) {
        basePrice = parseFloat(historyPrice.base.split(' '))  // 문자열인 값을 실수로 변환
        var quotePrice = parseFloat(historyPrice.quote.split(' '))  // 문자열인 값을 실수로 변환
        basePrice = basePrice / quotePrice      // feed_price 구함
        // 이미 보팅을 했는지 우선 확인해 본다.
        steem.api.getActiveVotes(author, permlink, function (err, voters) {
            // console.log(err, voters);
            var alreadyVoted = 0
            var msg = "total # of voter : " + voters.length;
            console.log(msg);
            for (var i = 0; i < voters.length; i++) {
                if (voters[i].voter == voter && voters[i].rshares > 0) {
                    var rshares = parseInt(voters[i].rshares)   // i번째 voter가 준 shares 값
                    retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares를 SBD로 변환

                    var msg = "already voted " + voters[i].rshares + ' ' + retSBD
                    console.log(msg);
                    alreadyVoted = 1
                }
            }

            if (!alreadyVoted) {
                console.log("ready to vote");
                steem.broadcast.vote(wif, voter, author, permlink, weight, function (err, voted) {
                    var str
                    if (err === null) {
                        console.log("voting success");
                        steem.api.getActiveVotes(author, permlink, function (err, response) {
                            // console.log(err, response);

                            var msg = "total # of voter : " + response.length;
                            console.log(msg);
                            for (var i = 0; i < response.length; i++) {
                                if (response[i].voter == voter) {
                                    var rshares = parseInt(response[i].rshares)   // i번째 voter가 준 shares 값
                                    retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares를 SBD로 변환

                                    var msg = "voted ok" + response[i].rshares + ' ' + retSBD
                                    console.log(msg);
                                }
                            }
                        });
                    }
                    else {
                        console.log(err.message.split("{}")[0])
                        console.log('erreor');
                    }
                });
            }
            else
                console.log('skip vote');
        });
    });
});

/*
// steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
steem.broadcast.vote(wif, voter, author, permlink, weight, function (err, voted) {
    var str
    if (err === null) {
        steem.api.getActiveVotes(author, permlink, function (err, response) {
            // console.log(err, response);

            var msg = "total # of voter : " + response.length;
            console.log(msg);
            for (var i = 0; i < response.length; i++) {
                if (response[i].voter == voter)
                    console.log(response[i].rshares);
            }
        });
    }
    else
        console.log('erreor');
});
//
*/
