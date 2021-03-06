/*
-----------------------------------------
Automatically Observe Astronomical Events
-----------------------------------------
*/
// Start
autoObserve = setInterval(
	function() {
		$("#gameLog").find("input").click(); 
		console.log("I saw the sign.");
	}
	, 2 * 1000
);


/*
-------------------------
Refine Catnip if over 50%
--------------------------
*/
autoCatnip = setInterval(function() {
	var catnip = gamePage.resPool.get('catnip');
	var wood = gamePage.resPool.get('wood');
	var calendar = gamePage.calendar

	// Don't run if losing catnip per second
	if (catnip.perTickUI < 0) { return; }

	// only run if 50+% of total capacity
	if (catnip.value / catnip.maxValue < 0.5) { return; }

	// Don't run if wood is almost maxed.
	if (wood.value / wood.maxValue > 0.9) { return; }
	
	// stockpile extra at end of autumn
	if (calendar.season == 2 && calendar.day > 50) { return; }

	gamePage.craft('wood',10);
	console.log("Crafted 10 Wood");
}, 5 * 1000);

/*
--------------------------------------
Automatically Hunt and craft resources
--------------------------------------
*/

// Automatically Send Hunters
// Sends all hunters when catpower is over 95% full.
// Also automatically crafts parchment, manuscripts, compendiums, and blueprints.
// If you don't want a resource crafted, simply delete the corresponding craftAll line
// Start
autoHunt = setInterval(function() {
    var catpower = gamePage.resPool.get('manpower');
    if (catpower.value / catpower.maxValue > 0.95) {
        $("a:contains('Send hunters')").click();
	console.log('i did a hunt.');
        if (gamePage.workshop.getCraft('parchment').unlocked)  { 
		gamePage.craftAll('parchment');  
		console.log('crafted all the parchment');
	}
        if (gamePage.workshop.getCraft('manuscript').unlocked) { 
		gamePage.craftAll('manuscript'); 
		console.log('crafted all the manuscript');
	}
        if (gamePage.workshop.getCraft('compedium').unlocked)  { 
		gamePage.craftAll('compedium');  
		console.log('crafted all the compendiums');
	}
        if (gamePage.workshop.getCraft('blueprint').unlocked)  { 
		gamePage.craftAll('blueprint');  
		console.log('crafted all the blueprints');
	}
    }
}, 5 * 1000);

/*
-------------------------------------------------------
If thing is maxed craft one unit of what thing produces
------------------------------------------------------
*/
autoCrafter = setInterval(
	function() {

		// Pull all resources that can be crafted to keep from being capped
		var coal = gamePage.resPool.get('coal')
		var iron = gamePage.resPool.get('iron')
		var wood = gamePage.resPool.get('wood')
		var minerals = gamePage.resPool.get('minerals')

		if (wood.value / wood.maxValue > 0.95) {
			gamePage.craft('beam',1)
			console.log("crafted a beam")
		}

		if (coal.value / coal.maxValue > 0.95) {
			gamePage.craft('steel',1)
			console.log("crafted some steel")
		}

		if (minerals.value / minerals.maxValue > 0.95) {
			gamePage.craft('slab',1)		
			console.log("crafted a slab")	
		}

	}
	, 2 * 1000
);
