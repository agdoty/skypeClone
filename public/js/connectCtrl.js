angular.module('skypeClone').controller('connectCtrl', function($scope, $interval, connectSvc, $state) {

//SKYLINK AND VIDEO SHARING!! WORKING!!

var skylink = new Skylink(); //enables us to subscribe events in the controller

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) { //informs us a peer has joined
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video'); //creates a new vid element for new user
  vid.autoplay = true; //autoplay enables the video to start right away
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId; //the user that joins gives us their peerId
  document.body.appendChild(vid);//sends the new video to the bottom of the body on the DOM
});

skylink.on('incomingStream', function(peerId, stream, isSelf) { //fired after peerjoined when receiving vid/aud streams
  if(isSelf) return; //if the peer is us, return our own id
  var vid = document.getElementById(peerId);//else get the id of the incoming stream
  attachMediaStream(vid, stream); //attaches a media stream to a vid/aud element
});
skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {//fired when a peer leaves the room
  var vid = document.getElementById(peerId);//gets the id of the peer that's left
  document.body.removeChild(vid);//removes video element by the id of the peer
});

skylink.on('mediaAccessSuccess', function(stream) { //User must authorize browser to have access to local vid/aud
  var vid = document.getElementById('myvideo');//gets their local video
  attachMediaStream(vid, stream);//attaches publice media stream to that peers vid/aud to send it back
});

skylink.init({ //initialize and joinRoom, establishes signaling connection with our servers
  apiKey: '13c2f3f9-73c3-42a4-b13c-3da36e3bd1f2', //the api key we've been given
  defaultRoom: 'Chat' //sets default room to whatever you name it
}, function() {
  skylink.joinRoom({ //tells our servers to establish vid/aud streams
    audio: true, //enables aud
    video: true //enables vid
  });
});












//VIDEO CHAT
          // $scope.videoPlay = function(){

            // function hasGetUserMedia(){
            //   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            // }
            // if(hasGetUserMedia){ console.log("good to go");
            // }
            // else{
            //   console.log("not good");
            // }
            // var getUserMedia = require('getusermedia');
            // getUserMedia(function (err, stream) {
            //     // if the browser doesn't support user media
            //     // or the user says "no" the error gets passed
            //     // as the first argument.
            //     if (err) {
            //        console.log('failed');
            //     } else {
            //        console.log('got a stream', stream);
            //     }
            // });
            // var videoStream = null;
            // var video = document.getElementById("video");
            //
            // // Test browser support
            // window.navigator = window.navigator || {};
            // navigator.getUserMedia = navigator.getUserMedia       ||
            //                          navigator.webkitGetUserMedia ||
            //                          navigator.mozGetUserMedia    ||
            //                          null;
            // if (navigator.getUserMedia === null) {
            //   document.getElementById('gum-unsupported').classList.remove('hidden');
            //   document.getElementById('button-play-gum').setAttribute('disabled', 'disabled');
            //   document.getElementById('button-stop-gum').setAttribute('disabled', 'disabled');
            // } else {
            //   // Opera <= 12.16 accepts the direct stream.
            //   // More on this here: http://dev.opera.com/articles/view/playing-with-html5-video-and-getusermedia-support/
            //   var createSrc = window.URL ? window.URL.createObjectURL : function(stream) {return stream;};
            //
            //   // Opera <= 12.16 support video only.
            //   var audioContext = window.AudioContext       ||
            //                      window.webkitAudioContext ||
            //                      null;
            //   if (audioContext === null) {
            //     document.getElementById('gum-partially-supported').classList.remove('hidden');
            //   }
            //
            //   document.getElementById('button-play-gum').addEventListener('click', function() {
            //     // Capture user's audio and video source
            //     navigator.getUserMedia({
            //       video: true,
            //       audio: true
            //     },
            //     function(stream) {
            //       videoStream = stream;
            //       // Stream the data
            //       video.src = createSrc(stream);
            //       video.play();
            //     },
            //     function(error) {
            //       console.log("Video capture error: ", error.code);
            //     });
            //   });
            //   document.getElementById('button-stop-gum').addEventListener('click', function() {
            //     // Pause the video
            //     video.pause();
            //     // Stop the stream
            //     videoStream.stop();
            //   });
            // }
            // ////////////////////
            // //////////////////
            // //////////////
            // /////////////////
            // /////////////////
            // /////////////////
            // ///////////////
            // ////////////////
            // //PEER CONNECTION
            // $scope.peerConnectionFunction = function(){
            //   //this creates the peer connections
            //   var media = {};
            //   media.fake = media.audio = true;
            //   var client = new mozRTCPeerConnection;
            //   var server = new mozRTCPeerConnection;
            //   //when the client connects to the server it needs to open
            //   //a data channel
            //   client.onconnection = function () {
            //       var channel = client.createDataChannel("chat", {});
            //
            //       channel.onmessage = function (event) {
            //           alert("Server: " + event.data);
            //       };
            //
            //       channel.onopen = function () {
            //           channel.send("Hello Server!");
            //       };
            //   };
            //   //when the client creats a data channel the server may responsd
            //   //via alert
            //   server.ondatachannel = function (channel) {
            //       channel.onmessage = function (event) {
            //           alert("Client: " + event.data);
            //       };
            //
            //       channel.onopen = function () {
            //           channel.send("Hello Client!");
            //       };
            //   };
            //   ///this adds fake audio stream to the client and the server to
            //   //establish a connection
            //   navigator.mozGetUserMedia(media, callback, errback);
            //
            //   function callback(fakeAudio) {
            //       server.addStream(fakeAudio);
            //       client.addStream(fakeAudio);
            //       client.createOffer(offer);
            //   }
            //
            //   function errback(error) {
            //       alert(error);
            //   }
            //   //the client creates an offer
            //   function offer(description) {
            //       client.setLocalDescription(description, function () {
            //           server.setRemoteDescription(description, function () {
            //               server.createAnswer(answer);
            //           });
            //       });
            //   }
            //   //the server accepts the offer given and establishes a connection
            //   function answer(description) {
            //       server.setLocalDescription(description, function () {
            //           client.setRemoteDescription(description, function () {
            //               var port1 = Date.now();
            //               var port2 = port1 + 1;
            //
            //               client.connectDataConnection(port1, port2);
            //               server.connectDataConnection(port2, port1);
            //           });
            //       });
              // }
            // };
          // };
});
