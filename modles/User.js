const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = newmongoose.Schema(
    {
        fullName: {type: String, required:true},
        email: {type: String, require:true, unique:true},
        password:{type:String, required: true},
        profileImageUrl:{type: String, default:null},
    },
    { timesStamps: true}
);


//hash password before saving

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next ();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//Compare Password

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);