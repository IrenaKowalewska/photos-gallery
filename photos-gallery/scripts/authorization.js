import { 
    API_URL,
    API_URL_AUTH, 
    REDIRECT_URI, 
    RESPONSE_TYPE, 
    API_URL_TOKEN,
    SECRET_KEY,
    GRANT_TYPE,
    SCOPE, 
    ACCESS_KEY } from "./constants.js";

const getUserData = () => {
    return fetch(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
        }})
        .then((res) => res.json());
}

const getToken = (code) => {
    const url = new URL(API_URL_TOKEN);

    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('client_secret', SECRET_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', GRANT_TYPE);

    return fetch(url, {method: 'POST'})
    .then((res) => res.json())
    .then((data) => data.access_token);
}

const checkLogin = async () => {
    const url = new URL(location.href);
    const code = url.searchParams.get('code');

    if (code) {
        const token = await getToken(code);
        const url = new URL(location);

        localStorage.setItem('Bearer', token);

        url.searchParams.delete('code');
        history.pushState(null, document.title, url);
        
        return true;
    } else if(localStorage.getItem('Bearer')) {
        return true;
    }

    return false;
}

const login = () => {
    const url = new URL(API_URL_AUTH);

    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('response_type', RESPONSE_TYPE);
    url.searchParams.append('scope', SCOPE);

    location.href = url;
}

const logout = (e) => {
    const authBtn = e.target;

    if(confirm('Вы уверены?')) {
        localStorage.removeItem('Bearer');
        authBtn.textContent = '';
        authBtn.style.backgroundImage = '';
        authBtn.removeEventListener('click', logout);
        authBtn.removeEventListener('click', login);
        authorization(authBtn);
    }
}

export const authorization = async (authBtn) => {
    if(await checkLogin()) {
        const userData = await getUserData();
        authBtn.textContent = userData.name;
        authBtn.style.backgroundImage = `url(${userData.profile_image.medium})`;
        authBtn.addEventListener('click', logout);
    } else {
        authBtn.addEventListener('click', login);
    }
}