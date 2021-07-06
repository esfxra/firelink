import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayname: { type: String },
  bio: { type: String },
  avatar: { type: String },
  links: [{ url: String, title: String, published: Boolean }],
  appearance: {
    backgroundPage: String,
    backgroundCard: String,
    backgroundLink: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
