// const path = require('path');
// const fs = require('fs');

// const file = "Node_College/Week2/core_module.js";

// console.log(path.basename(file));
// console.log(path.extname(file));
// console.log(path.dirname(file));

// // Adjusted path to 'Week2/file.txt' because your terminal runs from 'Node_College'
// const data = fs.readFileSync("Week2/file.txt", "utf-8");
// console.log(data);



// console.log("first")
// const data= fs.readFileSync("file.txt","utf-8");

// console.log(data)
// console.log("second")
// console.log("first")
// fs.readFile("file.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data)
//     }
// })
// console.log("second")

// fs.appendFile("file.txt","\n hello students",(err)=>{
//     if(err){
//         console.log(err);
//     }
// })

// fs.unlink("file1.txt",(err)=>{
//     if(err){
//         console.log(err);
//     }
// })

// const password = "Jhon@124";

// const salt = crypto.randomBytes(16).toString("hex");

// const hash = crypto
//   .createHmac("sha256", salt)
//   .update(password)
//   .digest("hex");

// console.log(hash);


// dns.lookup("www.google.com", (err, address, family) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(address);
//         console.log(family);
//     }
// });

// dns.reverse("8.8.8.8", (err, hostnames) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(hostnames);
//     }
// });




// const data = process.argv;
// console.log(Number(data[2]),+ Number(data[3]));



console.log(process.version)
console.log(process.cwd())