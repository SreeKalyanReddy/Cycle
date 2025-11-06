import bcrypt from 'bcryptjs';

const password = 'demo123';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nUse this hash in MongoDB for the password field.');
  });
});
