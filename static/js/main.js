/**
 * Created by yyuuq on 2017/3/5.
 */

$(document).ready(function() {
    $('.file_open').change(function(e) {
        var f = this.files[0];
        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                // function: convert text content
                $(".div_text").html(fileOpen.convertText(this.result));
                // $(".div_text").html(this.result);
            };
        })(f);
        reader.readAsText(f);
        $(".title").html(fileOpen.delExtension(f.name));

        var stringhtml = '<li class="div_file1 list-group-item">'+f.name+'</span><button class="btn btn-danger btn-sm pull-right">删除</button></li>';
        $(".ul_files").html(stringhtml);

        $(".btn-danger").click(function () {
            $(".ul_files").html("");
            $(".div_text").html("");
            $(".title").html("");
        })
    });

    $(".div_content").mouseup(function(e) {
        operatePopUp.hideObj($(".div_btns"));
        if (operateSelection.getSelRange()) {
            var selection = operateSelection.selObj;
            if (selection.focusNode === selection.anchorNode) {
                operatePopUp.getMouseCoord(e);
                operatePopUp.showObj($(".div_btns"));
            }
        }
    });

    // hide btns
    $(document).mousedown(function () {
        operatePopUp.hideObj($(".div_transarea"));
        // if (operateSelection.getSelRange()) {
        //     operateSelection.selObj.removeAllRanges();
        // }
        // setTimeout(function(){
        //     operatePopUp.hideObj($(".div_btns"));
        // }, 500);
    });

    // bind btns click event
    $(".div_btns button").click(function(event) {

        operatePopUp.hideObj($(".div_btns"));
        //console.log(event.target.className.split(" ")[0]);
        switch (event.target.className.split(" ")[0])
        {
            case "btn_highlight":
                btnEvent.addHighlight();
                //storeContentStatus();
                break;
            case "btn_addnote":
                btnEvent.addNote();
                //storeContentStatus();
                break;
            case "btn_trans":
                btnEvent.translateWord();
                break;
            case "btn_search":
                btnEvent.searchWord();
                break;
            default:
                ;
        }
    });

    $(".btn_submit").click(function() {

        var newNode = document.createElement("div");
        var txtNode = document.createTextNode($(".area_note").val());
        newNode.appendChild(txtNode);
        //$(newNode).css("display", "none");
        $(newNode).attr("class", "note_" + btnEvent.noteIndex);

        console.log(newNode);
        $(".div_notes").append(newNode);

        operatePopUp.hideObj($(".div_notearea"));
        $(".area_note").val("");
    });
});


var fileOpen = {
    delExtension : function (filename){
        var reg = /\.\w+$/;
        return filename.replace(reg,'');
    },

    convertText : function (content) {
        var result = content.replace(/\t/g, "&nbsp&nbsp&nbsp&nbsp");
        result = result.replace(/(\r\n)+/g, "</p><p>");
        return "<p>"+result+"</p>";
    },
}

