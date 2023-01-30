const express = require('express');
const router = express.Router();

const supplies = [
    { id: 1, name: "food bowl" },
    { id: 2, name: "water bowl" },
    { id: 3, name: "leash"}
];

app.get('/api/supplies', (req, res) => {
    res.send(supplies);
});

app.post('/api/supplies', (req, res) => {
    const { error } = validateSupply(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const supply = {
      id: supplies.length + 1,
      name: req.body.name
    };
    supplies.push(supply);
    res.send(supply);
  });

  app.put('/api/supplies/:id', (req, res) => {
    const supply = supplies.find(c => c.id === parseInt(req.params.id));
    if (!supply) return res.status(404).send('The supply with the given ID was not found.');
  
    const { error } = validateSuply(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    supply.name = req.body.name; 
    res.send(supply);
  });
  
  app.delete('/api/supplies/:id', (req, res) => {
    const supply = supplies.find(c => c.id === parseInt(req.params.id));
    if (!supply) return res.status(404).send('The supply with the given ID was not found.');
  
    const index = supplies.indexOf(supply);
    supplies.splice(index, 1);
  
    res.send(supply);
  });
  
  app.get('/api/supplies/:id', (req, res) => {
    const supply = supplies.find(c => c.id === parseInt(req.params.id));
    if (!supply) return res.status(404).send('The supply with the given ID was not found.');
    res.send(supply);
  });
  
  function validateSuply(supply) {
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
  
    return schema.validate(supply);
  }

  module.exports = router;