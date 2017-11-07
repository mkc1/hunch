import { normalize, schema } from 'normalizr';

export const userSchema = new schema.Array('users', null, {idAttribute: '_id'});

export const selectionSchema = new schema.Entity('selections', { 
  guessing_user: userSchema,
  suspected_user: userSchema
}, {idAttribute: '_id'});

export const answerSchema = new schema.Entity('answers', {
  user: userSchema,
  selections: [ selectionSchema ]
}, {idAttribute: '_id'});

export const gameSchema = new schema.Entity('games', {
    users: [ userSchema ],
    answers: [ answerSchema ]
}, {idAttribute: '_id'});