import CryptoJS from 'crypto-js';

var ActiveUser = (function() {
    var secretKey = '**This1sv3rycompl1c4ted8ecretkey***';

    var getUser = function() {
        var encryptedData = localStorage.getItem('user');
        if (!encryptedData) {
            return null;
        }

        var bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return decryptedData;
    };

    var setUser = function(userData) {
        var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), secretKey).toString();
        localStorage.setItem('user', encryptedData);
    };

    var clearUser = function() {
        localStorage.removeItem('user');
    };

    return {
        getUser: getUser,
        setUser: setUser,
        clearUser: clearUser
    }
})();

export default ActiveUser;
