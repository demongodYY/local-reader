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

