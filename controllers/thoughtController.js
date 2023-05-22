const { Thought, reactionSchema, User } = require("../models");

module.exports = {
 getThoughts(req,res){
    Thought.find()
    .then((thoughts) => {
        res.json(thoughts)
    })
    .catch((err) => res.status(500).json(err))
 },
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

    //   .then((user) =>
    //     !user
    //       ? res.status(404).json({ message: "No user with this ID" })
    //       : res.json(user)
    //   )
      .catch((err) => res.status(500).json(err));
  },
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
  deleteThought(req,res){
    Thought.findOneAndDelete(
        {_id: req.params.thoughtId}
    ).then((thought) =>
    !thought?res.status(404).json({message: 'No thought with this ID'}): res.json(thought))
    .catch((err) => res.status(500).json(err))
},

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
