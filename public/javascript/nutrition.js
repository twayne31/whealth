
// var queryURL = "https://api.nutritionix.com/v1_1/search/" + food +  
// "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories"
// "%2Cnf_total_fat&appId=df6ed4b5&appKey=54fbf2d01124a030dbef2fa24d18f3d3"
var food = "1 slice pepperoni pizza";  

function getResult(userInput){
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + userInput +  
        "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=df6ed4b5&appKey=54fbf2d01124a030dbef2fa24d18f3d3",
        method: "GET"
      }).done(function(response) {
        console.log(response);
        console.log(response.Runtime);
      });
}


function searchValue(){
    var formVal = document.getElementById('searchBar').value;
    getResult(formVal);
}
$('#searchForm').submit(function(e){
    e.preventDefault();
})
