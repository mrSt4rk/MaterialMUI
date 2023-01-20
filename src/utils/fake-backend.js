localStorage.setItem('muiUsers', JSON.stringify([{ id: 1, email: "abc@email.com", password: "123456", token: 'fake-jwt-token' }]));
const users = JSON.parse(localStorage.getItem('muiUsers')) || [];

export function configureFakeBackend() {
    const realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {

                    const params = JSON.parse(opts.body);

                    const filteredUsers = users.filter(user => user.email === params.email && user.password === params.password);
                    if (filteredUsers.length) {
                        const user = filteredUsers[0];
                        const responseJson = {
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            token: 'fake-jwt-token'
                        };

                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {

                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('Email or password is incorrect');
                    }
                    return;
                }




                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}