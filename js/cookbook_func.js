$(document).ready(function(){
    $("#login_button").click(function() {
        let url = 'https://github.com/danielco232/cookbook/blob/master/users.json';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
        const users = request.response;
        };
        
        let username = $("#username").val();
        let password = $("#password").val();
        
        alert(users[1]["username"]);
    });
});