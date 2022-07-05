/**
 * Written for UTSC New Media in Theory
 * Parts of this code is adapted from Nick Puckett & Kate Hartman's Creation & Computation PubNub Code
 * 
 * This file sets up the publish and subscribe events for the all of the pubnub pages on this website.  
*/

let dataServer;
let pubKey = "pub-c-90e1b5bf-d99f-4531-ad53-eea72275bdaf";
let subKey = "sub-c-2b5d2079-225e-44b5-b9f1-63840bbbdfcb";
let secretKey = "sec-c-OWE3NjUxODYtYjY1YS00NmYzLWIyYjItOWUzZTJkZGM0MzVk";

function createServer(y) {

  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: y,
    secretKey: secretKey,
    heartbeatInterval: 0,
  });

}

