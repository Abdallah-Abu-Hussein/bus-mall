'use strict'
let pro_1 = document.getElementById('pro_1');
let pro_2 = document.getElementById('pro_2');
let pro_3 = document.getElementById('pro_3');
let attempts = document.getElementById('attempts');
let result = document.getElementById('results');
let image_container = document.getElementById('image_container');
let product_list = [ 'bag','banana','boots','breakfast','bubblegum','bathroom','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can',
'wine-glass'];
let all_products =[];
let maxAttempts = 25;
let attempt = 0;

function Product(pro_name){
    this.pro_name = pro_name.split('.')[0];
    this.Img = `images/${pro_name}.jpg`;
    this.views = 0;
    this.clicks = 0;
    all_products.push(this);

}
for(let i = 0; i < product_list.length; i++){
    new Product(product_list[i]);
}
function make_random_images(){
   return Math.floor(Math.random() * product_list.length);
}
let pro1_index ;
let pro2_index ;
let pro3_index ;

function render_images(){
    document.getElementById('button1').style.visibility = 'hidden';
    pro1_index = make_random_images();
    pro2_index = make_random_images();
    pro3_index = make_random_images();

    while(pro1_index === pro2_index || pro1_index === pro3_index ||pro2_index === pro3_index){
        pro1_index = make_random_images();
        pro3_index = make_random_images();
    }
    pro_1.setAttribute('src',all_products[pro1_index].Img);
    pro_2.setAttribute('src',all_products[pro2_index].Img);
    pro_3.setAttribute('src',all_products[pro3_index].Img);

    all_products[pro1_index].views++;
    all_products[pro2_index].views++;
    all_products[pro3_index].views++;
    
}
render_images();

pro_1.addEventListener(`click`,clickHandler);
pro_2.addEventListener(`click`,clickHandler);
pro_3.addEventListener(`click`,clickHandler);


function clickHandler(event){
    if (attempt < maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'pro_1') {
            all_products[pro1_index].clicks++;

        } if (clickedImage === 'pro_2') {
            all_products[pro2_index].clicks++

        }if(clickedImage === 'pro_3') {
            all_products[pro3_index].clicks++;
        }
        render_images();
        console.log(all_products);
        attempt++;
    } else {
    showButton();
    pro_1.removeEventListener('click', clickHandler);
    pro_2.removeEventListener('click', clickHandler);
    pro_3.removeEventListener('click', clickHandler);

    }
}
    
function showButton() {
    document.getElementById('button1').style.visibility = 'visible';
    chartElement();

}

    let my_results = function(){           
        let data = document.getElementById('data');
        let List = document.createElement('ul');
        data.appendChild(List);
    
        for (let i = 0; i < all_products.length; i++) {        
            let liEl = document.createElement('li');
            List.appendChild(liEl);
            liEl.textContent = 
            `${all_products[i].pro_name} had ${all_products[i].clicks} votes and  was seen ${all_products[i].views} times.`;
        }
    
    }
    function chartElement() {

        let nameArray = [];
        let clicksArray = [];
        let viewsArray = [];
    
        for (let i = 0; i < all_products.length; i++) {
            nameArray.push(all_products[i].pro_name);
            clicksArray.push(all_products[i].clicks);
            viewsArray.push(all_products[i].views);
        }
        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nameArray,
                datasets: [
                    {
                        label: '# of Votes',
                        data: clicksArray,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
                    {
                        label: '# of views',
                        data: viewsArray,
                        backgroundColor: 'rgba(255, 99, 132, 1.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
    
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

