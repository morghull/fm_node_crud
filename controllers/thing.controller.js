const { Thing } = require('../models');

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [newThing] = await Thing.create(body);
    if (newThing) {
      return res.status(201).send({ data: newThing });
    }
    res.status(400).send({ message: 'oops, something goes wrong!' });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllThings = async (req, res, next) => {
  try {
    const arrayThings = await Thing.findAll();
    if (arrayThings.length) {
      return res.status(200).send({ data: arrayThings });
    }
    res.status(204).send({ message: 'table seems empty!' });
  } catch (error) {
    next(error);
  }
};

module.exports.getThing = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const thing = await Thing.findByPk(id);
    if (thing && thing.length) {
      return res.status(200).send({ data: thing });
    }
    res.status(204).send({ message: 'no such id!' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteThing = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const thing = await Thing.deleteByPk(id);
    if (thing && thing.length) {
      return res
        .status(200)
        .send({ message: 'successfully deleted!', data: thing });
    }
    res.status(204).send({ message: 'no such id!' });
  } catch (error) {
    next(error);
  }
};

module.exports.updateThing = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const thing = await Thing.updateByPk(id, body);
    console.log(thing);
    if (thing && thing.length) {
      return res.status(200).send({
        message: `successfully updated ${thing.length} record${
          thing.length > 1 ? 's' : ''
        }!`,
        data: thing,
      });
    }
    res.status(404).send({ message: 'no such id!' });
  } catch (error) {
    next(error);
  }
};
