function writeResult(status,msg,data,count) {
    return JSON.stringify({status:status,msg:msg,data:data,count:count});
}
module.exports.writeResult = writeResult;
