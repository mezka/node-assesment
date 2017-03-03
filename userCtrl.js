var users = require('./users.js');


module.exports = {

    readAll: function readAll() {
        return users.find(null, 32); //Awesome way to get the users Array
    },

    findUserById: function(userId) {
        return users.findOne('id', Number(userId));
    },

    getAdmins: function() {
        return users.find('type', 'admin');
    },

    getNonAdmins: function() {
        return users.find('type', 'user');
    },

    getUsersByFavorite: function(favorite) {

        var out = [];

        users.find(null, 32).forEach(function(element) { //ugly code for ugly interface, keep this masterpiece of horror alive
            for (var i = 0; i < element.favorites.length; i++) {
                if (element.favorites[i] === favorite) {
                    out.push(element);
                    break;
                }
            }
        });

        if (out.length === 0)
            return null;
        else
            return out;
    },

    getUsersByAgeLimit: function(ageLimit) {

        var out = [];

        users.find(null, 32).forEach(function(element) {
            if (element.age < ageLimit) {
                out.push(element);
            }
        });

        if (out.lenth === 0) {
            return null;
        } else {
            return out;
        }

    },

    findUserByQuery: function(queryTerm, value){
        return users.find(queryTerm, value);
    },


    createUser: function(userObj){
      return users.add(userObj);
    },

    updateUser: function(userId, valuesObj){

      users.update('id', userId, valuesObj);
      return users.findOne('id', Number(userId));
    },

    removeUser: function(userId){
      console.log('removeUser ', userId);
      users.remove('id', Number(userId));
    }
};



//
// console.log(caca.getUsersByFavorite('aoiejojfdjijfew').forEach(function(element) {
//     console.log(element.id);
// }));
//
//
// console.log(caca.getUsersByFavorite('asdasdasdasf'));
