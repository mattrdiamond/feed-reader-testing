/* feedreader.js */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

   /*
    * Test suite for RSS feeds
    */

    describe('RSS Feeds', function() {

       /*
        * Test to make sure allFeeds variable is defined and not empty
        */

        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in allFeeds object to ensure the
         * url is defined and not empty
         */

         it('urls are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* Loop through each feed in allFeeds object to ensure the
         * name is defined and not empty
         */

         it('names are defined', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


   /*
    * Test suite for menu
    */

    describe('The Menu', function() {
        const body = $('body');
        const menuIcon = $('.menu-icon-link');

        /*
         * Ensure menu element is hidden by default
         */

         it('is hidden by default', function() {
           expect(body.hasClass('menu-hidden')).toBe(true);
         });

         /*
          * Ensure menu changes visibility when menu icon is clicked
          */

          it('changes visibility when menu icon clicked', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
          });
    });

   /*
    * Test suite for initial entries
    */

    describe('Initial Entries', function() {

     /* loadFeed is asynchronous, and testing it will require
      * Jasmine's beforeEach and done() functions.
      */

      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

        /* Ensure that there is at least a single .entry element within the .feed
         * container after the loadFeed function has finished running
         */

         it('there is at least one .entry element within the .feed container', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

   /*
    * Test suite for new feed selection
    */

    describe('New Feed Selection', function() {
      let firstFeed, secondFeed;

        /* Run loadFeed with feedId of 0, and then again with the feedId of 1 and
         * store the HTML for each feed in a variable.
         */

         beforeEach(function(done) {
           loadFeed(0, function() {
             firstFeed = $('.feed').html();

             loadFeed(1, function() {
               secondFeed = $('.feed').html();
               done();
             });
           });
         });

        /* When a new feed is loaded by the loadFeed function, test to make sure that
         * the content changes by comparing the first feed's HTML to the second feed.
         * If they do not match, a new feed has been loaded.
         */

         it('loads new feed', function() {
           expect(secondFeed).not.toBe(firstFeed);
         });
    });
}());
