// id_gen.js - အပြီးအစီး ကုဒ်
const crypto = require('crypto');

/**
 * ပိုင်ရှင်က ဖုန်းနံပါတ်နှင့် နာမည်ထည့်လိုက်လျှင် 
 * သီးသန့် ID တစ်ခု ထုတ်ပေးခြင်း
 */
function generateUniqueID(prefix = "MB") {
    // အချိန်နှင့် Random စာသားပေါင်းပြီး ID ထုတ်ခြင်း
    const timestamp = Date.now().toString().slice(-4);
    const randomStr = crypto.randomBytes(2).toString('hex').toUpperCase();
    
    // ဥပမာ - MB-4521-A2B5
    return `${prefix}-${timestamp}-${randomStr}`;
}

module.exports = { generateUniqueID };
