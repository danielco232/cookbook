var is_logged_in = false;
var data;

    const url = "http://raw.githubusercontent.com/danielco232/cookbook/master/json/db.json";
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        data = request.response;

        $("#login_button").click(function() {
            let username = $("#username").val();
            let password = $("#password").val();
            
            const users = data["users"];
    
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
    
        $(".category").click(function(){
            window.location.href = "category.html";
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
    }


/*
    $("recipe").click(function(){
        let recipe = $(this).text();

        $("#title").text(recipe);

        $()
    });*/
