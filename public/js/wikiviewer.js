/* jshint node: true, esversion: 6 */

let getInputVal = () => $("input[type=search]").val();

let getSearchResult = function () {
    $.ajax({
        type: "GET",
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + getInputVal(),
        dataType: "jsonp",
        contentType: "application/json",
        success: function (res) {
            let resTemplate = `<li>
<div class="searchresult-heading">
    <a href="#" target="_blank"></a>    
</div>
<div class="searchresult"></div> 
</li>`;
            let pages;
            $(".searchresults ul").empty();
            if (res.query) {
                pages = res.query.pages;

                for (let page in pages) {
                    let title = pages[page].title,
                        extract = pages[page].extract,
                        url = "http://en.wikipedia.org/?curid=" + pages[page].pageid;
                    console.log(title, extract);
                    $(resTemplate).find(".searchresult-heading a").attr("href", url).text(title).end().find(".searchresult").text(extract).end().appendTo(".searchresults ul");
                }
            }
        },
        error: function (jqxhr, status, statusText) {
            console.log(status, statusText);
        }
    });
};


$(document).ready(function () {
    $("input[type=search]").keypress(function (event) {
        // if key is "Enter key"
        if (event.which === 13) {
            // Check for empty search input
            if ($("input[type=search]").val()) {
                getSearchResult()
            } else {
                $(".searchresults ul").empty();
                $('<li><div class="searcherror"></div></li>').find(".searcherror").text("You cannot make an empty search").css("color", "red").end().appendTo(".searchresults ul");
            }
            // prevent default action on keypress 
            return false;
        }
    });
    $("#search").click(function () {
        // Check for empty search input
        if ($("input[type=search]").val()) {
            getSearchResult()
        } else {
            $(".searchresults ul").empty();
            $('<li><div class="searcherror"></div></li>').find(".searcherror").text("You cannot make an empty search").css("color", "red").end().appendTo(".searchresults ul");
        }
    });
});