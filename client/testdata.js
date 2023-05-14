let exampleData2 = new Array(10);
exampleData2.fill({
	website: 'Instagram',
	userName: 'Larry',
	password: 'Lobster',
});
let exampleData = new Array(10);
exampleData.fill({
	website: 'Google',
	userName: 'Jumpin',
	password: 'Jahosef',
});
let otherWebsite = new Array(10);
otherWebsite.fill({ website: 'Amazon', userName: 'Sally', password: 'Styles' });
let anotherWebsite = new Array(10);
anotherWebsite.fill({
	website: 'Twitter',
	userName: 'Sheila',
	password: 'Shysberg',
});
const testData = [];
for (let i = 0; i < exampleData.length; i++) {
	testData.push(
		exampleData[i],
		otherWebsite[i],
		exampleData2[i],
		anotherWebsite[i]
	);
}

function createTestData() {
	return testData;
}

export default createTestData;
