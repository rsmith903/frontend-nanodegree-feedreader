/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        
        it('URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        
        it('Name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    
     describe('The menu', function() {
        
         it('Menu is hidden', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
         });
         
         it('Menu changes visibility', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

   
        describe('Initial Entries', function() {
            
            // BeforeEach call to make for sure that load is done\\
            
            beforeEach(function(done){
            loadFeed(0, done);
             });    
        
        it('There is at least a single .entry element within the .feed contained', function() {
            //Testing child elements(length) under ".feed" to be greater than 0, meaning at least 1
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
  
         describe('New Feed Selection', function() {
         //holds currentTitle from the beginning
         var curTitle;
         var afterTitle;
             
       // BeforeEach call to make sure loadfeed sends the second feed//
           beforeEach(function(done) {
            loadFeed(2, function() {
                curTitle = $('.feed').find('h2').first().text();
                done();
            });
         });   
        
         it('Content actually changes', function(done) {
            loadFeed(1, function() {
                afterTitle = $('.feed').find('h2').first().text();
                expect(curTitle).not.toEqual(afterTitle);
                done();
            });
         });
    });
}());
