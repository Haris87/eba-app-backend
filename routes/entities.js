const express = require("express");
const router = express.Router();
const Entity = require("../models/entity");

router.post("/", async (req, res, next) => {
  let entity = new Entity();
  entity.name = req.body.name;
  entity.email = req.body.email;
  entity.phone = req.body.phone;
  entity.address = req.body.address;
  entity.website = req.body.website;
  entity.comments = req.body.comments;
  entity.createdAt = new Date();

  try {
    const response = await entity.save();
    res.send(response);
  } catch (ex) {
    res.send(ex);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  let entity = await Entity.findById(req.params.id);

  entity.comments.unshift(req.body.comment);

  try {
    const response = await Entity.findOneAndUpdate(
      { _id: req.params.id },
      entity,
      {
        new: true,
      }
    );
    res.send(response);
  } catch (ex) {
    console.log("error", ex);
    res.send(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  let entity = {};
  entity.name = req.body.name;
  entity.email = req.body.email;
  entity.phone = req.body.phone;
  entity.website = req.body.website;
  entity.address = req.body.address;
  entity.comments = req.body.comments;

  try {
    const response = await Entity.findOneAndUpdate(
      { _id: req.params.id },
      entity,
      {
        new: true,
      }
    );
    res.send(response);
  } catch (ex) {
    console.log("error", ex);
    res.send(ex);
  }
});

router.get("/autocomplete", async (req, res, next) => {
  const query = { name: new RegExp(req.query.term, "i") };

  try {
    const entities = await Entity.find(query);
    const names = entities.map((e) => e.name);
    res.send(names);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  const entity = await Entity.findById(req.params.id);
  res.send(entity);
});

router.get("/", async (req, res, next) => {
  const query = req.query.term ? { name: new RegExp(req.query.term, "i") } : {};
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.page) || 0;

  let sort = { createdAt: -1 };
  if (req.query.sortOrder) {
    let sortValue = 1;
    if (req.query.sortOrder == "descend") {
      sortValue = -1;
    }
    sort = { name: sortValue };
  }

  const entities = await Entity.find(query)
    .limit(pageSize)
    .skip(pageSize * page)
    .sort(sort);

  const count = await Entity.find(query).count();

  res.send({ entities, count });
});

module.exports = router;
