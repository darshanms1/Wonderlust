const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing =require("../models/listing.js");


main().then(res =>{
    console.log("connection is succussefull");
    
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}
const initDB=async () =>{
    
    console.log(initData.data[0]);
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6a8d288ae4a346d720f93cf1"}));//this line is used bcz add add owner ti listings 
    await Listing.insertMany(initData.data);
    console.log("data wsainitialized");
};

initDB();

