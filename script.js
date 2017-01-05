$(document).ready(function() {
  var $output = $("#output");
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "QuickyBaby", "brunofin", "comster404"];
  for(i=0; i< streamers.length; i++) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamers[i], function(data) {
      var users = data._links.channel.substr(38);
      if(data.stream !== null) {
        $output.append('<a href="https://www.twitch.tv/'+users+'" target="_blank"><div id="display" class="media twitchOnline"><div class="media-left"><img src="'+data.stream.channel.logo+'" class="media-object"></div><div class="media-body"><h4 class="media-heading">'+data.stream.channel.display_name+'</h4><p>Online:'+data.stream.game+":"+data.stream.channel.status+'</p></div></div></a>');
      }
      else {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users, function(data) {
          if(data.status !== 422) {
            $output.append('<a href="https://www.twitch.tv/'+users+'" target="_blank"><div id="display" class="media twitchOffline"><div class="media-left"><img src="'+data.logo+'" class="media-object"></div><div class="media-body"><h4 class="media-heading">'+data.display_name+'</h4><p>Offline</p></div></div></a>');
          }
          else {
            $output.append('<div id="display" class="media twitchOffline"><div class="media-left"><img src="https://www.deleted.io/assets/img/icons/128/delete-user.png" class="media-object"></div><div class="media-body"><h4 class="media-heading">'+users+'</h4><p>Account Closed</p></div></div>');
          }
        });
      };
    });
  }
  $("#online").click(function() {
    $(".twitchOffline").hide();
    $(".twitchOnline").show();
  });
  $("#offline").click(function() {
    $(".twitchOffline").show();
    $(".twitchOnline").hide();
  });
  $("#all").click(function() {
    $(".twitchOffline").show();
    $(".twitchOnline").show();
  });
});