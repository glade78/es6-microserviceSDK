import mongoose from 'mongoose';


/**
 * Address Schema
 */

const Schema = mongoose.Schema;
const AddressSchema = new Schema({

    streetname: {
        type: String,
        required: true,
        unique: true
    },


    belongsto: { type: Schema.Types.ObjectId, ref: 'TestUser' },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

AddressSchema.set('toJSON', {
    //virtuals: true,
    transform(doc, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        return obj;
    },
});


/**
 * @typedef User
 */
const AddressModel = mongoose.model('Address', AddressSchema, 'Address');

export default AddressModel