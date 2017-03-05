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