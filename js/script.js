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

	// load nytimes

	var nytimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
	$.getJSON(nytimesURL, {
			'q': cityStr,
			'sort': "newest",
			'api-key': "16a857a91d4eacd1c24c98b17dafb30c:18:73442297"
		})
		.done(function(data) {

			$nytHeaderElem.text('New York Times Articles about ' + cityStr + '.');

			articles = data.response.docs;
			for (var i = 0; i < articles.length; i++) {
				var article = articles[i];
				$nytElem.append('<li class="article">' +
					'<a href="' + article.web_url + '">' + article.headline.main +
					'</a>' +
					'<p>' + article.snippet + '</p>' + '</li>'
				);

			};
		})
		.error(function(e) {
			$nytHeaderElem.text('error loading nytimes articles');
		})

	// load wikipedia
var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + cityStr + '&callback=wikiCallback';

var wikiRequestTimeout = setTimeout(function(){
	$wikiElem.text("failed to get wikipedia resources");
}, 8000)


  $.ajax({
    url: wikiUrl,
    dataType: "jsonp",
		success: function( response ){
			var articleList = response[1];

			for (var i = 0; i < articleList.length; i++){
				articleStr =  articleList[i];
				console.log(articleStr);
				var wikiArticleUrl = 'http://en.wikipedia.org/wiki/' + articleStr;
				$wikiElem.append('<li><a href="' + wikiArticleUrl + '">' + articleStr + '</a></li>');
			};

			clearTimeout(wikiRequestTimeout);
		}
  });

	return false;
};

$('#form-container').submit(loadData);
