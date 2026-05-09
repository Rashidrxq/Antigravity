import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;

  ngAfterViewInit() {
    this.initHeroAnimations();
  }

  private initHeroAnimations() {
    const el = this.heroSection.nativeElement;

    // Smooth background parallax
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      backgroundPositionY: '20%',
      ease: 'none'
    });

    // Title reveal with character stagger if possible (using simple fade for now)
    gsap.from(el.querySelector('.main-title'), {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5
    });

    // Content fade in
    gsap.from(el.querySelector('.info-section'), {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.2,
      ease: 'power2.out'
    });
  }
}