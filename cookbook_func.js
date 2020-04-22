/*if(window.location.href.split("/").pop() != "login.html" && !sessionStorage.getItem("username"))
    window.location.href = "login.html";
*/

function create_string(str,i){
    str += "<div class='post-preview'>";
    str += "<h3 class='post-title'><a href='recipe.html' id='recipe'>" + recipes[i]["name"] + "</a></h3>";
    str += "<p class='post-meta'>" + recipes[i]["calories"] + " calories per serving</p>";
    str += "<hr></div>";
    return str;
}

$(document).ready(function(){
    //gets the data from json file using http get request
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

            //tries to find the user
            for(let i = 0; i < users.length; i++){
                    if (users[i]["username"] == username && users[i]["password"] == password){
                        sessionStorage.setItem("username", username);
                        break;
                    }
                }
                
                //user exists
                if (sessionStorage.getItem("username"))
                    window.location.href = "#home";
                //user doesn't exist    
                else 
                    $("#message").text("username or password are incorrect.");
        });

        $(".category").click(function(){
            let html_str = "";
            let category = $(this).text();
            
            window.location.href="#category";
            $("#title").text(category);

            //creates the string and adds it to the html file
            for(let i = 0; i < recipes.length; i++){
                if (recipes[i]["category"] == category)
                    html_str = create_string(html_str,i)
            }
            $("#data").html(html_str);
        });

        $("recipe").click(function(){
            let html_ingredients = "";
            let recipe = $(this).text();

            window.location.href="#recipe";
            $("#title").text(recipe);
    
            //finds the correct recipe from all
            for(var i = 0; i < recipes.length; i++){
                if (recipes[i]["name"] == recipe)
                    break;
            }
            
            //creates ingredients string
            for(let j = 0; j < recipes[i]["ingredients"].length; j++)
                html_ingredients += "* " + recipes[i]["ingredients"][j] + "<br>";
            
            //adds all data to the html file
            $(".ingredients").html(html_ingredients);
            $(".instructions").html(recipes[i]["instructions"]);
            $(".recipe_img").attr("src", "../img/"+recipes[i]["img"]);
            $(".servings").append(recipes[i]["nutrition_facts"]["servings"]);
            $(".cals").append(recipes[i]["nutrition_facts"]["cals"]);
            $(".fat").append(recipes[i]["nutrition_facts"]["fat"]);
            $(".carb").append(recipes[i]["nutrition_facts"]["carbs"]);
            $(".sugar").append(recipes[i]["nutrition_facts"]["sugar"]);
            $(".protein").append(recipes[i]["nutrition_facts"]["protein"]);
        });

        $(".search").keypress(function(e){
            //if user has pressed enter
            if(e.which == 13) {
                let search_str = $(".search").val();

                window.location.href="#category";
                $("#title").text(search_str);
    
                //creates the string and adds it to the html file
                for(let i = 0; i < recipes.length; i++){
                    if (recipes[i]["name"].indexOf(search_str) >= 0)
                        html_str = create_string(html_str,i)
                }
                if(html_str == "")
                    html_str = "No mathed recipes."
                $("#data").html(str);
            }
        });
    }
});