var ActiveUser = (function() {
    var user = {
        _id: "",
        name: "",
        surname: "",
        role: "",
        email: "",
        professorId: "",
    };

    var getUser = function() {
        return JSON.parse(localStorage.getItem('user'));
    };

    var setUser = function(userData) {
        user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return {
        getUser: getUser,
        setUser: setUser
    }

})();

export default ActiveUser;
