const{Thought, User} = require('../models');

module.exports = {
    // get all users
    getUsers(req,res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
// get a single user based on their id
    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user? res.status(404).json({message: 'No user with this ID'}): res.json(user))
        .catch((err) => res.status(500).json(err))
    },
// create a user 
    createUser(req,res){
        User.create(req.body)
        // .select('-__v')
        .then((user) => res.json(user))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err)
        })
    },
// update a user 
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set:req.body},
            {runValidators:true, new: true}
        )
        .then((user)=>
            !user? res.status(404).json({message: 'No user with this ID'}): res.json(user))
            .catch((err) => res.status(500).json(err))
    },

// delete a user based on their id 
// delete their thoughts as well on deletion of user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this ID' });
            }
      
            Thought.deleteMany({ username: user.username })
              .then(() => {
                res.json({message:'User and associated thoughts deleted successfully' });
              })
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
      
    },
// add a friend with user and friends id 
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: {_id: req.params.friendId}}},
            {runValidators: true, new:true}
        )
        .then((user) => 
        !user? res.status(404).json({message: 'No user with this ID'}): res.json(user))
        .catch((err) => res.status(500).json(err))
    },
// delete a friend 
    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull: {friends:req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user? res.status(404).json({message: 'No user with this ID'}): res.json(user))
        .catch((err) => res.status(500).json(err))
    }


}