import TestUser from '../testuser/testuser.model';
import Address from '../address/address.model';

class RootController {

    create = async(req, res, next) => {

        let newUser = new TestUser({
            username: "testUser",
            password: "testpwd"
        });

        try {
            const savedUser = await newUser.save();

            let newAddress = new Address({
                streetname: "testBusiness1",
                belongsto: savedUser._id
            });

            try {
                const savedAddress = await newAddress.save();
                res.send('OK');
            } catch (err) {
                err.status = 400;
                next(err);
            }
        } catch (err) {
            err.status = 400;
            next(err);
        }
    }

    populate = async(req, res, next) => {
        try {
            // @TODO Add pagination
            res.json(await Address.find().lean().populate({ path: 'belongsto', select: 'username' }));
        } catch (err) {
            next(err);
        }
    }

}

export default new RootController();