/// <reference path="../../steps.d.ts" />

Feature('ProofOfConcept');

const cheerio = require('cheerio');
const fs = require('fs');

Scenario('My Audible Library', async (I,GoogleSheetsData) => {
  
    I.say(`Configure AUDIBLE_EMAIL, AUDIBLE_PASSWORD and AUDIBLE_BOOKS_FILE environment variables.`, 'magenta');

    I.amOnPage('https://www.audible.com/');
    
    I.click("Sign In");
    await I.wait(3);    

    I.fillField("Email (phone for mobile accounts)", secret(process.env.AUDIBLE_EMAIL) );
    I.fillField("Password", secret(process.env.AUDIBLE_PASSWORD));
    I.click('Sign In');

    I.waitForText('Library', 30); // Sometimes, we need to handle the captcha manually
    I.click('Library');

    I.scrollPageToBottom();    
    I.selectOption({'css':'[name="pageSize"]'}, "40");

    await I.wait(3);

    const htmlText = await I.grabHTMLFrom('html');        
    const $dom = cheerio.load(htmlText);      
    const books = [];    

    $dom('div#adbl-library-content-main').find( 'li.bc-list-item > a.bc-color-link' ).each( (index,element) => {
        let href = $dom(element).attr('href');     
        let text = $dom(element).text().trim().replace(/"/g, '\'');        
        
        if( href !== undefined ) {            
            href = `https://audible.com${href}`;                               
            books.push({text,href});            
            I.say(`${index}`, 'red');
            I.say(`${text}`, 'green');
            I.say(`${href}`,'blue');             
        }        
    });

    for( let book of books ) {
        I.amOnPage(book.href); // we need more detail info from the book's webpage
        I.waitForElement('li.bc-list-item.authorLabel > a', 5);
        book.author = ( await I.grabTextFrom('li.bc-list-item.authorLabel > a') ).toString().replace(/,/g, ' | ');                    
        I.say(book.author);
    }

    writeBooksToFile(books);     

}).tag('@poc').tag('@audible');

function writeBooksToFile(books, location=process.env.AUDIBLE_BOOKS_FILE) {
    if( location ) {        
        const booksFileStream = fs.createWriteStream(process.env.AUDIBLE_BOOKS_FILE);
        booksFileStream.write(`Book, Author, Link\n`);
        for( let {text, author, href} of books ) {                            
            booksFileStream.write(`\"${text}\", ${author}, ${href}\n`);
        }    
        booksFileStream.close();
    }
}