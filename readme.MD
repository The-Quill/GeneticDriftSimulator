##Genetic Drift Simulator

###Requires [Underscore.js](http://underscorejs.org) to function.

This is a tool that lets you simulate the affects of Genetic Drift on a population.

Once added to the webpage, you can initialise like the following:

	var simulation = new GeneticDriftSimulator();
	simulation.run();
	
or, you can define your own `configs` in an object.

---
There are three properties to the configs object, all of which are optional, and will be filled in with defaults if not provided.

 - `numGenerations`: the number of generations to iterate over. Can be number input or `infinite` to go until one population remains.
 - `population`: an object containing the names of the populations and the amount of each.
 - `drawAmount`: the amount of population to be surveyed.

An example config might look like:

    var config = {
        numGenerations: 'infinite',
        population: {
            cats: 3e4,
            dogs: 7e4,
        },
        drawAmount: 5e4
    };