const { Thought, reactionSchema, User } = require("../models");

module.exports = {
    // get all thoughts 
 getThoughts(req,res){
    Thought.find()
    .then((thoughts) => {
        res.json(thoughts)
    })
    .catch((err) => res.status(500).json(err))
 },
//  get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// create a thought and attach it to a user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        const thoughtId = thought._id;
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: { _id: thoughtId } } },
          { runValidators: true, new: true }
        ).then(() => thought);
      })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })

 
      .catch((err) => res.status(500).json(err));
  },
//   updates a thought 
  updateThought(req, res){
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {runValidators:true, new: true}
        )
        .then((thought)=>
            !thought? res.status(404).json({message: 'No thought with this ID'}): res.json(thought))
            .catch((err) => res.status(500).json(err))
  },
//   deletes a thought 
  deleteThought(req,res){
    Thought.findOneAndDelete(
        {_id: req.params.thoughtId}
    ).then((thought) =>
    !thought?res.status(404).json({message: 'No thought with this ID'}): res.json({message : "Thought has been deleted"}))
    .catch((err) => res.status(500).json(err))
},

// create a reaction by adding it to a thought 
createReaction(req,res){
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    
},
// delete a reaction 
deleteReaction(req,res){
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
    )
    .then((thought) =>
    !thought? res.status(404).json({message: 'No reaction with this ID'}): res.json(thought))
    .catch((err) => res.status(500).json(err))
}
};
