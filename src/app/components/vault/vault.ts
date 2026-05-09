import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Asset {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  provenance: string;
}

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vault.html',
  styleUrl: './vault.scss',
})
export class Vault implements AfterViewInit {
  @ViewChild('vaultSection') vaultSection!: ElementRef;

  assets: Asset[] = [
    {
      id: '01',
      title: '911 GT3 RS',
      category: 'AUTOMOTIVE',
      year: '2023',
      image: '/porshe.jpg',
      provenance: 'Acquired from a private collection in Stuttgart. Single custodian since commission. Full service history at Porsche Zentrum.'
    },
    {
      id: '02',
      title: 'STUDIO ARCHIVE',
      category: 'HOROLOGY',
      year: '1965',
      image: '/about.jpg',
      provenance: 'Previously held by a prominent European racing family. Exceptional movement integrity and original patina.'
    },
    {
      id: '03',
      title: 'THE PROVENANCE',
      category: 'ESTATE',
      year: '2021',
      image: '/porshe.jpg',
      provenance: 'A rare architectural masterpiece in the Swiss Alps. Discreetly transferred between private foundations.'
    }
  ];

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initAnimations() {
    const el = this.vaultSection.nativeElement;

    // Header reveal
    gsap.from(el.querySelector('.vault-header'), {
      scrollTrigger: {
        trigger: el.querySelector('.vault-header'),
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Asset cards stagger reveal with a scale effect
    gsap.from(el.querySelectorAll('.asset-card'), {
      scrollTrigger: {
        trigger: el.querySelector('.asset-grid'),
        start: 'top 80%',
      },
      y: 60,
      scale: 0.98,
      opacity: 0,
      stagger: 0.25,
      duration: 1.5,
      ease: 'expo.out'
    });
  }
}
