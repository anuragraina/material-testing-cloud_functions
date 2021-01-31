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
		return {
			uid: userRecord.uid,
			name: userRecord.displayName,
			email: userRecord.email,
			mobile: userRecord.phoneNumber,
		};
	} catch (error) {
		console.log('Error creating new user:', error);
		return error;
	}
});

exports.getUsers = functions.region('asia-south1').https.onCall(async () => {
	try {
		const finalUserList = [];
		const userList = await admin.auth().listUsers();
		userList.users.forEach(userRecord => {
			if (userRecord.email !== 'admin@project.com') {
				const newUser = {
					uid: userRecord.uid,
					name: userRecord.displayName,
					email: userRecord.email,
					mobile: userRecord.phoneNumber,
				};
				finalUserList.push(newUser);
			}
		});
		return finalUserList;
	} catch (error) {
		console.log('Error fetching users:', error);
		return error;
	}
});

exports.deleteUser = functions.region('asia-south1').https.onCall(async (uid, context) => {
	try {
		await admin.auth().deleteUser(uid);

		console.log('Successfully deleted user');
		return 'Successfully deleted user';
	} catch (error) {
		console.log('Error deleting user:', error);
		return error;
	}
});
