const functions=require('firebase-functions');
const admin=require('firebase-admin')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



admin.initializeApp();

const generateToken = (uid) => {
    return jwt.sign({ uid }, 'a0efc5aff94fd2e2c1262966eedda4eb275e61f18566f583a0761a226dceefc9', { expiresIn: '1h' });
  };
  exports.createUser = functions.https.onCall(async (data, context) => {
    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await admin.auth().createUser({
      email,
      password: hashedPassword,
    });
  
    const token = generateToken(user.uid);
  
    return { uid: user.uid, token };
  });
  
  exports.login = functions.https.onCall(async (data, context) => {
    const { email, password } = data;
  
    const user = await admin.auth().getUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
  
    const token = generateToken(user.uid);
  
    return { uid: user.uid, token };
  });