import * as express from 'express';
import * as multer from 'multer';
import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  var multer = require("multer");

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/assets/images/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })

  var upload = multer({ storage: storage });


  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);
  router.route('/cat/upload').post(upload.array("myfile[]", 12), catCtrl.upload);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
