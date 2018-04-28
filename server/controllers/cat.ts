import Cat from '../models/cat';
import BaseCtrl from './base';

export default class CatCtrl extends BaseCtrl {
  model = Cat;

  upload = (req, res) => {
    let filenameArr;
    console.log(req.files.length);
    if (req.files.length > 0) {
      let tempArr = req.files;
      filenameArr = tempArr.map(function (obj) {
        return obj.filename;
      });
    }
    let filenames = filenameArr.toString();
    return res.json({ 'success': true, 'data': filenames });

  }

}



