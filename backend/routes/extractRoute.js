// const { log } = require('console');
const express = require('express')

const router = express.Router()
const email = require('node-email-extractor').default;

const fs = require('fs');
const path = require('path');

async function extract2(url,fileName) {
    console.log("ectract2.0");
    try {
        await email.url(url)
            .then(async (data) => {
                for (let i = 0; i < data.emails.length; i++) {
                    const element = data.emails[i];
                    // const filePath = path.join(__dirname, fileName+'.txt');
                    const filePath = __dirname + '/../files/' + fileName+'.txt';
                    await fs.appendFile(filePath, element + '\n', function (err) {
                        if (err) throw err;
                    });
                }
                console.log('Saved! for url: ',url);
            })
            .catch((err) => {
                console.log("error to fetch:", err);
            })

    } catch (err) {
        console.error(err);

    }
}


router.post('/fetch-emails', async (req, res) => {
    console.log("fetch-emails route is called");
    try {
        let { startIndex, endIndex, url,fileName } = req.body;
        const promises = [];
        console.log(startIndex, endIndex, url,fileName);

        for (let i = startIndex; i <= endIndex; i++) {
            let url1 = url.replace("{index}", i);
            console.log(url1);
            console.log(i);
            promises.push(extract2(url1,fileName));
        }

        await Promise.all(promises);
        console.log("All emails fetched successfully");

        res.json({ message: 'Emails fetched successfully' });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
        return res.status(201).send({ "Ok": "notOk" })
    }
});

router.post('/test', (req, res) => {
    console.log(req.body);
    console.log('test route is called');
    return res.send("ok")
})
router.get('/download/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = __dirname + '/../files/' + fileName+'.txt';
    // const filePath = __dirname + '/'+req.params.filePath+'';

    res.download(filePath, fileName+'.txt', (err) => {
        if (err) {
            // Handle errors, e.g., file not found
            console.error(err);
            res.status(404).send('File not found');
        }
    });
})


router.get('/delete/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = __dirname + '/../files/' + fileName+'.txt';
    // const filePath = __dirname + '/'+req.params.filePath+'';

    fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(404).send("please enter a valid file")
        } else {
          console.log('File deleted successfully');
          return res.status(200).send('File deleted successfully')
        }
      });
})

module.exports = router;