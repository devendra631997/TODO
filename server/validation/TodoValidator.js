const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateTodoInput(data){

const errors={};

data.name= !isEmpty(data.name)?data.name:"";
data.description= !isEmpty(data.description)?data.description:"";
data.duedate= !isEmpty(data.duedate)?data.duedate:"";

if (Validator.isEmpty(data.name)) {
    errors.name="Name field is empty"
}

if (Validator.isEmpty(data.description)) {
    errors.description="Description is Empty"
}

if (Validator.isBefore(data.duedate,data.dateset)) {
    errors.duedate="The deadline cannot be of a past date"
}
if (Validator.isEmpty(data.duedate)) {
errors.duedate="Due date is empty"
}

return{
errors,
isValid:isEmpty(errors)
};
};
