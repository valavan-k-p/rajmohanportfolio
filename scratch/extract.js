const fs = require('fs');
const html = fs.readFileSync('c:/Users/91868/Desktop/Rajmohan/rajmohanportfolio/public/images/tamil development/books/kuyil_paattu_webpage.html', 'utf8');
const match = html.match(/base64,(.*?)\"/);
if (match) {
    fs.writeFileSync('c:/Users/91868/Desktop/Rajmohan/rajmohanportfolio/public/images/tamil-development/books/kuyil_paattu_webpage.png', Buffer.from(match[1], 'base64'));
    console.log('Successfully saved png!');
} else {
    console.log('No base64 found.');
}
