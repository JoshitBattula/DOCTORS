const User = require('../db/user');
async function addUser(userModel) {
    let user = new User({...userModel});
    await user.save();
    return user.toObject();
}
async function getUsers() {
    const users= await User.find();
    return users.map(x=>x.toObject());
}
async function getUser(id) {
    const users= await User.findById();
    return users.toObject();
}
async function updateUser(id,userModel) {
    const filter={ _id:id};
    await User.findByIdAndUpdate(filter,userModel);
}
async function deleteUser(id) {

    const users= await User.findByIdAndDelete(id);

}
module.exports={addUser,getUsers,getUser,updateUser,deleteUser};