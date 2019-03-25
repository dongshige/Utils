// ==UserScript==
// @name         WorkflowyPlus
// @namespace    http://wizmann.tk
// @version      0.1
// @author       Wizmann
// @match        https://workflowy.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


function do_parseImg() {
    // console.log("do_parseImg");
    $(this).nextAll(".content-img").remove();
    var lines = $(this).text().split("\n");
    var img_re = /^\!\[(.*)\]\((.+)\)$/;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var img = line.match(img_re);
        if (img === null) {
            continue;
        }
        var property = img[1];
        var img_url = img[2];

        // console.log(property, img_url);

        if (property === "iframe") {
            $(this).after('<div class="content-img"><iframe width="100%" height="512" src="' + img_url + '" frameborder="0" allowfullscreen=""></iframe></div>');
        } else if (property === "audio") {
            $(this).after('<div class="content-img"><audio src="' + img_url + '" controls="controls"></audio></div>');
        } else {
            $(this).after('<div class="content-img"><img src="' + img_url + '"/></div>');
        }
    }
}

function parseImg() {
    console.log("parseImg");
    // console.log($("div.notes div.content"));
    // $("div.notes div.content").keyup(do_parseImg);
    // $("div.notes div.content").click(do_parseImg);
    $("div.notes div.content").each(do_parseImg);
};

$(window).bind("load hashchange", parseImg);
window.addEventListener('popstate', parseImg);

(function runForever(){
  setInterval(parseImg, 1000)
})()

var pushState = history.pushState;
history.pushState = function () {
    pushState.apply(history, arguments);
    parseImg();
};
