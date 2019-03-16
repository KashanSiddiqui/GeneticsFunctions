const fitness_function_equation = (x, y, z) => {
    return (Math.pow(x, 2) - 2 * x * y * Math.pow(z, 2) + 2 * Math.pow(y, 2) * z - 5.7 * x * y * z + Math.pow(z, 2));
}

let x_range_max = 2;
let y_range_max = 3;
let z_range_max = 3;

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

function random_one_zero() {
    var random = Math.round((Math.random() * 1));
    return random;
}

function random_generator(index) {
    var random = Math.round((Math.random() * index));
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
    for (let i = 0; i < 2; i++) {
        do {
            random1 = random_number_for_parent_selection(array.length - 1);
            random2 = random_number_for_parent_selection(array.length - 1);
        }
        while (array[random1][3] === array[random2][3]);
        if (array[random1][3] > array[random2][3]) {
            parents[i] = random1;
        } else {
            parents[i] = random2;
        }
    }
    return parents;
}

function random_number_for_crossover() {
    var random = Math.round(Math.random() * 24);
    return random;
}

const check_similar_chromosome_genes = (chromosome1, chromosome2, array) => {
    if (array[chromosome1][0] === array[chromosome2][0] &&
        array[chromosome1][1] === array[chromosome2][1] &&
        array[chromosome1][2] === array[chromosome2][2]
    ) {
        return true;
    }
    return false;
}

const check_repeated_chromosome = (array, chromosome_added_value) => {
    return array.includes(chromosome_added_value);
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

const mutation = (single_array) => {
    console.log("before =>" + single_array)
        let isOne = random_one_zero();
        if (isOne) {
            let gene_value = random_generator(2);
            console.log(gene_value, "gene_value")
            switch (gene_value) {
                case 0:
            console.log("single_array[gene_value] =>"+ single_array[gene_value])
                single_array[gene_value] = single_array[gene_value] + 0.1;
            console.log("single_array[gene_value] => " + single_array[gene_value])
                    if (single_array[gene_value]  > x_range_max) {
                        single_array[gene_value] = single_array[gene_value] - 0.2
                    }
                    break;
                case 1:
                console.log("single_array[gene_value] =>"+ single_array[gene_value])
                single_array[gene_value] = single_array[gene_value] + 0.1;
            console.log("single_array[gene_value] => " + single_array[gene_value])
                    if (single_array[gene_value]  > y_range_max) {
                        single_array[gene_value] = single_array[gene_value] - 0.2
                    }
                    break;
                case 2:
                console.log("single_array[gene_value] =>"+ single_array[gene_value])
                single_array[gene_value] = single_array[gene_value] + 0.1;
            console.log("single_array[gene_value] => " + single_array[gene_value])
                    if (single_array[gene_value]  > z_range_max) {
                        single_array[gene_value] = single_array[gene_value] - 0.2
                    }
                    break;
            }
        }
    console.log("after =>" + single_array)
    return single_array;
}

const mutate_children = (array) => {
    for (let index = 0; index < array.length; index++) {
        array[index] = mutation(array[index]);   
        console.log(array[index]) 
    }
    return array
}

const child_production = (array) => {
    // console.log(array)
    let children_array = []
    for (let index = 0; index < 10; index++) {
        let parents = BTS(array);
        children_array = children_array.concat(crossover(array, parents[0], parents[1]));
    }
    // console.log("Bachy *******" + children_array.length + "Bachy *******")
    return children_array;
}

const genetic_algorithm = (array) => {
    // console.log(array.length)
    let children = child_production(array)
    let mutated_children = mutate_children(children);
    concated_array = array.concat(mutated_children);
    concated_array.sort((a, b) => {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    })
    let best_twenty = concated_array.slice(20, 45)
    return best_twenty;
}

const loop_fifty_times = (array) => {
    let best_twenty = genetic_algorithm(array);
    let arr = []
    arr.push(best_twenty);
    for (let index = 0; index < 3; index++) {
    arr[index+1] = genetic_algorithm(arr[index]);        
    }
    console.log(arr, "Hello")
}

let initial_population_arr = population(25, 3);
loop_fifty_times(initial_population_arr);