// const { log } = require('console');
const express = require('express')

const router = express.Router()
const email = require('node-email-extractor').default;

const fs = require('fs').promises;
const path = require('path');

async function extract(url) {
    try {
        const data = await email.url(url);
        console.log(data);

        for (let i = 0; i < data.emails.length; i++) {
            const element = data.emails[i];
            const filePath = path.join(__dirname, 'message.txt');

            await fs.appendFile(filePath, element + '\n');
        }

        console.log('Saved!');
    } catch (err) {
        console.error(err);

    }
}

router.post('/fetch-emails', async (req, res) => {
    try {
        const { startIndex, endIndex, url } = req.body;

        async function fetchAll(startIndex, endIndex) {
            const promises = [];

            for (let i = startIndex; i <= endIndex; i++) {
                // let url = `https://www.epch.in/index.php?option=com_jumi&fileid=4&Itemid=162&page=${i}`;
                // let url1 = `${url}`
               let url1 = url.replace("surabhi", `${i}`);
                console.log(url1);
                console.log(i);
                promises.push(extract(url1));
            }

            await Promise.all(promises);
            console.log("All emails fetched successfully");
        }

        await fetchAll(startIndex, endIndex);
        res.json({ message: 'Emails fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;