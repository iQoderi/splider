var express = require('express');
var url = require('url');       //解析操作url
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var router = express.Router();

var targetUrl = 'https://cnodejs.org/';

router.get('/', function (req, res, next) {
    var newArr = [];
    superagent.get(targetUrl)
        .end(function (err, res) {
            var $ = cheerio.load(res.text);
            $('#topic_list .topic_title').each(function (index, element) {
                newArr.push(element.attribs.title);
            })
            newArr.forEach(function (each) {
                console.log(newArr.indexOf(each) + 1 + ":" + each + "\n");
            })
        });
    res.send(JSON.stringify(newArr));
});

//http://www.jb51.net/article/58819.htm
module.exports = router;
