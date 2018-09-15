import { Model } from 'objection'

class Comment extends Model {
  static tableName = 'comments'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'comments.user_id',
        to: 'users.id',
      },
    },
    story: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Story`,
      join: {
        from: 'comments.story_id',
        to: 'story.id',
      },
    },
  }
}

export default Comment
