import { Component, output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Main } from "./main/main";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kafka-monitor-ui');

  isDarkMode = false;
  isEditMode = false;

  onDarkModeChange(event: boolean) {
    this.isDarkMode = event;
  }

  onEditModeChange(event: boolean) {
    this.isEditMode = event;
  }
}
