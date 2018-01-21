$( document ).ready(function() {
    console.log( "ready!" );
var user  = {
    itemsAte: []
}
var tempDbItem = {}
$('.itemsToSelect').hide()
// var queryURL = "https://api.nutritionix.com/v1_1/search/" + food +  
// "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories"
// "%2Cnf_total_fat&appId=df6ed4b5&appKey=54fbf2d01124a030dbef2fa24d18f3d3"

function getResult(userInput){
    $.ajax({
        url: "https://api.nutritionix.com/v1_1/search/" + userInput +  
        "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=df6ed4b5&appKey=54fbf2d01124a030dbef2fa24d18f3d3",
        method: "GET"
      }).done(function(response) {
                /*
                brand_name
                item_name
                nf_calories
                nf_serving_size_qty*/ 
                //goes into the api response and gets the data for calories brand name and item name         
                let TotalData = response.hits.reduce(function(a,b,i){
                    a[i] = {}
                    a[i]['brand_name'] = b.fields['brand_name']
                    a[i]['item_name'] = b.fields['item_name'] 
                    a[i]['nf_calories'] = b.fields['nf_calories'] 
                    a[i]['nf_serving_size_qty'] = b.fields['nf_serving_size_qty']    
                    return a
                },{}) 
                // store temp for each item user is goint to be selected from 
                tempDbItem = TotalData
                $('.itemsToSelect').empty()
                Object.keys(TotalData).forEach(function(itemid){
                    // console.log(TotalData[itemid].item_name)
                    // console.log(TotalData[itemid].brand_name)
                    $('.itemsToSelect').show()
                    
                    $('.itemsToSelect').append(`
                        <option class=${itemid}> ${TotalData[itemid].item_name} ${TotalData[itemid].brand_name}  </option>
                    `)
                })
    // searchBar


                

        // console.log(TotalData)


        
      });
}


$('.itemsToSelect').change(function() {

    console.log('Hello')

    
    console.log($(".itemsToSelect option").filter(":selected").val())
    var idOfItem = $(".itemsToSelect option").filter(":selected").attr('class')
    var WhatUserAte = tempDbItem[idOfItem]
    user.itemsAte.push(WhatUserAte)

    // this is your user 
    console.log(user)

     /**
      * 

        Now you have a user 
    TO DOS
        Create a user model 
        Submit user to this model
        and generate view based of the user

      */
        $.ajax({
            type: "POST",
            url: 'api/test',
            data: user
          }).done(function(response) {
            console.log(response);
          })


    // and here you can push iser to DB 


    //Use $option (with the "$") to see that the variable is a jQuery object
    // var $option = $(this).find('option:selected');
    // //Added with the EDIT
    // var value = $option.val();//to get content of "value" attrib
    // var text = $option.text();//to get <option>Text</option> content
});
// $(document).on('option','select',function(e){
//     e.preventDefault();
//     console.log(e)        
// })
// $('option').on('select',function(e){
//     console.log(e)
// })

$('.mainSearch').on('click',function(e){
    e.preventDefault();
    var formVal = document.getElementById('searchBar').value;
    console.log('Searching for ', formVal)
    getResult(formVal);
})


function searchValue(){
    var formVal = document.getElementById('searchBar').value;
    getResult(formVal);
    
}
$('#searchForm').submit(function(e){
    e.preventDefault();
})

})
