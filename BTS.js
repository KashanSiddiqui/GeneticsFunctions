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

function random_number_for_parent_selection(size) {
    return Math.round((Math.random() * size));
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

const BTS = (array) => {
    let random1;
    let random2;
    let parents = [] 
    for(let i=0; i<2; i++){
        do {
             random1 = random_number_for_parent_selection(array.length);
             random2 = random_number_for_parent_selection(array.length);
             console.log(array[random1][3])
             console.log(array[random2][3])
        }
        while(array[random1][3] === array[random2][3]);
        if(array[random1][3] > array[random2][3]) {
            parents[i] = random1;
        }else {
            parents[i] = random2;
        }
    }
    return parents;
}



let initial_population_arr = population(25, 3);
let bts_array = BTS(initial_population_arr);
console.log(bts_array)