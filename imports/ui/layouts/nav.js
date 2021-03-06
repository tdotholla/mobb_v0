
import Categories from '/imports/startup/collections/categories.js';
import Listings from '/imports/startup/collections/listings';

import '../components/loadingScreen.html';
// import '../components/loggedInNav.js';
import '../components/bragBox.js';
import '../components/addForm.js';
import '../components/editForm.js';
import '../components/modalSplash.js';
import '../components/loginModal.js';
import '../components/aboutModal.js';
import '../components/closestCard.js';
// import '../components/categorySelect.js';
import '../components/mapFilter.js';

// import '../components/geoModal.js';
// import '../components/corner-ribbon.js';
import '../components/favoriteStar.js';
import '../components/shareListing.js';
import '../components/mobileNav.js';
import '../components/sideCard.js';

import './nav.html';

Template.nav.onRendered( function () {
  $(document).ready(function () {
    $('[id="loading-wrapper"], .server_rendered').fadeOut();
    $('.dropdown-button').dropdown({
      stopPropagation: true,
      constrainWidth: false,
      belowOrigin: true
    });
  });
 // TypeAhead autocomplete in Schema
  Meteor.typeahead.inject();
  $('.twitter-typeahead').css("display:block");
  $('#modalVerify').modal();
  $('#modalClaim').modal();
  $('#loginModal').modal();
  $('#aboutModal').modal();

});

Template.nav.events({
	'click .brand-logo img': function(event,templateInstance) {
    let route = Router.current().url;
    if (route[0] !== '/') {
      // $('#modalSplash').modal('open');
      //check zoom and zoom back to normal if less than  
    }
    const map = GoogleMaps.maps[Object.keys(GoogleMaps.maps)[0]];
    if (map) {
      map.instance.setZoom(5);
    }
  },
  //====== SEARCH FORM ON NAVBAR =======
	//when form is submitted, set new center. 
	'submit #desktop_search-form': function (event, templateInstance) {
		event.preventDefault();
    
    const entered = templateInstance.find('input#search_nav').value;
    const doc = Listings.findOne({name: entered});
    if (doc) {
      // console.log(doc._id);
      // Router.go("/listings/" + Listings.findOne({name: entered}).name);
      //open sidenav, set 'openlisting' to this listings _id
      Session.set('openListing', doc._id );
      //PAN TO LOCATION ON MAP
      const map = GoogleMaps.maps[Object.keys(GoogleMaps.maps)[0]];
      const locArr = doc.location.split(",");
      const locObj = { 'lat': Number(locArr[0]), 'lng': Number(locArr[1]) };
      map.instance.panTo(locObj);
      map.instance.setZoom(16);
      // SHOW SIDECARD
      $('.button-collapse').sideNav('show');
    } else {
      console.warn("No Match");
    }

		analytics.track("Searched:", {
  		category: "Interaction",
      label: "Query",
      value: entered
		});
	},
  'click .signout_btn': function () {
    AccountsTemplates.logout();

  },
  'mouseup .tt-suggestion>ul>li': function(event,templateInstance) {
    const name = event.target.innerText;
    const type = event.target.parentElement.parentElement.parentElement.firstChild.innerText;
    if (type === 'Listings') {
      const doc = Listings.findOne({name: name});
      Session.set('openListing', doc._id );
      //PAN TO LOCATION ON MAP
      const map = GoogleMaps.maps[Object.keys(GoogleMaps.maps)[0]];
      const locArr = doc.location.split(",");
      const locObj = { 'lat': Number(locArr[0]), 'lng': Number(locArr[1]) };
      map.instance.panTo(locObj);
      map.instance.setZoom(16);
      $('.button-collapse').sideNav('show');
      // console.log(type,name,id);
      // Router.go('/' + type + '/' + id);  
    // } else {
    //   Router.go('/' + type + '/' + name);  
    }
    
  },
  'click #desktop_search-form': function() {
    // $('#search_nav').focus();
  }
  // 'click .addmodal': function () {
  //   $('#modalAdd').modal('open');
  //   // console.log("open!");
  // }
  // 'click .tt-suggestion': function(event, templateInstance) {
  //   // console.log(event, templateInstance);
  // }
});

Template.nav.helpers({
  dataset: function () {
    return [
      // {
      //   name: 'categories',
      //   valueKey: 'name',
      //   displayKey: 'name',
      //   local: function () { return Categories.find().fetch(); },
      //   header: '<h4 class="tt-header">Categories</h4>',
      //   template: 'results'
      // },
      {
        name: 'listings',
        valueKey: 'name',
        displayKey: 'name',
        local: function () { return Listings.find().fetch(); },
        header: '<h4 class="tt-header">Listings</h4>',
        template: 'results'
      }
    ];
  },
  listingCount: function() {
    let count = Listings.find().count();
    return count;
  }
});