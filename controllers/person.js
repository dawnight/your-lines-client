import * as PersonService from '../service/person';
import PersonModel from '../model/schema/person';

/*
* app.get('/person/create', Person.create);
  app.get('/person/find', Person.find);
  app.get('/person/findById', Person.findById);
  app.get('/person/findByIdAndUpdate', Person.findByIdAndUpdate);
  app.get('/person/findByIdAndDelete', Person.findByIdAndDelete);
  app.get('/person/findOne', Person.findOne);
  app.get('/person/findOneAndUpdate', Person.findOneAndUpdate);
  app.get('/person/findOneAndDelete', Person.findOneAndDelete);
  app.get('/person/deleteOne', Person.deleteOne);
  app.get('/person/deleteMany', Person.deleteMany);
*
* */

export const create = async (req, res) => {
  let params = req.body;

  let person = await PersonService.createPerson(params);

  return res.json(person);
};


export const deleteOne = async (req, res) => {
  let id = req.body.id;
  let person = await PersonService.deletePersonById(id);

  return res.json(person);
};

export const deleteMany = async (req, res) => {

};

export const find = async (req, res) => {

  let person = await PersonService.getPersonList();

  res.json(person);

};

export const findById = async (req, res) => {
  let id = req.query.id;
  let person = await PersonService.getPersonById(id);

  return res.json(person);
};

export const findByIdAndUpdate = async (req, res) => {
  let id = req.query.id;
  let person = await PersonModel.findByIdAndUpdate(id, { name: 'MARKMAN' });

  return res.json(person);
};

export const findByIdAndDelete = async (req, res) => {
  let id = req.query.id;
  let person = await PersonModel.findByIdAndDelete({ _id: id });

  return res.json(person);
};

export const findOne = async (req, res) => {

};

export const findOneAndUpdate = async (req, res) => {

};

export const findOneAndDelete = async (req, res) => {

};
