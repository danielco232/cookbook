$(document).ready(function(){
    $("#login_button").click(function() {
        let requestURL = "\\json\\n.json";
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const superHeroes = request.response;
            alert("fucking shit");
          }
    });
    
});