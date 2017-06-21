'use strict';
var cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

var bjsonpath = path.join(__dirname, '../..', 'book.json');
var bjson = require(bjsonpath);
var style = bjson.pluginsConfig["jp-hints"].style;
var stylepath = style+'/style.css';

module.exports = {
    website: {
        assets: './styles/',
        css: [ stylepath ],
        js: [
            'fix.js'
        ],
    },
    hooks: {
        page: function (page) {
            var $ = cheerio.load(page.content);
            var bqs = $('blockquote');
            var regexp = /\[(info|warning|danger|success|error|primary|default)\](.*)/i;

                    bqs.each(function(index, a) {
                      a = $(a);
                      var text = a.html();
                      var result = regexp.exec(text);

                      if(result == null) return;

                      var type = result[1], title = result[2];

                      var textNew = text.replace('['+type+']'+title, '');

                      var template = fs.readFileSync(path.join(__dirname, 'styles/'+style+'/template.mustache'), 'utf8');
                      var block = mustache.render(template, {
                            title: title.trim(),
                            text: textNew,
                            type: type,
                          });

                      a.replaceWith(block);
                    });
            page.content = $.html();
            return page;
        }
    }
};
