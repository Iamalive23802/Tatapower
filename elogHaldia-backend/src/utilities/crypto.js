
const CryptoJS = require("crypto-js");

async function decipher(ciphertext)
{
    try{
        var base64Decrypted = ciphertext;
        let myKey = 'elog208361'
        let iv = CryptoJS.enc.Utf8.parse('elog208361'.substring(0, 16))
        var result = CryptoJS.AES.decrypt(
                       base64Decrypted,CryptoJS.enc.Utf8.parse(myKey),
                       { iv: iv, // pass IV
                       mode: CryptoJS.mode.CTR,                      // apply CTR (aka SIC)
                       padding: CryptoJS.pad.Pkcs7                   // apply PKCS#7 (CryptoJS default)
                       }
                       );
                       console.log(result.toString());                   // 54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67   // padding removed
                       console.log(result.toString(CryptoJS.enc.Utf8));
        return result.toString(CryptoJS.enc.Utf8);  
    }
    catch(error)
    {
        console.log("error in decryption",error);
        // return res.status(200).json({success:false,msg:error})
        return error;
    }
    finally{
       // console.log("decrypt finished.");
    }
}


module.exports={
    decipher 
}
