/**
 * Created by yyuuq on 2017/3/5.
 */
var btnEvent = {
    noteIndex : 0,
    addHighlight : function () {
        var newNode = document.createElement("span");
        newNode.setAttribute("class", "text_high_light");
        operateSelection.rangeObj.surroundContents(newNode);
    },

    addNote : function () {
        this.noteIndex = this.genNoteIndex();
        var newNode = document.createElement("u");
        newNode.setAttribute("class", "underline");
        newNode.setAttribute("id", this.noteIndex);
        operateSelection.rangeObj.surroundContents(newNode);

        $("u").click(function(event){
            if (event.target.tagName === "U") {
                btnEvent.noteIndex = ".note_" + event.target.id;
                operatePopUp.hideObj($(".div_notes div"));
                operatePopUp.showObj($(btnEvent.noteIndex));
            }
        });

        // popup note editer
        operatePopUp.showObj($(".div_notearea"));
    },


    showNote : function() {

    },



    translateWord : function () {
        var youdaoAPI = "http://fanyi.youdao.com/openapi.do?keyfrom=Local-reader&key=1710758277&type=data&doctype=jsonp&callback=show&version=1.1&q=",
            reqURL = youdaoAPI + operateSelection.selObj.toString(),
            i, item,
            retData = "";

        $.ajax({
            type: "data",
            url: reqURL,
            async: false,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "show",
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function(data) {
                // console.log(JSON.stringify(data, jsonDump, 4));
                if (data.basic) {
                    retData += "prononce" + "</br>";
                    retData += "us-phonetic: [" + data.basic["us-phonetic"] + "]" + "</br>";
                    retData += "uk-phonetic: [" + data.basic["uk-phonetic"] + "]" + "</br>";
                    retData += "translation" + "</br>";
                    $.each(data.basic.explains, function(i, item){
                        retData += (i+1)+". "+item + "</br>";
                    });
                }
                else {
                    retData += "translation" + "</br>";
                    $.each(data.translation, function(i, item){
                        retData += (i+1)+". "+item + "</br>";
                    });
                }

                btnEvent.showTranslation(retData);
            }
        });
        return retData;
    },

    showTranslation : function(data) {
        $(".div_transarea").html(data);
        operatePopUp.showObj($(".div_transarea"));
    },

    searchWord : function () {
        var reqURL = "https://www.baidu.com/s?wd=" + operateSelection.selObj.toString();
        window.open(reqURL);
    },

    genNoteIndex : function() {
        // quchong
        var table = ["a", "b", "c", "d", "e",
            "f", "g", "h", "i", "j",
            "0", "1", "2", "3", "4",
            "5", "6", "7", "8", "9"];

        var index = "";
        for (var i = 4; i > 0; i--) {
            index += table[parseInt(Math.random()*20,10)];
        }

        return index;
    }
}