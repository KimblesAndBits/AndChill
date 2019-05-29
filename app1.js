function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function){
    $(form).on("submit",function(e){
        e.preventDefault();
        // get the request ready
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 2,
            order: "viewCount",
        });
        // execute the request
        request.execute(function(response){
            var results = response.results;
            $.each(results, function(index, item){
                $.get("tpl/item.html", function(data){
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoId":item.id.videoId}]));
                });
            });
        });
    });
}


function init() {
    gapi.client.setApiKey("AIzaSyDlB9W5k4M1u608QhpywfLeOR3xilpbJDA");
    gapi.client.load("youtube", "v3", function(){
        // youtube api is ready
    });
}