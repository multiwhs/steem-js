'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var author = 'tradingideas'
var permlink = '5zkyuz-test'
steem.api.getActiveVotes(author, permlink, function (err, voters) {
    var reward_balance, recent_claims, basePrice, retSBD;
    var msg = "total # of voter : " + voters.length;    // voters ���� ���
    console.log(msg);
    steem.api.getRewardFund("post", function (err, rewardFund) {    // ���� Ǯ�� �ִ� reward �ܾװ� ������ �ݾ� ���� ���
        reward_balance = parseFloat(rewardFund.reward_balance.split(' ')) // ���ڿ��� ���� �Ǽ��� ��ȯ
        recent_claims = parseInt(rewardFund.recent_claims) // ���ڿ��� ���� ������ ��ȯ
        steem.api.getCurrentMedianHistoryPrice(function (err, historyPrice) {
            var basePrice = parseFloat(historyPrice.base.split(' '))  // ���ڿ��� ���� �Ǽ��� ��ȯ
            var quotePrice = parseFloat(historyPrice.quote.split(' '))  // ���ڿ��� ���� �Ǽ��� ��ȯ
            basePrice = basePrice / quotePrice      // feed_price ����
            for (var i = 0; i < voters.length; i++) {   // voters �� ��ŭ �ݺ�
                var rshares = parseInt(voters[i].rshares)   // i��° voter�� �� shares ��
                retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares�� SBD�� ��ȯ
                var str = voters[i].voter + ' :  $' + retSBD + ' : ' + voters[i].rshares;
                console.log(str);
            }
        });
    });
});
