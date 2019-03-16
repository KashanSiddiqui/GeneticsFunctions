const fitness_function_equation = (x, y, z) => {
    return (Math.pow(x, 2) - 2 * x * y * Math.pow(z, 2) + 2 * Math.pow(y, 2) * z - 5.7 * x * y * z + Math.pow(z, 2));
}

function random_number_for_x() {
    var random = (Math.random() * 4) - 2;
    return random;
}

function random_number_for_y() {
    var random = (Math.random() * 4) - 1;
    return random;
}

function random_number_for_z() {
    var random = (Math.random() * 3);
    return random;
}

function random_number_between_zero_and_one() {
    var random = (Math.random() * 1);
    return random;
}

const population = (initial_population_size, gene_count) => { // calculate initial population
    let array = [];
    for (let i = 0; i < initial_population_size; i++) {
        array[i] = [];
        for (let j = 0; j < gene_count; j++) {
            switch (j) {
                case 0: //x
                    array[i][j] = random_number_for_x();
                    break;
                case 1: //y
                    array[i][j] = random_number_for_y();
                    break;
                case 2: //z
                    array[i][j] = random_number_for_z(); 
                    break;
            }
        }
        array[i][3] = fitness_function_equation(array[i][0], array[i][1], array[i][2])
    }
    return (array)
}


const total_rank_calculator = (array) =>  {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += (i+1);
    }
    // console.log(sum, "sum");
    return sum;
} 

const RBS = (array) => {
    let relative_boundries_array = [];
let total_rank_value = total_rank_calculator(array);
relative_boundries_array.push( 1 / total_rank_value );
// console.log(relative_boundries_array); // special case for 1st array
for(var i=1; i<array.length; i++){
    let value = (i+1) / total_rank_value;
    // console.log(value, "******** value ************");
     relative_boundries_array[i] = relative_boundries_array[i-1] + value;
}
return relative_boundries_array;
}

const parent_index = (RBS_array, parent) => {
    for (let j = 0; j < RBS_array.length; j++) {
        if(! (parent > RBS_array[j])){
            return j;
        }                
    }
}

const crossover = (array, parent1, parent2) => {
    let children_array = [];
    children_array[0] = array[parent1];
    children_array[1] = array[parent2];
    children_array[0][0] = children_array[0][0] + children_array[1][0];
    children_array[1][0] = children_array[0][0] - children_array[1][0];
    children_array[0][0] = children_array[0][0] - children_array[1][0];
    return (children_array)
}

const children_production_function = (initial_array, RBS_array) => {
    let children_array = [];
    for (let i = 0; i < initial_array.length / 2; i++) {        
        let parent1 = random_number_between_zero_and_one();
        let parent2 = random_number_between_zero_and_one();
        if(parent1 === parent2){
            i--;
        }else{
            parent1 = parent_index(RBS_array, parent1)
            parent2 = parent_index(RBS_array, parent2)
            console.log(parent1, parent2)
        children_array = children_array.concat(crossover(initial_array, parent1, parent2));
    }
}
console.log(children_array.length);
    }
    



let initial_population_arr = population(20, 3); // 1st param size, 2nd pram gene size
// let total_fitness_value = total_fitness_calculator(initial_population_arr);
let RBS_array = RBS( initial_population_arr);
let children_array = children_production_function(initial_population_arr, RBS_array) 

// console.log(RBS_array);