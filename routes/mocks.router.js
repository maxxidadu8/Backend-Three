const express = require('express');
const { faker } = require('@faker-js/faker');
const User = require('../models/user.model'); 
const Pet = require('../models/pet.model');   

const mocksRouter = express.Router();

// Endpoint para generar y guardar datos de users y pets
mocksRouter.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ message: "Por favor, proporciona los números de 'users' y 'pets'" });
    }

    const generatedUsers = [];
    const generatedPets = [];

    // Generar usuarios aleatorios
    for (let i = 0; i < users; i++) {
      generatedUsers.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),  
        age: faker.number.int({ min: 18, max: 80 }),
        createdAt: new Date(),
      });
    }

    // Insertar usuarios generados en la base de datos
    await User.insertMany(generatedUsers);

    // Generar mascotas aleatorias
    for (let i = 0; i < pets; i++) {
      generatedPets.push({
        name: faker.animal.dog(),
        breed: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
        owner: faker.person.fullName(), 
        createdAt: new Date(),
      });
    }

    // Insertar mascotas generadas en la base de datos
    await Pet.insertMany(generatedPets);

    res.status(201).json({ message: "Datos generados e insertados exitosamente", users: generatedUsers.length, pets: generatedPets.length });
  } catch (error) {
    res.status(500).json({ message: "Error al generar los datos", error: error.message });
  }
});

// Endpoint para obtener todos los usuarios
mocksRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
});

// Endpoint para obtener todas las mascotas
mocksRouter.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las mascotas", error: error.message });
  }
});

module.exports = mocksRouter;
