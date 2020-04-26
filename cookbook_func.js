if(window.location.href.split("/").pop() != "login.html" && !sessionStorage.getItem("username"))
    window.location.href = "login.html";

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

        //loads data from sessionStorage into correct html page by url
        switch (window.location.href.split("/").pop()){
            case "category.html":
                $("#category_name").text(sessionStorage.getItem("category"));
                $("#data").html(sessionStorage.getItem("matched_recipes"));
                break;

            case "recipe.html":
                let ingredients_str = "";
                let index = sessionStorage.getItem("data_idx");
                $("#recipe_name").text(recipes[index]["name"]);

                //creates ingredients string
                for(let i = 0; i < recipes[index]["ingredients"].length; i++)
                ingredients_str += "* " + recipes[index]["ingredients"][i] + "<br>";
        
                //adds all data to the html file  
                $("#ingredients").html(ingredients_str);
                $("#instructions").html(recipes[index]["instructions"]);
                $("#recipe_img").attr("src", "../img/"+recipes[index]["img"]);
                $("#servings").append(recipes[index]["nutrition_facts"]["servings"]);
                $("#cals").append(recipes[index]["nutrition_facts"]["cals"]);
                $("#fat").append(recipes[index]["nutrition_facts"]["fat"]+"g");
                $("#carbs").append(recipes[index]["nutrition_facts"]["carbs"]+"g");
                $("#sugar").append(recipes[index]["nutrition_facts"]["sugar"]+"g");
                $("#protein").append(recipes[index]["nutrition_facts"]["protein"]+"g");
        }

        //creates the html with the recipes names
        function create_string(str,index){
            str += "<div class='post-preview'>";
            str += "<h3 class='post-title'><a href='recipe.html' class='recipe'>" + recipes[index]["name"] + "</a></h3>";
            str += "<p class='post-meta'>" + recipes[index]["nutrition_facts"]["cals"] + " calories per serving</p>";
            str += "<hr></div>";
            return str;
        }

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
                    window.location.href = "home.html";
                //user doesn't exist    
                else 
                    $("#message").text("username or password are incorrect.");
        });

        $(".category").click(function(){
            let matched_recipes = "";
            let category = ($(this).html().split("/").pop()).split(".")[0];
            
            //creates the string and saves it
            for(let i = 0; i < recipes.length; i++){
                if (recipes[i]["category"] == category)
                    matched_recipes = create_string(matched_recipes,i);
            }
            sessionStorage.setItem("category",category);
            sessionStorage.setItem("matched_recipes",matched_recipes);
        });

        $(".recipe").click(function(){
            let recipe = $(this).text();
            
            //finds the correct recipe from all and saves it's index
            for(var i = 0; i < recipes.length; i++){
                if (recipes[i]["name"] == recipe){
                    sessionStorage.setItem("data_idx",i);
                    break;
                }
            }

            
        });

        $("#search").keypress(function(e){
            //if user has pressed enter
            if(e.which == 13) {
                let matched_recipes = "";
                let search_str = $("#search").val();

                //creates the string and saves it
                for(let i = 0; i < recipes.length; i++){
                    if (recipes[i]["name"].toLowerCase().indexOf(search_str.toLowerCase()) >= 0)
                    matched_recipes = create_string(matched_recipes,i)
                }
                if(matched_recipes == "")
                    matched_recipes = "No matched recipes."
                
                sessionStorage.setItem("category",search_str);
                sessionStorage.setItem("matched_recipes",matched_recipes);

                window.location.href = "category.html";
            }
        });
    }
});