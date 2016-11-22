// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { LoginService } from './login.service';

// @Component({
//     selector: 'login',
//     template: '<h1> test </h1>'
// })
// export class LoginComponent {
//     constructor(private loginService: LoginService, private router: Router) { }

//     onSubmit(email: string, password: string) {
//         this.loginService.login(email, password).subscribe((result) => {
//             if (result) {
//                 this.router.navigate(['']);
//             }
//         });
//     }
// }