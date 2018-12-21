import express from 'express';
import RootController from './root.controller';

const router = express.Router();

/** GET /root - Check service health */
router.get('/rootTest', (req, res) =>
    res.send('OK')
);

router.get('/createData', RootController.create);
router.get('/showData', RootController.populate);


export default router;