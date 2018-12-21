import mongoose from 'mongoose';


/**
 * User Schema
 */
const Schema = mongoose.Schema;
const TestUserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TestUserSchema.set('toJSON', {
    virtuals: true,
    transform(doc, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.password;
        return obj;
    },
});

// Validate username is not taken
TestUserSchema
    .path('username')
    .validate((username, respond) => {
        TestUserModel.findOne({ username })
            .then((user) => {
                respond(user ? false : true);
            })
            .catch(() => {
                respond(false);
            });
    }, 'Username already taken.');

// Validate password field
TestUserSchema
    .path('password')
    .validate(function(password) {
        return password.length >= 6 && password.match(/\d+/g);
    }, 'Password be at least 6 characters long and contain 1 number.');


/**
 * @typedef User
 */
const TestUserModel = mongoose.model('User', TestUserSchema, 'User');

export default TestUserModel;