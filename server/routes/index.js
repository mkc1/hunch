const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});


module.exports = router;

// module.exports = (app) => {
//   // API routes
//     app.get('/', (req, res)=>{
//         res.sendFile('index');
//     })
// };
