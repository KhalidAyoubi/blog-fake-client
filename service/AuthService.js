export class AuthService {
    logIn(){
        const oauth2endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

        let form = document.createElement("form");
        form.setAttribute('method', 'GET');
        form.setAttribute('action', oauth2endpoint);

        const client_id = "170995807095-dbl0duiie46i5897bep5he2i6ijf9vhp.apps.googleusercontent.com";
        const params = {
            "client_id": client_id,
            "redirect_uri": "http://127.0.0.1:5500/logged.html",
            "response_type": "token",
            "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/blogger",
            "include_granted_scopes": "true",
            "state": "pass-through-value"
        };

        for (let param in params) {
            let input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', param);
            input.setAttribute('value', params[param]);
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
    }

    logOut(){
        localStorage.removeItem('authInfo');
        window.location.reload();
    }
}