$(document).ready(function(){
    $("#login_button").click(function() {
        let url = 'https://github.com/danielco232/cookbook/blob/master/json/users.json';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const users = request.response;
        };
        
        let username = $("#username").val();
        let password = users[1]["username"];
        
        alert(users[1]["username"]);
    });
});