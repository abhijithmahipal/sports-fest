import { Directive, ElementRef, HostListener } from '@angular/core';
import { Element } from '@angular/compiler';

@Directive({
  selector: '[toggle]'
})
export class ToggleDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click') onClick () {
    var navBar: HTMLElement = document.getElementById('navbarTogglerDemo01');
    
    if(navBar.classList.contains('show'))
      navBar.classList.remove('show');
    else
      navBar.classList.add('show');

    event.stopImmediatePropagation();
  }

}
