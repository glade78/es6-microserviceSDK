import express from 'express';
import RootController from './root.controller';

const router = express.Router(); 

/** GET /root - Check service health */
router.get('/rootTest', (req, res) =>
  res.send('OK')
);

export default router;