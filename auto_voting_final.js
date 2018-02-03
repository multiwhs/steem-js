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

// weight�� ���Ѵ�.
steem.api.getRewardFund("post", function (err, rewardFund) {    // ���� Ǯ�� �ִ� reward �ܾװ� ������ �ݾ� ���� ���

    var reward_balance, recent_claims, basePrice, retSBD;

    reward_balance = parseFloat(rewardFund.reward_balance.split(' ')) // ���ڿ��� ���� �Ǽ��� ��ȯ
    recent_claims = parseInt(rewardFund.recent_claims) // ���ڿ��� ���� ������ ��ȯ
    steem.api.getCurrentMedianHistoryPrice(function (err, historyPrice) {
        basePrice = parseFloat(historyPrice.base.split(' '))  // ���ڿ��� ���� �Ǽ��� ��ȯ
        var quotePrice = parseFloat(historyPrice.quote.split(' '))  // ���ڿ��� ���� �Ǽ��� ��ȯ
        basePrice = basePrice / quotePrice      // feed_price ����
        // �̹� ������ �ߴ��� �켱 Ȯ���� ����.
        steem.api.getActiveVotes(author, permlink, function (err, voters) {
            // console.log(err, voters);
            var alreadyVoted = 0
            var msg = "total # of voter : " + voters.length;
            console.log(msg);
            for (var i = 0; i < voters.length; i++) {
                if (voters[i].voter == voter && voters[i].rshares > 0) {
                    var rshares = parseInt(voters[i].rshares)   // i��° voter�� �� shares ��
                    retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares�� SBD�� ��ȯ

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
                                    var rshares = parseInt(response[i].rshares)   // i��° voter�� �� shares ��
                                    retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares�� SBD�� ��ȯ

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