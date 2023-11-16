const express = require('express');
const extractRoute = require('./routes/extractRoute')

const app = express();
const email = require('node-email-extractor').default;
const fs = require('fs').promises;  
const path = require('path'); 
app.use(express.json())
app.use('/api/extract', extractRoute)

const cors = require('cors')

app.use(cors (
 {
	origin:"http://localhost:3000",
	credentials:true,
  }
))

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin',`${process.env.React_ORIGIN}`);
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
// async function extract(url) {
//     try {
//         const data = await email.url(url);
//         console.log(data);

//         for (let i = 0; i < data.emails.length; i++) {
//             console.log(i);
//             const element = data.emails[i];
//             const filePath = path.join(__dirname, 'message.txt');
            
//             await fs.appendFile(filePath, element + '\n');
//         }

//         console.log('Saved!');
//     } catch (err) {
//         console.error(err);
        
//     }
// }

// async function fetchAll1() {
//     for (let i = 0; i < 10;i++) {
//         let url = `https://www.epch.in/index.php?option=com_jumi&fileid=4&Itemid=162&page=${i}`;
//         console.log(url);
//         console.log(i);
//         await extract(url).then(() => {
//             console.log("Helljicj");
//         });
//     }

// }
// fetchAll1()


// var fk = (async()=>{
//     let url = `https://www.epch.in/index.php?option=com_jumi&fileid=4&Itemid=162&page=1`;
//         console.log(url);
//         var data = await email.url(url)
//         console.log(data);
// })

// fk();

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server runnning on ${port}`))