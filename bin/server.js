const mongoose = require('mongoose');
const DB_HOST =
  'mongodb+srv://Olha:KVJngdtsddqBdaaQ@cluster0.zgwj3.mongodb.net/contacts?retryWrites=true&w=majority';
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Data base connect success');
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
