import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Livros', url: '/livros', icon: 'book' },
    { title: 'Autores', url: '/autores', icon: 'people-circle' },
  ];
  constructor() {}
}
