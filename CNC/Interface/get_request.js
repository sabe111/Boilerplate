var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://botnet.artificial.engineering:80/api/Status');

xhr.responseType = 'json';
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Token', 'my-token-123');

xhr.onload = function() {

    var data = xhr.response;
    if (data !== null) {
        console.log(data); // Parsed JSON object
    }

};

xhr.send(null);
