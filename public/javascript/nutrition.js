$( document ).ready(function() {
    console.log("ready!");

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
                    return {results};
                },
            },
            onSelect: function (selected, results) {
                console.log('results', results);
                console.log('selected', selected);
                // TODO, HIGH PRIORITY: add item to global data var that will be sent to API backend
                $.ajax({
                    url: "/api/foodChoices",
                    method: "POST",
                    data: {
                        QTY: selected.fields.nf_serving_size_qty,
                        Unit: selected.fields.nf_serving_size_unit,
                        Meal: '', // NOTE: low priority, let's do this after EVERYTHING ELSE IS WORKING
                        Food: selected.fields.item_name,
                        Calories: selected.fields.nf_calories,
                        Weight: '', // NOTE: weight isn't available in instant search API, LOW PRIORITY
                        Food_Group: '',
                    }
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