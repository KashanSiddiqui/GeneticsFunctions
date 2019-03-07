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
    console.log(sum, "sum");
    return sum;
} 

const RBS = (array) => {
    let relative_boundries_array = [];
let total_rank_value = total_rank_calculator(array);
relative_boundries_array.push( 1 / total_rank_value );
console.log(relative_boundries_array); // special case for 1st array
for(var i=1; i<array.length; i++){
    let value = (i+1) / total_rank_value;
    console.log(value, "******** value ************");
     relative_boundries_array[i] = relative_boundries_array[i-1] + value;
}
return relative_boundries_array;
}

let initial_population_arr = population(3, 3);
// let total_fitness_value = total_fitness_calculator(initial_population_arr);
let RBS_array = RBS( initial_population_arr);
console.log(RBS_array);