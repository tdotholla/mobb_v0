import Listings from '/imports/startup/collections/listings';

Meteor.publish('listings', function () {
	let cursor = Listings.find({});
	console.log("-= PUBLISHING ENTIRE COLLECTION: ["+ cursor.count() +"] =-");
	return cursor;
});

Meteor.publish('listings_one', function (name) {
	check(name, String);
	let cursor = Listings.find({name: name});
	console.log(`-= PUBLISHING SINGLE LISTING: [${name}] =-`);
	return cursor;
});

Meteor.publish('listings_locs', function () {
	let cursor = Listings.find({
		location: { $exists : 1}, 
		certs: {$exists: 0}
	});
	console.log("-= PUBLISHING: ALL ["+ cursor.count() +"] LISTINGS WITH LOCATIONS =-");
	return cursor;
});

Meteor.publish('listings_cbes', function () {
	let cursor = Listings.find({certs: { $exists : 1}});
	console.log("-= PUBLISHING: ["+ cursor.count() +"] CBE LISTINGS =-");
	return cursor;
});

Meteor.publish('listings_urls', function () {
	let cursor = Listings.find({url: { $exists : 1}});
	console.log("-= PUBLISHING: ["+ cursor.count() +"] LISTINGS W/ URLS =-");
	return cursor;
});

Meteor.publish('listings_online_only', function () {
	let cursor = Listings.find({
		url: { $exists : 1}, 
		street: {$exists: 0}
	}, {
		sort: { name: 1}
	});
	console.log("-= PUBLISHING: ["+ cursor.count() +"] ONLINE ONLY LISTINGS =-");
	return cursor;
});

Meteor.publish('listings_social', function () {
	let cursor = Listings.find({social: { $exists : 1}});
	console.log("-= PUBLISHING: ["+ cursor.count() +"] SOCIAL LISTINGS =-");
	return cursor;
});

Meteor.publish('listings_images', function () {
	let cursor = Listings.find({image: { $exists : 1}});
	console.log("-= PUBLISHING: ["+ cursor.count() +"] LISTINGS W/ IMAGES =-");
	return cursor;
});

Meteor.publish('listings_favorites', function () {
	if (Meteor.user()) {
		let arr = Meteor.user().profile.favorites;
	  let cursor = Listings.find({
	    _id : {$in : arr}
	  }, {
	    sort: {name: 1, location: -1 }
	  });

		console.log("-= PUBLISHING: ["+ cursor.count() +"] FAVORITE LISTINGS =-");
		return cursor;
	}
});