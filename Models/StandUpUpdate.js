const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StandUpUpdateSchema = new Schema({
    standup_id: {
        type: String,
        minlength: [4, 'standup id too short'],
        required: [true, 'standup_id not present.']
    },
    user_id: {
        type: String,
        minlength: [4, 'user id too short'],
        required: [true, 'user_id not present.']
    },
    responseTime: {
        type: Date,
        required: [true, 'responseTime must be present']
    },
    answers: {
        type: Object,
        validate: {
            validator: function (input) {
                let answers = input;
                let keys = Object.keys(answers);
                if (keys.length < 1) {
                    return false;
                }

                for(let i = 0; i < keys.length; i++) {
                  if(Object.keys(answers[keys[i]]).length < 2) {
                      return false;
                  }
                  if(answers[keys[i]].title === undefined) {
                      return false;
                  }
                  if(answers[keys[i]].response === undefined) {
                      return false;
                  }
                }
                
                return true;
            
            },
            message: 'A minimum of one question must be present with the form { question_1: {title: "What did you do today", response_type: "String"}, question_2: {title: "How many hours did you work today", response_type: "Number"}}',
        },
        required: [true, 'answers object not present']
    },
    user_id: String
});

const StandUpUpdate = mongoose.model('StandUpUpdate', StandUpUpdateSchema);
module.exports = StandUpUpdate;