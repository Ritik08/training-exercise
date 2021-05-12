import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  accent: ThemePalette = 'accent';
  name: string = 'AgreeToNewsLetter';
  sliderContent: string = 'Agree To NewsLetter';
  // checked: boolean = false;

  constructor(private authService: AuthService) {
    this.maxDate = new Date();
  }
  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  sliderToggle(value: MatSlideToggleChange) {
    console.log(value);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
