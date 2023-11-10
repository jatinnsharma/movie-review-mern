// Request will have the information,whatever that is,comming form our frontend.
// Response : whatever you want to send to your frontend will handle by response. 
exports.create = (req,res)=>{
    res.send("<h2>I will create later.</h2>")
    res.json({user:req.body});
}

