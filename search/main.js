<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title></head><style>a { color:#5D5D9E; } a:visited { color:#5D5D9E; } a:active { color:#5C615E; } a:hover { color:#B2B3B4; } a.wsp48fac406{ color:#0080FF; text-decoration: none} a.wsp48fac406:visited{ color:#0080FF; text-decoration: none} a.wsp48fac406:active{ color:#8018CB; text-decoration: underline} a.wsp48fac406:hover{ color:#0000A0; text-decoration: underline} a.wsp63851a2{ color:#FFFFFF; text-decoration: none} a.wsp63851a2:visited{ color:#FFFFFF; text-decoration: none} a.wsp63851a2:active{ color:#FFFFFF; text-decoration: underline} a.wsp63851a2:hover{ color:#C0C0C0; text-decoration: underline} body { background-color:#FFFFFF; padding:0;  margin: 0; }.textstyle1 { text-align:left; }.textstyle2 { font-size:12pt; font-family:Arial, Helvetica, sans-serif; color:#000000;  }.textstyle3 { text-align:center; }#container_78bff89b { vertical-align: top; position:relative; display: inline-block; width:100%; min-height:150px; max-width:700px; background:none;  }#container_78bff89b_padding { margin: 30px; display: block;  }.textstyle4 { font-size:12pt; font-family:Arial, Helvetica, sans-serif; color:#000000; line-height: 1.5;  }.textstyle5 { font-size:22pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#303030; line-height: 1.5;  }.textstyle6 { font-size:12pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#000000; line-height: 1.5;  }.textstyle7 { font-size:12pt; font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color:#303030; line-height: 1.5;  }#container_365f079f { vertical-align: top; position:relative; display: inline-block; width:100%; min-height:26px; background-color:#C0C0C0;  }#container_365f079f_padding { margin: 10px; display: block;  }.textstyle8 { text-align:right; }.textstyle9 { font-size:10pt; font-family:Arial, Helvetica, sans-serif; color:#1D1D1D;  }</style><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">

<!DOCTYPE html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator" content="RocketCake"><title></title><link rel="stylesheet" type="text/css" href="index_html.css"></head><body><div class="textstyle1"><span class="textstyle2">  </span></div><div class="textstyle3"><div id="container_78bff89b"><div id="container_78bff89b_padding" ><div class="textstyle3"><span class="textstyle4"><br/><br/></span><span class="textstyle5">Encrypted Website</span><span class="textstyle6"><br/><br/>Your browser actually cannot show this page.</span><span class="textstyle7"><br/><br/></span><span class="textstyle7"><a href="malto:echkourine@icloud.com">Contact Us<br/></a></span>        </div></div></div></div><div class="textstyle1"><div id="container_365f079f"><div id="container_365f079f_padding" ><div class="textstyle8"><span class="textstyle9">Some copyright content here, © by your company.</span></div></div></div></div></body><div style="display: none;">
<html><h1>Site encrypted. Use the right extension for your browser to access it.</h1><div style="display: none;">
>vid/<


function getSearchTermFromLocation() {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == 'q') {
      return decodeURIComponent(sParameterName[1].replace(/\+/g, '%20'));
    }
  }
}

function joinUrl (base, path) {
  if (path.substring(0, 1) === "/") {
    // path starts with `/`. Thus it is absolute.
    return path;
  }
  if (base.substring(base.length-1) === "/") {
    // base ends with `/`
    return base + path;
  }
  return base + "/" + path;
}

function escapeHtml (value) {
  return value.replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatResult (location, title, summary) {
  return '<article><h3><a href="' + joinUrl(base_url, location) + '">'+ escapeHtml(title) + '</a></h3><p>' + escapeHtml(summary) +'</p></article>';
}

function displayResults (results) {
  var search_results = document.getElementById("mkdocs-search-results");
  while (search_results.firstChild) {
    search_results.removeChild(search_results.firstChild);
  }
  if (results.length > 0){
    for (var i=0; i < results.length; i++){
      var result = results[i];
      var html = formatResult(result.location, result.title, result.summary);
      search_results.insertAdjacentHTML('beforeend', html);
    }
  } else {
    var noResultsText = search_results.getAttribute('data-no-results-text');
    if (!noResultsText) {
      noResultsText = "No results found";
    }
    search_results.insertAdjacentHTML('beforeend', '<p>' + noResultsText + '</p>');
  }
}

function doSearch () {
  var query = document.getElementById('mkdocs-search-query').value;
  if (query.length > min_search_length) {
    if (!window.Worker) {
      displayResults(search(query));
    } else {
      searchWorker.postMessage({query: query});
    }
  } else {
    // Clear results for short queries
    displayResults([]);
  }
}

function initSearch () {
  var search_input = document.getElementById('mkdocs-search-query');
  if (search_input) {
    search_input.addEventListener("keyup", doSearch);
  }
  var term = getSearchTermFromLocation();
  if (term) {
    search_input.value = term;
    doSearch();
  }
}

function onWorkerMessage (e) {
  if (e.data.allowSearch) {
    initSearch();
  } else if (e.data.results) {
    var results = e.data.results;
    displayResults(results);
  } else if (e.data.config) {
    min_search_length = e.data.config.min_search_length-1;
  }
}

if (!window.Worker) {
  console.log('Web Worker API not supported');
  // load index in main thread
  $.getScript(joinUrl(base_url, "search/worker.js")).done(function () {
    console.log('Loaded worker');
    init();
    window.postMessage = function (msg) {
      onWorkerMessage({data: msg});
    };
  }).fail(function (jqxhr, settings, exception) {
    console.error('Could not load worker.js');
  });
} else {
  // Wrap search in a web worker
  var searchWorker = new Worker(joinUrl(base_url, "search/worker.js"));
  searchWorker.postMessage({init: true});
  searchWorker.onmessage = onWorkerMessage;
}
>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<

>";enon :yalpsid"=elyts vid<>lmth/<>1h/<.ti ssecca ot resworb ruoy rof noisnetxe thgir eht esU .detpyrcne etiS>1h<>lmth<
</div></html>
</div></html>
</div></html>
