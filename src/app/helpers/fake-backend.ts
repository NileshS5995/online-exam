import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
const users: User[] = [
    {
      id: 1,
      username: 'example1@email.com',
      password: 'test@123',
      firstName: 'firstName1',
      lastName: 'lastName1',
      authData: 'ZXhhbXBsZTFAZW1haWwuY29tOnRlc3RAMTIz',

    },
  ];

const questions = [
{
    id: 1,
    question: 'What is the difference between XML and HTML?',
    a: 'HTML is used for exchanging data, XML is not.',
    b: 'HTML can have user defined tags, XML cannot',
    c: 'XML is used for exchanging data, HTML is not',
    d: '',
    answer: 'b',
    selected: null
},
{
id: 2,
question: 'Opening Tag of HTML Tag is called as ________.',
    a: 'Closed Tag',
    b: 'Starting Tag',
    c: 'Forward Tag',
    d: 'Enging Tag',
answer: 'b',
selected: null
},
{
    id: 3,
    question: 'HTML stands for ________.',
    a: 'Hyper Text Markup Language',
    b: 'Hyper Text Makeup Language',
    c: 'None of these',
    d: 'Hyper Tech Markup Language',
    answer: 'a',
    selected: null
},
{
    id: 4,
    question: 'HTML program is saved using _________ extension.',
    a: '.htl',
    b: '.html',
    c: 'None of these',
    d: '.htlm',
    answer: 'b',
    selected: null
},
{
    id: 5,
    question: 'HTML Code written in MAC can be browsed in a PC with Window 7 installed , User will be able to see same design that was designed on the MAC Pc.',
    a: 'true',
    b: 'false',
    c: '',
    d: '',
    answer: 'a',
    selected: null
},
{
    id: 6,
    question: 'Who was the primary author of HTML?',
    a: 'ABrendan Eich',
    b: 'Sabeer Bhatiya',
    c: 'Tim Berners-Lee',
    d: 'Google Inc.',
    answer: 'c',
    selected: null
},
{
    id: 7,
    question: 'Which of the following is valid colour code ?',
    a: '#000000;',
    b: '#0000000;',
    c: '#00000000;',
    d: '#000000000;',
    answer: 'a',
    selected: null
},
{
    id: 8,
    question: 'Caption Tag in HTML ?',
    a: 'Is used to display the Title for table at the top;',
    b: 'Is used to display the Title for table at the bottom',
    c: 'Both',
    d: 'None',
    answer: 'c',
    selected: null
},
{
    id: 9,
    question: ' Which of the following is used increase the row height?',
    a: 'Cellspacing',
    b: 'Cellpadding',
    c: 'Row span',
    d: 'Col span',
    answer: 'c',
    selected: null
},
{
    id: 10,
    question: 'DOM stands for',
    a: 'CelDocument object model',
    b: 'Data object model',
    c: 'Document Oriented model',
    d: 'Data oriented model',
    answer: 'c',
    selected: null
},
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.endsWith('/questions') && method === 'POST':
                    return getQuestions();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
              return error('Username or password is incorrect');
            }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
            });
        }

        function getQuestions() {
            return ok(questions);
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) {
              return unauthorized();
            }
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        // function deleteUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     users = users.filter(x => x.id !== idFromUrl());
        //     localStorage.setItem('users', JSON.stringify(users));
        //     return ok();
        // }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};