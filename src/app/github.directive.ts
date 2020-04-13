import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGithub]'
})
export class GithubDirective {

  constructor(private elem:ElementRef){
    this.elem.nativeElement.style.backgroundColor= 'yellow';
  }

}
