import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGithub]'
})
export class GithubDirective {
  constructor(private el: ElementRef) { }

  private highlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.highlight('yellow')
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.highlight(null)
  }

}
