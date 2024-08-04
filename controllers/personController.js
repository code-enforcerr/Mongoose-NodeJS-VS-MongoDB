const Person = require('../models/Person');

// Create a new person
exports.createPerson = async (req, res) => {
  try {
    const { name, age, favoriteFoods } = req.body;
    const person = new Person({ name, age, favoriteFoods });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create multiple people
exports.createPeople = async (req, res) => {
  try {
    const arrayOfPeople = req.body; // Expect an array of person objects
    const people = await Person.create(arrayOfPeople);
    res.status(201).json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all people with a specific name
exports.findPeopleByName = async (req, res) => {
  try {
    const { name } = req.params;
    const people = await Person.find({ name });
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find one person by a favorite food
exports.findOneByFavoriteFood = async (req, res) => {
  try {
    const { food } = req.params;
    const person = await Person.findOne({ favoriteFoods: food });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find a person by ID
exports.findPersonById = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await Person.findById(personId);
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a person's favoriteFoods by ID
exports.addFavoriteFoodById = async (req, res) => {
  try {
    const { personId } = req.params;
    const { food } = req.body;
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    person.favoriteFoods.push(food);
    await person.save();
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a person's age by name
exports.updateAgeByName = async (req, res) => {
  try {
    const { personName } = req.params;
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a person by ID
exports.deletePersonById = async (req, res) => {
  try {
    const { personId } = req.params;
    const deletedPerson = await Person.findByIdAndRemove(personId);
    res.status(200).json(deletedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all people named "Mary"
exports.deleteAllMarys = async (req, res) => {
  try {
    const result = await Person.deleteMany({ name: 'Mary' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find people who like burritos, sort by name, limit to 2, hide age
exports.findPeopleWhoLikeBurritos = async (req, res) => {
  try {
    const people = await Person.find({ favoriteFoods: 'burrito' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
