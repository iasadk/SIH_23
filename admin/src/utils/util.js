/* eslint-disable */

class util {
    setUserData = (data) => {
        window.localStorage.clear();
        window.localStorage.setItem('authorization', data.accessToken);
        window.localStorage.setItem('type', data.type);
    }
    getUserData = ($key) => {
        if ($key) {
            return JSON.parse(window.localStorage['user'])[$key];
        } else {
            return JSON.parse(window.localStorage['user']);
        }
    }
    setUserType = (data = '') => {
        window.localStorage.setItem('type', data);
    }
    userType = () => window.localStorage['type']
    getToken = () => {
        return window.localStorage['authorization'] || '';
    }
    isLogged = () => {
        if (typeof window.localStorage['authorization'] !== "undefined" && window.localStorage['authorization'] !== '') {
            return true;
        }
        return false;
    }

    logout = (e) => {
        if (e) e.preventDefault();
        window.localStorage.clear();
        window.location.reload();
    }
    getModules(key = null) {
        if (key) {
            if ((window.localStorage['modules'] || '').split(',').includes(key) || window.localStorage['userType'] === 'superAdmin') {
                return key;
            }
            return null;
        }
        return (window.localStorage['modules'] || '').split(',');
    }
    setModules(data) {
        window.localStorage.setItem('modules', data);
    }

    setTheme($theme = 'light') {
        window.localStorage.setItem('theme', $theme);
        return $theme;
    }
    getTheme() {
        return window.localStorage?.theme;
    }
    removeSpecialChars(key='') {
        return key?.toLowerCase()?.replace(/[^a-z0-9 _-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-');
    }
    handleInteger($str, $len = 10) {
        let num = $str?.replace(/[^0-9]/g, '');
        return $len ? num?.substring(0, $len) : num;
    }
    handleFloat(value, maxValue) {
        value = value.replace(/[^0-9.]/g, '')
        let newValue = value.replace(/[\.\%]/g, function (match, offset, all) {
            return match === "." ? (all.indexOf(".") === offset ? '.' : '') : '';
        })
        if (maxValue) {
            if (newValue * 1 > maxValue * 1) {
                newValue = maxValue
            }
        }
        return newValue
    }
    toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    queryStringToJSON(qs) {
        qs = qs || window.location.search.slice(1);
        if (qs.charAt(0) === '?') {
            qs = qs.slice(1);
        }

        var pairs = qs.split('&');
        var result = {};
        pairs.forEach(function (p) {
            var pair = p.split('=');
            var key = pair[0];
            var value = decodeURIComponent(pair[1] || '');
            if (result[key]) {
                if (Object.prototype.toString.call(result[key]) === '[object Array]') {
                    result[key].push(value);
                } else {
                    result[key] = [result[key], value];
                }
            } else {
                result[key] = value;
            }
        });

        return JSON.parse(JSON.stringify(result));
    };
}

export default new util();