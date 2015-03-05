/* FOR EACH STUFF */

var people = [
	{id:1, name:"terry"},
	{id:2, name:"rob"},
	{id:3, name"erika"},
	{id:4, name"nathan"}
];

/* Note the string interpolation */

people.forEach(function(person) {
	console.log("person %s", person.name);
});

console.log("id number 2 is %s", getPersonByID(2).name);

function getPersonByID(id) {
	var result = null;
	people.forEach(function(person) {
		if(person.id == id)
			result = person;
	});
	return result;
}

function getPersonByName(name) {
	var person = null;
	people.forEach(function(person) {
		if(person.name == name)
			result=person;
	});
	return result;
}
/*---------------------------------------------------------------*/
/* CLASSES */
function Person (id, name) {
	this.id = id;
	this.name = name;
	this.toString = function getNameByID() {
		return this.name + " has an id of " + this.id;
	}
	this.type = "Person";
}

/* Base class and a super class.
Superclass is what you've inherited from
Worker = base class
Person = Superclass
*/

function Worker(id, name, jobTitle) {
	// this is the thing that does the inheriting
	person.call(this, id, name);	// new person class, worker inherits properties
	this.jobTitle = jobTitle
	this.toString = function() {
		return this.name + " has an id of " + this.id " and is a " + this.jobTitle 
	} 
	this.type = "Worker";
}

var names = ["Terry", "Rob", "Erika", "Nathan"];
var persons = [];

for (var i=0; i < names.length; i++) {
	persons.push(new Person(i, names[i]));

}

var worker = newWorker(getNextID(), "Loren", "wizzard");
persons.push (worker);

persons.forEach(function(person){
		console.log("stuff");
	});
}

function getNextID() {
	return persons.length + 1;
}


/*---------OBJECTS : LITERAL ---------*/
apple = [
	ID: 0,
	name:"Terry"
]

