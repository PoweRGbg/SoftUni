function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick () {
      let input = JSON.parse(document.getElementById('inputs').getElementsByTagName('textarea')[0].value);
      let restaurants = {};
      input.forEach(restaurant => {
         let [name, workers] = restaurant.split(' - ');
         // console.log(name, workers);
         if(!restaurants.hasOwnProperty(name)){
            restaurants[name] = {};
         }
         restaurants[name].max = 0;
         workers = workers.split(", ");
         workers.forEach(worker => {
            let [wName, salary] = worker.split(' ');
            salary = Number(salary);
            restaurants[name][wName] = salary;
         });

         // calc max and average
         let keys = Object.keys(restaurants[name]);
         let total = 0;
         let numberOfWorkers = 0;
         let highest = 0;
         for (let index = 0; index < keys.length; index++) {
            const salary =Number(restaurants[name][keys[index]]); 
            if(keys[index] != 'max' && keys[index] != 'average'){
               total += salary;
               if(salary > highest){
                  highest = salary;
               }
               numberOfWorkers++;
            }
            
         }
         restaurants[name].average = total / numberOfWorkers;
         restaurants[name].max = highest;
         // console.log(restaurants[name]);
      });
      //all should be parsed here 
      let best = '';
      let highest = 0;
      let names = Object.keys(restaurants);
      for (let index = 0; index < names.length; index++) {
         const element = restaurants[names[index]];
         if(highest < element.average){
            best = names[index];
            highest = element.average;
         }
      }
      let workerText = '';
      names = Object.keys(restaurants[best]);
      names.sort((a, b) => restaurants[best][b]-restaurants[best][a]);
      for (let index = 0; index < names.length; index++) {
         const element = restaurants[best][names[index]];
         if(names[index] != 'max' && names[index] != 'average'){
            workerText += `Name: ${names[index]} With Salary: ${restaurants[best][names[index]]} `;
         }
      }
      
      bRestaurantLoc = document.getElementById('bestRestaurant').getElementsByTagName('p')[0];
      bRestaurantLoc.innerText = `Name: ${best} Average Salary: ${restaurants[best].average.toFixed(2)} Best Salary: ${restaurants[best].max.toFixed(2)}`;
      bRestaurantLoc = document.getElementById('workers').getElementsByTagName('p')[0];
      bRestaurantLoc.innerText = workerText;
      // console.log(workerText);
   }
}