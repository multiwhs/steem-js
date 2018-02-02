'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var author = 'tradingideas'
var permlink = '5zkyuz-test'
steem.api.getActiveVotes(author, permlink, function (err, voters) {
    var reward_balance, recent_claims, basePrice, retSBD;
    var msg = "total # of voter : " + voters.length;    // voters 수를 출력
    console.log(msg);
    steem.api.getRewardFund("post", function (err, rewardFund) {    // 보상 풀에 있는 reward 잔액과 보상할 금액 정보 얻기
        reward_balance = parseFloat(rewardFund.reward_balance.split(' ')) // 문자열인 값을 실수로 변환
        recent_claims = parseInt(rewardFund.recent_claims) // 문자열인 값을 정수로 변환
        steem.api.getCurrentMedianHistoryPrice(function (err, historyPrice) {
            var basePrice = parseFloat(historyPrice.base.split(' '))  // 문자열인 값을 실수로 변환
            var quotePrice = parseFloat(historyPrice.quote.split(' '))  // 문자열인 값을 실수로 변환
            basePrice = basePrice / quotePrice      // feed_price 구함
            for (var i = 0; i < voters.length; i++) {   // voters 수 만큼 반복
                var rshares = parseInt(voters[i].rshares)   // i번째 voter가 준 shares 값
                retSBD = ((reward_balance / recent_claims) * basePrice * rshares).toFixed(2)  // rshares를 SBD로 변환
                var str = voters[i].voter + ' :  $' + retSBD + ' : ' + voters[i].rshares;
                console.log(str);
            }
        });
    });
});
