/**
 * Created by yyuuq on 2017/3/5.
 */
var operateSelection = {
    selObj : "",
    rangeObj : "",
    noteIndex : 0,

    getSelRange : function () {
        if (document.getSelection) {
            this.selObj = document.getSelection();
            //if (this.selObj.rangeCount <= 0) {
            if (this.selObj.isCollapsed) {
                return false;
            }

            this.rangeObj = this.selObj.getRangeAt(0);
            return true;
        }
        else {
            return false;
        }
    },
}

var btnEvent = {
    addHighlight : function () {
        alert(1);
        var newNode = document.createElement("span");
        newNode.setAttribute("class", "high_light");
        this.rangeObj.surroundContents(newNode);
    },

    addNote : function () {
        alert(2);
        this.noteIndex = this.genNoteIndex();
        var newNode = document.createElement("u");
        newNode.class = "underline";
        newNode.id = this.noteIndex;
        this.rangeObj.surroundContents(newNode);

        $("u").click(function(event){
            if (event.target.tagName === "U") {
                btnOperation.index = ".note_" + event.target.id;
                hideObject($(".div_notes div"));
                promptObject($(btnOperation.index));
            }
        });
        // prompt note editer
        operatePopUp.showObj($(".div_note"));
    },

    showNote : function() {
        $(".div_notes").text(userNote);
    },

    translateWord : function () {
        alert(3);
        var youdaoAPI = "http://fanyi.youdao.com/openapi.do?keyfrom=pdblog&key=993123434&type=data&doctype=jsonp&callback=translate&version=1.1&q=",
            reqURL = youdaoAPI + selObj.toString(),
            i, item,
            retData = "";

        $.ajax({
            type: "data",
            url: reqURL,
            async: false,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "translate",
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

                btnOperation.showTranslation(retData);
            }
        });
        return retData;
    },

    showTranslation : function(data) {
        $(".div_trans").html(data);
        promptObject($(".div_trans"));
    },

    searchWord : function () {
        alert(4);
        var reqURL = "https://www.baidu.com/s?wd=" + selObj.toString();
        window.open(reqURL);
    },

    genNoteIndex : function() {
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

var operatePopUp = {
    popUpLeft : 0,
    popUpTop : 0,

    getMouseCoord : function (event) {
        var coordX = event.clientX + document.body.scrollLeft;
            coordY = event.clientY + document.body.scrollTop;
        this.popUpTop = coordY + 20 + "px";
        this.popUpLeft = coordX > 60 ? coordX-60+"px" : coordX+"px";
    },
    
    showButtonSet : function () {

    },

    showNoteArea : function () {

    },

    showObj : function (obj) {
        obj.css({
            "left" : this.popUpLeft,
            "top" : this.popUpTop,
            });
        obj.show();
    },

    hideObj : function (obj) {
        obj.hide();
    },
}