const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

exports.getUsers = functions.region('asia-south1').https.onCall(async (data, context) => {
	try {
		const finalUserList = [];
		const userList = await admin.auth().listUsers();
		userList.users.forEach(userRecord => {
			const newUser = {
				name: userRecord.displayName,
				email: userRecord.email,
				mobile: userRecord.phoneNumber,
			};
			finalUserList.push(newUser);
		});
		return finalUserList;
	} catch (error) {
		console.log('Error fetching users:', error);
		return error;
	}
});
