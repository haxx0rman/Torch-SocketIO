import R from 'ramda';
const images = R.range(1, 11).map(i => i);

// instead of this, write to a databse and to achive message reordering, just delete the
// element from a username when it sends a new message and send the new messge
// to the top every time kinda like shufflling cards, this would also sort as messages are received
// instead of by timestamp making it harder to manipulate chats list order like people do in kik

const data = [{
  "id": 2,
  "first_name": "Amanda",
  "last_name": "Grant",
  "username": "lmfaogrant",
  "time": "2:54 AM",
  "message": "rutrum",
  "isRead": false,
  "isViewed": false,
  "image": images[0]
}, {
  "id": 1,
  "first_name": "Gloria",
  "last_name": "Hicks",
  "username": "hicksrgay",
  "time": "11:56 AM",
  "message": "viverra pede",
  "isRead": false,
  "isViewed": true,
  "image": images[1]
}, {
  "id": 3,
  "first_name": "Gloria",
  "last_name": "Lane",
  "username": "stayinyourlane",
  "time": "1:34 AM",
  "message": "vehicula consequat",
  "isRead": true,
  "isViewed": false,
  "image": images[2]
}, {
  "id": 4,
  "first_name": "Linda",
  "last_name": "Wells",
  "username": "WellsWellsWells",
  "time": "2:12 AM",
  "message": "vehicula",
  "isRead": true,
  "isViewed": true,
  "image": images[3]
}, {
  "id": 5,
  "first_name": "Samantha",
  "last_name": "Lee",
  "username": "HapUhLee",
  "time": "11:23 AM",
  "message": "amet",
  "isRead": false,
  "isViewed": false,
  "image": images[4]
}, {
  "id": 6,
  "first_name": "Irene",
  "last_name": "Garcia",
  "username": "ScaryGarcia",
  "time": "3:15 PM",
  "message": "quis orci nullam",
  "isRead": false,
  "isViewed": false,
  "image": images[5]
}, {
  "id": 7,
  "first_name": "Marilyn",
  "last_name": "Grant",
  "username": "PermisionGranted",
  "time": "5:06 AM",
  "message": "felis sed lacus",
  "isRead": true,
  "isViewed": true,
  "image": images[6]
}, {
  "id": 8,
  "first_name": "Maya",
  "last_name": "Carr",
  "username": "ImInMeMumsCarr",
  "time": "11:28 PM",
  "message": "purus aliquet at",
  "isRead": true,
  "isViewed": false,
  "image": images[7]
}, {
  "id": 9,
  "first_name": "Paula",
  "last_name": "Kelly",
  "username": "KellyIDK",
  "time": "12:36 PM",
  "message": "aliquam lacus morbi",
  "isRead": true,
  "isViewed": true,
  "image": images[8]
}, {
  "id": 10,
  "first_name": "Ruth",
  "last_name": "Carr",
  "username": "AnotherCarrPun",
  "time": "3:05 PM",
  "message": "integer tincidunt",
  "isRead": true,
  "isViewed": true,
  "image": images[9]
}, {
  "id": 11,
  "first_name": "Christy",
  "last_name": "Cook",
  "username": "WhatsCookinGoodLookin",
  "time": "10:02 PM",
  "message": "parturient montes nascetur",
  "isRead": true,
  "isViewed": true,
  "image": images[10]
}, {
  "id": 12,
  "first_name": "Karen",
  "last_name": "Burke",
  "username": "DontBurkeAtMe",
  "time": "1:19 AM",
  "message": "pede libero",
  "isRead": false,
  "isViewed": false,
  "image": images[0]
}];

module.exports = {
  images,
  data
};
