const { myName, myHobbies, myFavoriteNumber } = require("./multiple-exports");
const greeting = require("./my-modules/single-export");
const {myName: myOtherName, myFriendsName, myGreatHobbies} = require("./export-and-import");

console.log(myName, myHobbies, myFavoriteNumber);
greeting(myOtherName);
greeting(myFriendsName);

myHobbies.push("climbing");

console.log(myGreatHobbies);