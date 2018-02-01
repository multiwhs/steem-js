'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

var authors = ['tradingideas', 'musicholic']
var beforeDate = '2018-01-30T09:00:00'
var str

beforeDate = new Date().toISOString()
console.log(beforeDate)
beforeDate = beforeDate.split('.')[0];

for (var k = 0; k < authors.length; k++) {
    steem.api.getDiscussionsByAuthorBeforeDate(authors[k], '', beforeDate, 10, function (err, post) {
        if (err === null) {
            var str = "author : " + post[0].author + '\n =================== \n'
            console.log(str)
            for (var i = 0; i < post.length; i++) {
                str = post[i].created + ' ; ' + post[i].title + ' ; ' + post[i].permlink + ' ; ' + post[i].pending_payout_value.split(' ')[0]
                console.log(str)
            }
            console.log('\n')
        }
    });
}

