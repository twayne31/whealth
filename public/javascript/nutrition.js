$(document).ready(function () {
    console.log("ready!");

    reloadFoodChoices();

    $('.ui.search')
        .search({
            apiSettings: {
                url: "https://api.nutritionix.com/v1_1/search/{query}?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=df6ed4b5&appKey=54fbf2d01124a030dbef2fa24d18f3d3",
                onResponse: function (response) {
                    // translate API response to work with search
                    var results = response.hits.slice(0, 8).map(function (item, index) {
                        return {
                            id: item._id,
                            title: `${item.fields.item_name} ${item.fields.brand_name}`,
                            description: `${item.fields.nf_serving_size_qty} ${item.fields.nf_serving_size_unit} ${item.fields.nf_calories} calories`,
                            fields: item.fields,
                        };
                    });
                    return {
                        results
                    };
                },
            },
            onSelect: function (selected, results) {
                console.log('results', results);
                console.log('selected', selected);
                $.ajax({
                    url: "/api/foodChoices",
                    method: "POST",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        QTY: selected.fields.nf_serving_size_qty,
                        Unit: selected.fields.nf_serving_size_unit,
                        Meal: '', // NOTE: low priority, let's do this after EVERYTHING ELSE IS WORKING
                        Food: selected.fields.item_name,
                        Calories: selected.fields.nf_calories,
                        Weight: selected.fields.nf_serving_weight_grams, // NOTE: weight isn't available in instant search API, LOW PRIORITY
                        Food_Group: null,
                    })
                }).done(function (foodChoicesResponse) {
                    console.log(foodChoicesResponse)

                }).fail(function (error) {
                    console.error(error);
                });

                // TODO, nice to have, LOW priority: GET `https://api.nutritionix.com/v1_1/item?id=${selected.id}` for nutrition label data
            },
            minCharacters: 3
        });
});


function reloadFoodChoices() {
    $.ajax({
        url: "/api/all",
        method: "GET",
    }).done(function (allFoodChoices) {
        console.log(allFoodChoices)
        // jquery select your container
        var container = $('#foodChoicesList');
        // clear container
        container.empty();
        // forEach loop over allFoodChoices prepending/appending to container var
        if (allFoodChoices.length === 0) {
            container.html(`
                            <h2>Search for your food choice above</h2>
                            `);
        } else {
            allFoodChoices.forEach(function (item) {
                var foodChoice = $('<div>').addClass("foodi");
                foodChoice.html(`
                                <h4>${item.Food}</h4>
                                <div>${item.Qty} ${item.Unit} ${item.Calories} calories</div>
                                `);
                var mealChoices = $('<div class="content">');

                var deleteFoodChoiceBtn = $(`
                <button class="negative ui icon button" data-item-id="${item.id}">
                  <i class="trash icon"></i>
                </button>
            `);

                foodChoice.append(deleteFoodChoiceBtn);
                container.append(foodChoice);


                ;
            })
        }
        //
    }).fail(function (error) {
        console.error(error);
    });
}

// function deleteFoodChoice() {
//     var id = $(this).attr('data-item-id');
//     $.ajax({
//             method: "DELETE",
//             url: "/api/foodChoices" + id
//         })
//         .then(function () {
//             reloadFoodChoices();
//         });


//     deleteFoodChoiceBtn.on('click', function () {
//         $( ".foodi" ).remove();
//         console.log('DELETE', id);
//         reloadFoodChoices();
//     });
// }