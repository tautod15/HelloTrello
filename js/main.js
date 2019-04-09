var counter = 0;
function deleteTable(e){
    switch(e.which)
    {
        case 1:
            //left Click

            break;
        case 2:
            //middle Click
            var element = e.target;
            console.log(element.getAttribute("class"));

            // Going up the hierarchy until something has a class
            while(element.getAttribute("class")===null){
                element = element.parentElement;
                console.log("going up");
            }

            //to delete whole table it goes up until it hits "draggable"
            //TODO Deleting single rows
            console.log(element.getAttribute("class"));
            while(!(element.getAttribute('class').includes("draggable"))){
                element = element.parentElement;
            }
            if(confirm("Are you sure, you want to delete this list?")){
                element.remove();
            }
            break;
        case 3:
            //right Click
            console.log(e.target.getAttribute("class"));
            break;
    }
}

$('document').ready(function(){
    //<editor-fold desc="Init">
    counter = $(".draggable").length;
    $( ".draggable" ).draggable();
    //</editor-fold>

    //<editor-fold desc="Adding a list">
    $("#add").click(function() {
        counter ++;
        $(".container").append("<div class='draggable col-sm-3 "+ counter + "'>" +
            "<span class='title'>List " + counter + "</span> </div>");
        $(".draggable").last().draggable();
        $(".draggable").last().append($("<hr>"));
        $(".draggable").last().append($("<span class='item'>" +
                                            "<span class='text'>text</span>" +
                                            "<span class='remove btn-gradient red mini'>x</span>" +
                                        "</span>"));

    });
    //</editor-fold>

    //<editor-fold desc="Deletion Trigger">
    $("body").on('mousedown','.draggable',function(e){
        deleteTable(e);
        return true;// to allow the browser to know that we handled it.
    });
    //</editor-fold>

    //<editor-fold desc="Editing Title with Mouse Click on Title">
    //<editor-fold desc="Changing Title Click">
    $("body").on('click',".title", function(){
        console.log("Title clicked");
        var input = $('<input type="text" class="input" value="' + $(this).text() + '">');
        $(this).replaceWith(input);
        input.focus();
       $('.input').caretToEnd();
    });
    //</editor-fold>

    //<editor-fold desc="Losing Focus of Text Input">
    $("body").on('blur',".input", function(){
        console.log("Mouse Released");
        var text = $(".input").val();
        $(".input").replaceWith($('<span class="title">'+text+'</span> '))
    });
    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Removing Item Trigger">
    $("body").on('click',".remove", function(){
       $(this.parentElement).remove();
    });
    //</editor-fold>
});
// TODO    THEMES
//          $(".draggable").each(function(index){
//            this.draggable();
//          });



