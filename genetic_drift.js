var config = {
    numGenerations: 'infinite',
    population: {
        cats: 3e4,
        dogs: 7e4,
    },
    drawAmount: 5e4
};

var GeneticDriftSimulator = function (user_config) {
    this.config = _.defaults(user_config, {
        numGenerations: '5',
        population: {
            red: 50,
            blue: 50
        },
        drawAmount: 10
    });
};

GeneticDriftSimulator.prototype.run = function () {
    var ratioPopulation = this.config.population;
    var isIndefinite = (this.config.numGenerations == 'infinite');
    for (var i = 0; isIndefinite || i < this.config.num_generations; i++) {
        if (Object.keys(ratioPopulation).length == 1) {
            console.log('Generation ' + i + ': One trait left: ' + Object.keys(ratioPopulation)[0]);
            break;
        }
        var population = [];
        for (var populationName in ratioPopulation) {
            for (var k = 0; k < ratioPopulation[populationName]; k++) {
                population.push(populationName);
            }
        }
        ratioPopulation = this.ProcessGeneration(population, config.drawAmount);

        var print_result = "Generation " + i + ": ";
        Object.keys(ratioPopulation).forEach(function (key) {
            print_result += key + ':' + ratioPopulation[key] + ' '
        });
        console.log(print_result);
    }
};

GeneticDriftSimulator.prototype.ProcessGeneration = function (population, drawAmount) {
    var temp_drawn = [];
    if (config.drawAmount >= population.length) {
        throw 'SimulationError: The DrawAmount is more than the Population.';
    }
    if (population.length % drawAmount != 0) {
        throw 'SimulationError: The DrawAmount cannot be evenly divided by Population';
    }

    temp_drawn = _.sample(population, drawAmount);
    var multiplier = population.length / drawAmount;
    return this.RatioCount(multiplier, temp_drawn);
};

GeneticDriftSimulator.prototype.RatioCount = function (multiplier, temp_drawn) {
    var final = {};
    _.each(temp_drawn, function (item) {
        for (var i = 0; i < multiplier; i++) {
            if (!(item in final)) {
                final[item] = 0;
            }
            final[item]++;
        }
    });
    return final;
}
var simulation = new GeneticDriftSimulator(config);
simulation.run();