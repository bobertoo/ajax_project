
  function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ', ' + cityStr;
    var bgimgurl =
      "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address

    $greeting.text('You want to live at ' + address + '?')
    $body.append('<img class="bgimg" src="' + bgimgurl + '">');
    return false;
};

$('#form-container').submit(loadData);
