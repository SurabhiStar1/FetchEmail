const email = require('node-email-extractor').default;

const fs = require('fs');
const { resolve } = require("path");
const path = require('path');

// const fileName = require("./message.txt")


async function extract(url) {
    console.log("4xtrate");
    return new Promise(async (res, rej) => {
        var data = await email.url(url)
        console.log("data");
        console.log(data);
        for (let i = 0; i < data.emails.length;i++) {
            console.log(i);
            const element = data.emails[i];
            // fs.writeFile(__dirname + 'message.txt', element + '\n', function (err) {
            fs.writeFile('message.txt', element + '\n', function (err) {
                if (err) console.log(err);
                console.log('Saved!');
            });
        }
        res();
    })
}

async function extract2(url) {
    try {
        const data = await email.url(url);
        console.log(data);

        for (let i = 0; i < data.emails.length; i++) {
            const element = data.emails[sfdgfi];
            const filePath = path.join(__dirname, 'message.txt');

            await fs.appendFile(filePath, element + '\n',function (err) {
                if (err) throw err;
                console.log('Saved!');
              });

        }

        console.log('Saved!');
    } catch (err) {
        console.error(err);

    }
}

async function fetchAll1() {
    const promise = [];
    for (let i = 1; i < 2;i++) {
        let url = `https://www.aepcindia.com/members/index.php`;
        console.log(url);
        console.log(i);
        promise.push(extract2(url));
    }
    await Promise.all(promise);

}
async function fetchAll2() {
    for (let i = 10; i <20;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll3() {
    for (let i = 20; i <30;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll4() {
    for (let i = 30; i <40;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll5() {
    for (let i = 40; i <50;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll6() {
    for (let i = 50; i <60;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll7() {
    for (let i = 60; i <70;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll8() {
    for (let i = 70; i <80;i++) {
        let url = `https://www.aepcindia.com/members/index.php?pageno=${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}
async function fetchAll9() {
    for (let i = 80; i <= 90;i++) {
        let url = `${i}`;
        console.log(url);
        console.log(i);
        await extract(url).then(() => {
            console.log("Helljicj");
        });
    }

}


fetchAll1();
// fetchAll2();
// fetchAll3();
// fetchAll4();
// fetchAll5();
// fetchAll6();
// fetchAll7();
// fetchAll8();
// fetchAll9();