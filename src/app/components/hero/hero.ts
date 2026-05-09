import { Component, HostListener } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero {
  wheelRotation = 0;
  textOpacity = 1;
  textTransform = 0;
  carTransformX = 0;
  carTransformY = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollY = window.scrollY;

    // Smooth wheel rotation based on scroll
    this.wheelRotation = scrollY * 0.4;
    
    // Fade out text as we scroll down
    this.textOpacity = Math.max(0, 1 - scrollY / 600);
    
    // Subtle parallax for text
    this.textTransform = scrollY * 0.2;

    // Move car forward and slightly down as we scroll
    this.carTransformX = scrollY * 0.1; // Moves right
    this.carTransformY = scrollY * 0.05; // Moves down
  }
}