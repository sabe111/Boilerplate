// Explizite Methode
//data.forEach(function (element, i) {
//    console.log(element.ip);
// });

//So läuft foreach intern
// Array.prototype.forEach = function(callback) {
//  ....
//  callback(val, index);
// };

/*    var myarr = data.filter(function(val, index) {
      return val.ip !== '127.0.0.1';
    }).map(function(val, index) {
      return '<td>' + val.ip + '</td>...<td>val.workload...</td>';
    });
    var html_code = '<tr>' + myarr.join('</tr><tr>') + '</tr>';
*/

/*   Alte Variante für Button
      if (val.workload === 0) {
        wl = '<label class="switch">' +
            '<input type="checkbox">' +
            '<div class="slider round"></div>' +
            '</label>';
    } else {
        wl = '<label class="switch">' +
            '<input type="checkbox" checked>' +
            '<div class="slider round"></div>' +
            '</label>';
    }
  */

/* var dataUse = function(data) {

    var code = data.map((val, index) => {
        //Explizite Methode, jedes Attribut einzeln aufschreiben
        //return '<tr><td>'+val.ip +'</td><td>' + val.workload + '</td></tr>';

        var wl;

      wl = '<button type="button" id='+(val.workload === 0 ? "inaktiv" : "aktiv")+'>'+(val.workload === 0 ? "Start" : "Stop")+'</button>'


        //Einzelne Attribute des Array-Objekts werden zusammengefügt mit join
        return '<tr><td>' + Object.values(val).join('</td><td>') + '</td>' + '<td>' + wl + '</td></tr>';

    }).join('\n');


    console.log(code);

    return code;

};

var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://botnet.artificial.engineering:80/api/Status');

xhr.responseType = 'json';
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Token', 'my-token-123');

xhr.onload = function() {

    var data = xhr.response;
    if (data !== null) {
        console.log(data); // Parsed JSON object
        var element = document.querySelector('#status tbody');
        element.innerHTML = dataUse(data);

    }

};

xhr.send(null);

*/

var fillApiStatus = function() {
    fetch('http://botnet.artificial.engineering:80/api/Status').then((response) => {
        return response.json();
    }).then(function(json) {
        console.log(json);
        var element = document.querySelector('#status tbody');
        element.innerHTML = json.map((val, index) => {

            let tdData = '<button type="button" id=' + (val.workload === 0 ? "inaktiv" : "aktiv") +" onclick = 'startStop(this , "+val.id+")'" +'>' + (val.workload === 0 ? "Start" : "Stop") + '</button>'

            return '<tr><td>' + Object.values(val).join('</td><td>') + '</td>' + '<td>' + tdData + '</td></tr>';
        }).join('\n');

    });

}

var startStop = (function(element, id) {
 if(element.id=='aktiv'){
   updateStatus(id , 'false');
 } else{
   updateStatus(id, 'true');
 }

});

var updateStatus = (function(id, status){
  var data = {id : id, status : status};
  var xhrPost = new XMLHttpRequest();
  xhrPost.open('POST' , 'http://botnet.artificial.engineering/api/Status');
  xhrPost.setRequestHeader('Content-Type', 'application/json');
  xhrPost.send(JSON.stringify(data));
  fillApiStatus();


});

fillApiStatus();
