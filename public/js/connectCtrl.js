angular.module('skypeClone').controller('connectCtrl', function($scope, $interval, connectSvc, $state) {
          $scope.interval;

          $scope.getMessages = function(chatid){
            connectSvc.getMessages($scope.chatid).then(function(response){
            $scope.messages = response.messages;
            });
          };
          $scope.postMessage = function(message){
            connectSvc.postMessage(message).then(function(response){
              $scope.messageNew = response;
            });
          };
          $scope.newRoom = function(roomName){
            connectSvc.newRoom(roomName).then(function(response){
              $scope.roomNew = response;
            });
          };
          $scope.getUsers = function(){
            connectSvc.getCurrentUser().then(function(response){
              $scope.user = response;
            });
          };
          $scope.addToChat = function(fid, chatid){
            connectSvc.addToChat(fid, chatid).then(function(response){
              $scope.addedUserToChat = response;
            });
          };
          $scope.addMsg = function(message, chatid){
            connectSvc.addMsg(message, chatid).then(function(response){
              $scope.chatid = chatid;
              $scope.msgAdded = response;
              $scope.getMessages(chatid);
              $scope.newMsg='';
            });
          };

          $scope.getChatRooms = function(chatid){
            clearInterval($scope.interval);
            $scope.chatid = chatid;
          $scope.interval = setInterval($scope.getMessages, 500);
            connectSvc.getChatRooms(chatid).then(function(response){
              $scope.messages = response.messages;
              $scope.roomNew = response;

              // console.log($scope.messages)
            });
          };
          $scope.$on("$destroy", function(){
            clearInterval($scope.interval);
          });

          $scope.chatUserIn = function(){
            connectSvc.chatUserIn().then(function(response){
              $scope.allowedChats = response;

            });
          };

          var skylink = new Skylink();

          skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
            if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
            var vid = document.createElement('video');
            vid.autoplay = true;
            vid.muted = true; // Added to avoid feedback when testing locally
            vid.id = peerId;
            document.body.appendChild(vid);
          });

          skylink.on('incomingStream', function(peerId, stream, isSelf) {
            if(isSelf) return;
            var vid = document.getElementById(peerId);
            attachMediaStream(vid, stream);
          });
          skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
            var vid = document.getElementById(peerId);
            document.body.removeChild(vid);
          });

          skylink.on('mediaAccessSuccess', function(stream) {
            var vid = document.getElementById('myvideo');
            attachMediaStream(vid, stream);
          });

          skylink.init({
            apiKey: '13c2f3f9-73c3-42a4-b13c-3da36e3bd1f2',
            defaultRoom: 'Chat'
          }, function() {
            skylink.joinRoom({
              audio: true,
              video: true
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
