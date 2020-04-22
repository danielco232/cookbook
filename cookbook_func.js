/*if(window.location.href.split("/").pop() != "login.html" && !sessionStorage.getItem("username"))
    window.location.href = "login.html";


function create_string(str,i){
    str += "<div class='post-preview'>";
    str += "<h3 class='post-title'><a href='recipe.html' id='recipe'>" + recipes[i]["name"] + "</a></h3>";
    str += "<p class='post-meta'>" + recipes[i]["calories"] + " calories per serving</p>";
    str += "<hr></div>";
    return str;
}
*/
$(document).ready(function(){
    const url = "https://raw.githubusercontent.com/danielco232/cookbook/master/db.json";
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
            //let str = "";
            let category = $(this).text();
            window.location.href="category.html";
            $("#category_name").text(category);
           /* for(let i = 0; i < recipes.length; i++){
                if (recipes[i]["category"] == category)
                    str = create_string(str,i)
            }
            $("#data").html(str);
            */
        });
    }


    /*
    $("recipe").click(function(){
        let recipe = $(this).text();

        $("#title").text(recipe);

        $()
    });*/
});