
import request from 'superagent';

export default url => new Promise((resolve, reject) => {
  const req = request.get(url);

  req.end((err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});
