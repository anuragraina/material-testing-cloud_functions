const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.createUser = functions.region('asia-south1').https.onCall(async (data, context) => {
	try {
		const userRecord = await admin.auth().createUser({
			email: data.email,
			phoneNumber: `+91${data.mobile}`,
			password: '123456',
			displayName: data.name,
		});

		console.log('Successfully created new user:', userRecord.uid);
		return userRecord;
	} catch (error) {
		console.log('Error creating new user:', error);
		return error;
	}
});
