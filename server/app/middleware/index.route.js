import express from 'express';
import rootRoutes from '../api/root/root.route';

const router = express.Router(); 

/** GET /health-check - Check service health */
router.get('/healthcheck', (req, res) =>
  res.send('OK')
);

// mount user routes at /root
router.use('/root', rootRoutes);

export default router;