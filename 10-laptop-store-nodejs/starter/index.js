const fs = require("fs");
const http = require("http");
const url = require("url")

console.log("Start ...")

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
// console.log(__dirname)
const laptopData = JSON.parse(json)
// console.log(laptopData)

// now we create our server 
const server = http.createServer((req, res) => {

    // ROUTING : differt response to differnt URLs
    console.log("START ........")
    // const query = url.parse(req.url, true);
    // console.log(query)
    const pathName = url.parse(req.url, true).pathname;
    console.log(pathName)
    // const query = url.parse(req.url, true).query;
    // console.log(query);
    const id = url.parse(req.url, true).query.id;

    // PRODCUT OVERVIEW
    if (pathName === "/products" || pathName === "/") {
        res.writeHead(200, { "Content-type": "text/html" })
        // res.end("This is the response : products");
    

        fs.readFile(`${__dirname}/templates/template-overview.html`, "utf-8", (err, data) => {
            let overviewOutput = data;
    
            fs.readFile(`${__dirname}/templates/template-cards.html`, "utf-8", (err, data) => {
                const cardsOutput = laptopData.map (el => replaceTemplate(data, el)).join("");
                // console.log(cardsOutput);
                overviewOutput = overviewOutput.replace("{%CARDS%}", cardsOutput);
                res.end(overviewOutput);
            });  


        });        
        
    // LAPTOP DETAILS
    } else if (pathName === "/laptop" && id < laptopData.length) { // because laptopData is an ARRAY
        res.writeHead(200, { "Content-type": "text/html" })
        // res.end(`This is the response : LAPTOP ${id}`);
        fs.readFile(`${__dirname}/templates/template-laptop.html`, "utf-8", (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        } );

    // ROUTE for images 
    } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {

        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { "Content-type": "img/jpg" });
            res.end(data);
        });

    } else {
        res.writeHead(404, { "Content-type": "text/html" })
        res.end("URL not on the server : ERROR !!!!");
    }

    // console.log(req);
    // console.log(req.url);

    // console.log("Someone did access the server")
    // res.writeHead(200, {"Content-type" : "text/html"} )
    // res.end("This is the response");


})


server.listen(1337, "127.0.0.1", () => {
    console.log("listening for request now ...")
})


function replaceTemplate(originHtml, laptop) {
    // regex ... 
    let output = originHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName)
    output = output.replace(/{%IMAGE%}/g, laptop.image)
    output = output.replace(/{%PRICE%}/g, laptop.price)
    output = output.replace(/{%SCREEN%}/g, laptop.screen)
    output = output.replace(/{%CPU%}/, laptop.cpu)
    output = output.replace(/{%STORAGE%}/g, laptop.storage)
    output = output.replace(/{%RAM%}/g, laptop.ram)
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
    output = output.replace(/{%ID%}/g, laptop.id)
    return output;
}