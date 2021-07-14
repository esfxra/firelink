import Adapters from 'next-auth/adapters';

/**
 * @reference https://next-auth.js.org/tutorials/typeorm-custom-models
 *
 * Extend the built-in models using class inheritance.
 * You can extend the options in a model but you should not remove the base
 * properties or change the order of the built-in options on the constructor.
 */
export default class User extends Adapters.TypeORM.Models.User.model {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);

    // Create as empty for the user to fill in later
    if (!this.username) {
      this.username = '';
    }
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,

    // Adding 'custom' username field
    username: {
      type: 'varchar',
      unique: true,
    },
  },
};
