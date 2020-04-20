import * as json from "json\\users.json"

var is_logged_in = false;
var recipes;

/*$.getJSON("recipes.json", function(result){
    recipes = result;
});*/

$(document).ready(function(){
    $("#login_button").click(function() {
        let username = $("#username").val();
        let password = $("#password").val();

        console.log(json);

        /*$.getJSON(".\\json\\users.json", function(result){
        alert("hello world");
           const users = result;
           
           for(let i = 0; i < users.length; i++){
               if (users[i]["username"] == username && users[i]["password"] == password){
                   is_logged_in = true;
                   break;
               }
           }
           
           if (!is_logged_in){
               $("#message").text("username or password are incorrect.");
           }
        });
        for(let i=0; i<2; i++){
            alert(i);
        }*/
    });

    $("#category").click(function(){
        let category = $(this).text();

        $("#title").text(category);

        for(let i = 0; i < recipes.length; i++){
            if (recipes[i]["category"] == category){
                $("#data").html("<div class='post-preview'>");
                $("#data").html("<h3 class='post-title'><a href='recipe.html' id='recipe'>" + recipes[i]["name"] + "</a></h3>");
                $("#data").html("<br>");
                $("#data").html("<p class='post-meta'>" + recipes[i]["calories"] + " calories per serving</p>");
                $("#data").html("<hr></div>");
            }
        }
    });

    $("recipe").click(function(){
        let recipe = $(this).text();

        $("#title").text(recipe);

        $()
    });
});