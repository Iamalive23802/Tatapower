const multer = require('multer');
const fs = require("fs");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const path = __basedir +'/uploads/';//+req.body.format;
      // fs.access(path, (error) => {  
      //    // To check if given directory 
      //    // already exists or not
      //    if (error) {
      //      // If current directory does not exist then create it
      //      fs.mkdir(path, { recursive: true }, (error) => {
      //        if (error) {
      //          console.log(error);
      //        } else {
      //          console.log("New Directory created successfully !!");
      //          cb(null, path );
      //        }
      //      });
      //    } else {
      //      console.log("Given Directory already exists !!");
           cb(null, path );
      //    }
      //  });
       
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
  });  
  
//   const storagemultiple = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, __basedir + '/uploads/')
//    },
//    filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//    }
//  }); 
   
const upload = multer({
   storage: storage,
   // limits: {fileSize: 5 * 1024}
});

// const uploadmultiple = multer({
//    // storagemultiple: storagemultiple,
//    storage: storage,
//    limits: {fileSize: 5 * 1024}
// })

module.exports = upload
  