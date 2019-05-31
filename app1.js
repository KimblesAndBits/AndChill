// function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }


function loadClient() {
    gapi.client.setApiKey("AIzaSyDlB9W5k4M1u608QhpywfLeOR3xilpbJDA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

    // var App = {
        // init: function() {
            // gapi.client.setApiKey( "AIzaSyDlB9W5k4M1u608QhpywfLeOR3xilpbJDA" );
            // gapi.client.load( "youtube", "v3", function() {
                // App.getVideos();
            // })
            // .then(function() { console.log("GAPI client loaded for API"); },
            // function(err) { console.error("Error loading GAPI client for API", err); });

        // },
        //  function( query ) {
        //     query = query || "jquery";
            
        //     console.log(gapi.client)
        //     var request = gapi.client.youtube.search.list({
        //         part: "snippet",
        //         type: "video",
        //         q: query,
        //         maxResults: 6,
        //         order: "viewCount"
        
        //     });

        //     request.execute(function( response ) {
        //         var results = response.result;
        //         var html = "";
        //         $.each( results.items, function( index, item ) {
        //             var title = item.snippet.title;
        //             var id = item.id.videoId;
        //             html += "<div class='video'>";
        //             html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + '?controls=0" frameborder="0" allowfullscreen></iframe>';
        //             html += "<h3>" + title + "</h3>";
        //             html += "</div>";
                  
        //         });
        //         $( "#response").html( html );
        //     });
        // }
    
    $(function() {
        $( "#search-youtube").submit(function( e ) {
            e.preventDefault();
            var queryStr = encodeURIComponent( $( "#q" ).val() ).replace( /%20/g, "+" );
            console.log(queryStr);
            App.getVideos( queryStr );
        });
    });
        gapi.load("client:auth2", function() {
            gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
        });

    
    
    // App.init();




// (function($) {
    // $( document ).ready(function() {
    // console.log("--hello--");

    // // gapi.load("client", () =>{

    // // });

    // // $("#go").on("click",function(e){
    // //     e.preventDefault();
    // //     console.log("hello");
        
    // //     function onClientLoad() {
    // //     gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    // // }
    //     // get the request ready

    //     function youtubeApiCall(){
    //         $.ajax({
    //             cache: false,
    //             data: $.extend({
    //                 key: 'AIzaSyDlB9W5k4M1u608QhpywfLeOR3xilpbJDA',
    //                 q: $('#search').val(),
    //                 part: 'snippet'
    //             }, {maxResults:20,pageToken:$("#pageToken").val()}),
    //             dataType: 'json',
    //             type: 'video',
    //             timeout: 5000,
    //             url: 'https://www.googleapis.com/youtube/v3/search'
    //         })
    //             // console.log("step2")
                

    //     }
    // })
                
    //             console.log("items");
        
                            
                            
        // function searchByTopic() {
        //     var mid = '/m/0gjf126';
        //     var results = YouTube.Search.list('id,snippet', {topicId: mid, maxResults: 25});
        //     for(var i in results.items) {
        //       var item = results.items[i];
        //       Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
        //     }
        //   }
        // var request = gapi.client.youtube.search.list({
        //     part: "snippet",
        //     type: "video",
        //     q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        //     maxResults: 2,
        //     order: "viewCount",
        // });
        // execute the request
        // request.execute(function(response){
        //     var results = response.results;
        //     $.each(results, function(index, item){
        //         $.get("tpl/item.html", function(data){
        //             $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoId":item.id.videoId}]));
        //         });
        //     });
        // });

    
                            
// })(jQuery);