const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(505).send("can't be proceed and sum note");
  }
});

router.post(
  "/addnotes",
  fetchuser,
  [
    body("Title", "Enter Title").exists(),
    body("Description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { Title, Description, Tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(409).send("notes is not added");
      }
      const note = new Notes({
        Title,
        Description,
        Tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      return res.status(507).send("not add");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { Title, Description, Tag } = req.body;
    const newNote = {};
    if (Title) {
      newNote.Title = Title;
    }
    if (Description) {
      newNote.Description = Description;
    }
    if (Tag) {
      newNote.Tag = Tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(901).send("User does not exist");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed ,UnAuthorization");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    return req.status(508).send("not update");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(901).send("User does not exist");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed ,UnAuthorization");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ sucess: "successfully deleted", note: note });
  } catch (error) {
    console.error(error.message)
    return res.status(901).send("not deleted")
  }
});
module.exports = router;
