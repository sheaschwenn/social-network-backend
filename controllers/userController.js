const{Thought, User} = require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req,res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user? res.status(404).json({message: 'No user with this ID'}): res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    createUser(req,res){
        User.create(req.body)
        // .select('-__v')
        .then((user) => res.json(user))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err)
        })
    },

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

    // deleteUser(req,res){
    //     User.findOneAndDelete({_id:req.params.userId})
    //     .then((user) =>
    //     { 
    //         console.log(user)
    //         Thought.deleteMany({ username: user.username } );
    //         !user? res.status(404).json({message: 'No user with this ID'}): res.json(user)
            

    //     })
    //     .catch((err) => res.status(500).json(err))

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this ID' });
            }
      
            Thought.deleteMany({ username: user.username })
              .then(() => {
                console.log('User and associated thoughts deleted successfully');
                res.json(user);
              })
              .catch((err) => res.status(500).json(err));
          })
          .catch((err) => res.status(500).json(err));
      
    },

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