import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const el = this.aboutSection.nativeElement;

    // Title reveal with a slight scale effect
    gsap.from(el.querySelector('.about-title'), {
      scrollTrigger: {
        trigger: el.querySelector('.about-title'),
        start: 'top 90%',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    // Main content area fade and slide
    gsap.from(el.querySelector('.about-main'), {
      scrollTrigger: {
        trigger: el.querySelector('.about-main'),
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Staggered reveal for stats
    gsap.from(el.querySelectorAll('.stat-item'), {
      scrollTrigger: {
        trigger: el.querySelector('.about-stats'),
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
    });
  }
}
