/*
-----------------------------------------
Automatically Observe Astronomical Events
-----------------------------------------
*/
// Start
autoObserve = setInterval(
	function() {
		$("#gameLog").find("input").click(); 
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
	var calendar = gamePage.calendar

	// Don't run if losing catnip per second
	if (catnip.perTickUI < 0) { return; }

	// only run if 50+% of total capacity
	if (catnip.value / catnip.maxValue < 0.5) { return; }

	// stockpile extra at end of autumn
	if (calendar.season == 2 && calendar.day > 50) { return; }

	gamePage.craftAll('wood');
	console.log("Crafted Wood");
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
        if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
        if (gamePage.workshop.getCraft('manuscript').unlocked) { gamePage.craftAll('manuscript'); }
        if (gamePage.workshop.getCraft('compedium').unlocked)  { gamePage.craftAll('compedium');  }
        if (gamePage.workshop.getCraft('blueprint').unlocked)  { gamePage.craftAll('blueprint');  }
    }
}, 5 * 1000);