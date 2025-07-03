
const CryptoJS = require("crypto-js");



//encryption logic

async function cipher(payload){
 
    let key = CryptoJS.enc.Utf8.parse('elogsecretkey');
    // //console.log(key.toString())
    // var iv = CryptoJS.enc.Utf8.parse("\0".repeat(16));
   
    let iv = CryptoJS.enc.Utf8.parse('elogsecretkey'.substring(0, 16))
    // //console.log(iv.toString())
    let encryptedData = CryptoJS.AES.encrypt(payload.toString(), key, {
              iv: iv,
              mode: CryptoJS.mode.CTR,
              padding: CryptoJS.pad.Pkcs7
            });
   
    // //console.log(CryptoJS.enc.Base64.stringify(encryptedData.ciphertext))
   
   
    return CryptoJS.enc.Base64.stringify(encryptedData.ciphertext);
  }
  



async function decipher(ciphertext)
{
    //console.log("texxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxt",ciphertext);
    //let parsetext = JSON.parse(ciphertext)
    try{
        var base64Decrypted = ciphertext;//'hImwH8zIJQ504a5A6ssEl3e9BPR1Gzz/hxGRZAEpyOw='
        // from Dartvar
        let myKey = 'elogsecretkey'
        let iv = CryptoJS.enc.Utf8.parse('elogsecretkey'.substring(0, 16))
        var result = CryptoJS.AES.decrypt(
                       base64Decrypted,CryptoJS.enc.Utf8.parse(myKey),
                       { iv: iv, // pass IV
                       mode: CryptoJS.mode.CTR,                      // apply CTR (aka SIC)
                       padding: CryptoJS.pad.Pkcs7                   // apply PKCS#7 (CryptoJS default)
                       }
                       );
                       //console.log(result.toString());                   // 54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67   // padding removed
                       //console.log(result.toString(CryptoJS.enc.Utf8));

        return result.toString(CryptoJS.enc.Utf8);  
    }
    catch(error)
    {
        console.log("error in decryption",error);
        //console.log("Unsuccessfull");
        // client.release();
        // return res.status(200).json({success:false,msg:error})
        return error;
    }
    finally{
        //console.log("decrypt finished.");
    }
}


module.exports={
    decipher,
    cipher
    
}
