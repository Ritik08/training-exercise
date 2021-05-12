import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.authservice.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
