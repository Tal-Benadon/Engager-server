const { default: axios } = require("axios")




async function sendRequstToCardkom(data){
    
    const body = {
        "TerminalNumber": 151048  ,
        "ApiName": "CHpqcSCn4IbDRQMBhSB9 ",
        "ReturnValue": "Z12332X",
        "Amount": 10.5,
        "SuccessRedirectUrl": "https://www.google.com",
        "FailedRedirectUrl": "https://www.yahoo.com",
        "WebHookUrl": "https://www.mysite.com/CardComLPWebHook",
        "Document": {
            "To": "test client",
            "Email": "test@testDomain.com",
            "Products": [
                {
                    "Description": "רפאל",
                    "UnitCost": 10.5
                }
            ]
        }

    }
  const res = await  axios.post("https://secure.cardcom.solutions/api/v11/LowProfile/Create" , body)
  
return res.data.Url

  
  
   


    //  לתפוס url של הסליקה ולשלוח לקיילנט שיפתח אותו בifrem 
}
sendRequstToCardkom()

    module.exports = {sendRequstToCardkom}
