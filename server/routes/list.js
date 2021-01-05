const express = require('express');
const router = express.Router();
const axios = require('axios');

const fs = require('fs');

require('dotenv').config();

//const data = "action=GetProductsByName&product_name[]=ביסלי&limit=2&api_key=a9a90c30415df0e3e749467e5334e70eb566407b";

//const data = "action=GetProductsByName&product_name[]=במבה)&limit=2&api_key=a9a90c30415df0e3e749467e5334e70eb566407b";


router.post('/findItemByName', async () => {
//const data = "action=GetProductsByName&product_name[]=יסלי)&limit=3&api_key=a9a90c30415df0e3e749467e5334e70eb566407b";


    const res = await axios.post('https://api.superget.co.il/', "action=GetProductsByName&product_name[]=ביסלי&limit=2&api_key=a9a90c30415df0e3e749467e5334e70eb566407b",
        {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "charset" : "utf-8"
            }
        })
        .then((data) => {
            fs.writeFile('./test.txt',  JSON.stringify(data.data), function (err) {
                if (err) return console.log(err);
                console.log('Data in file!');
              });
            console.log('data', data.data)
        })
        .catch((err) => {
            console.log('error', err)
        })

});

module.exports = router;

