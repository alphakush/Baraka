const LocalStorageService = (function () {
    var _service; function _getService() {
        if (!_service) {
            _service = this;
            return _service
        } return _service
    } function _setToken(token) {
        localStorage.setItem('token', token);
    } function _getToken() {
        return localStorage.getItem('token');
    }  function _clearToken() {
        localStorage.removeItem('token');
    } function _setEmail(email) {
        localStorage.setItem('email', email);
    } function _getEmail() {
        return localStorage.getItem('email');
    }  function _clearEmail() {
        localStorage.removeItem('email');
    } function _setUsername(username) {
        localStorage.setItem('username', username);
    } function _getUsername() {
        return localStorage.getItem('username');
    }  function _clearUsername() {
        localStorage.removeItem('username');
    }return {
        getService: _getService,
        setToken: _setToken,
        getToken: _getToken,
        clearToken: _clearToken,
        setEmail: _setEmail,
        getEmail: _getEmail,
        clearEmail: _clearEmail,
        setUsername: _setUsername,
        getUsername: _getUsername,
        clearUsername: _clearUsername
    }
})(); export default LocalStorageService;
