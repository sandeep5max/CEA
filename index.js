
const httpRequest = require('request');
const bodyparser = require('body-parser')
const url = require('url');
const express = require('express');
const app = express();

var options = {
    headers : {
        'Authorization': 'User HP/PL9hbN7Fg7HXaEo5e4W4CGQZCgC/wl3rokGGa3U4=, '+
                    'Organization be91425f4be7ae7643a177ac265e8e3e, '+
                    'Element /lByfU7DBQZ7ew0oEefWBGbDQc3PgnzVSgcXGVpdnKc=',
    }
}

// app.use(bodyparser.urlencoded({
//     extended: true,
// }))

app.get('/listDirectory', function(request, response){

    var url_parts = url.parse(request.url, true)
    let id = url_parts.query.input;
    console.log(id);
    let folderContents;
    if(isNaN(id))
        folderContents = 'https://staging.cloud-elements.com/'+
                        'elements/api-v2/folders/contents?path='+id;
    else
        folderContents = 'https://staging.cloud-elements.com/'+
                        'elements/api-v2/folders/'+id+'/contents';

    console.log(folderContents);
    httpRequest.get(folderContents, options, function(err, res, body){
        if(!err) {
            console.log('folderContents = ' + res.statusCode);
            let pay = JSON.parse(body)
            response.send(pay);
        }
        else {
            console.log('some error occured');
        }
    });
});

app.get('/downloadFile', function(request, response) {

    var url_parts = url.parse(request.url, true)
    let id = url_parts.query.input;
    console.log(id);
    let downloadFile = '';
    if(isNaN(id)){
        downloadFile = 'https://staging.cloud-elements.com/'+
                        'elements/api-v2/files/links?path='+
                        id +
                        '&access-level=collaborators';
    }
    else {
        downloadFile = 'https://staging.cloud-elements.com/'+
        'elements/api-v2/files/'+
        id +
        '/links?access-level=collaborators';
    }
    console.log(downloadFile);
    httpRequest.get(downloadFile, options, function(err,res, body){
        if(!err) {
            console.log('Download file' + id + ' = ' + res.statusCode);
            let pay = JSON.parse(body);
            response.send(pay);
        }
        else {
            console.log('error');
        }
    })
});

app.get("/list", function(request, response) {
    response.sendFile(__dirname + '/listDirectory.html');
});

app.get("/download", function(request, response) {
    response.sendFile(__dirname + '/downloadFile.html');
});

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.listen('8080', function(){
    console.log('Server is running on port 8080');
});