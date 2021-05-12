import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input() disabled = false;
  @Input() name: string = 'formSlider';
  @Input() color: ThemePalette = 'primary';
  @Input() sliderContent: String = 'Generic Slider';
  @Output() change: EventEmitter<MatSlideToggleChange> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  sliderToggle(event: any) {
    this.change.emit(event.checked.toString());
  }
}
