var dataUse = function(data) {

        // Explizite Methode
        //data.forEach(function (element, i) {
        //    console.log(element.ip);
        // });

        //So läuft foreach intern
        // Array.prototype.forEach = function(callback) {
        //  ....
        //  callback(val, index);
        // };

        var code = data.map((val, index) => {
                //Explizite Methode, jedes Attribut einzeln aufschreiben
                //return '<tr><td>'+val.ip +'</td><td>' + val.workload + '</td></tr>';

                var wl;
                if(val.workload===0){
                   wl =    '<label class="switch">'+
                           '<input type="checkbox">'+
                           '<div class="slider round"></div>'+
                           '</label>';
                } else{
                 wl =      '<label class="switch">'+
                           '<input type="checkbox" checked>'+
                           '<div class="slider round"></div>'+
                           '</label>';
                }


                //Einzelne Attribute des Array-Objekts werden zusammengefügt mit join
                return '<tr><td>' + Object.values(val).join('</td><td>') + '</td>'+'<td>'+wl+'</td></tr>';

            }).join('\n');


console.log(code);

return code;

};

        /*    var myarr = data.filter(function(val, index) {
              return val.ip !== '127.0.0.1';
            }).map(function(val, index) {
              return '<td>' + val.ip + '</td>...<td>val.workload...</td>';
            });

            var html_code = '<tr>' + myarr.join('</tr><tr>') + '</tr>';
        */







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
              element.innerHTML =   dataUse(data);


            }

        };

        xhr.send(null);
