/*if(window.location.href.split("/").pop() != "login.html" && !sessionStorage.getItem("username"))
    window.location.href = "login.html";
*/
$(document).ready(function(){
    const url = "http://raw.githubusercontent.com/danielco232/cookbook/master/json/db.json";
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        const users = request.response["users"];
        const recipes = request.response["recipes"];

        $("#login_button").click(function() {
            let username = $("#username").val();
            let password = $("#password").val();

            for(let i = 0; i < users.length; i++){
                    if (users[i]["username"] == username && users[i]["password"] == password){
                        sessionStorage.setItem("username", username);
                        break;
                    }
                }
                
                if (sessionStorage.getItem("username"))
                    window.location.href = "home.html";
                else
                    $("#message").text("username or password are incorrect.");
        });

        $(".category").click(function(){
            window.location.href = "category.html";
            $(document).ready(function(){
            let category = $(this).text();

            const recipes = data["recipes"];
            alert(recipes)

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
        });
    }


    /*
    $("recipe").click(function(){
        let recipe = $(this).text();

        $("#title").text(recipe);

        $()
    });*/
});