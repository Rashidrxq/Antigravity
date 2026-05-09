import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CarBay {
  id: string;
  brand: string;
  name: string;
  year: string;
  color: string;
  image: string;
  bgLighting: string;
  details: {
    label: string;
    value: string;
  }[];
}

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garage.html',
  styleUrl: './garage.scss',
})
export class Garage implements AfterViewInit, OnDestroy {
  @ViewChild('garageSection') garageSection!: ElementRef;
  @ViewChild('horizontalTrack') horizontalTrack!: ElementRef;

  activeBgLighting: string = 'rgba(255, 255, 255, 0.05)';
  scrollTriggerInstance: any;

  bays: CarBay[] = [
    {
      id: '01',
      brand: 'PORSCHE',
      name: '911 GT3 RS',
      year: '2024',
      color: 'Matte Anthracite',
      image: '/porshe.jpg',
      bgLighting: 'rgba(213, 0, 28, 0.15)',
      details: [
        { label: 'Power', value: '525 PS' },
        { label: '0-100', value: '3.2s' },
        { label: 'Aero', value: 'DRS Active' }
      ]
    },
    {
      id: '02',
      brand: 'FERRARI',
      name: 'SF90 STRADALE',
      year: '2023',
      color: 'Rosso Corsa',
      image: '/about.jpg',
      bgLighting: 'rgba(255, 40, 0, 0.1)',
      details: [
        { label: 'Engine', value: 'V8 Hybrid' },
        { label: 'Torque', value: '800 Nm' },
        { label: 'Drive', value: 'eDrive' }
      ]
    },
    {
      id: '03',
      brand: 'LAMBORGHINI',
      name: 'REVUELTO',
      year: '2024',
      color: 'Bianco Monocerus',
      image: '/porshe.jpg',
      bgLighting: 'rgba(0, 255, 150, 0.08)',
      details: [
        { label: 'Engine', value: 'V12 Hybrid' },
        { label: 'Power', value: '1015 CV' },
        { label: 'Chassis', value: 'Carbon Mono' }
      ]
    },
    {
      id: '04',
      brand: 'ASTON MARTIN',
      name: 'VALKYRIE',
      year: '2023',
      color: 'Racing Green',
      image: '/about.jpg',
      bgLighting: 'rgba(0, 102, 51, 0.15)',
      details: [
        { label: 'Engine', value: '6.5L V12' },
        { label: 'Power', value: '1140 hp' },
        { label: 'Weight', value: '1030 kg' }
      ]
    },
    {
      id: '05',
      brand: 'PAGANI',
      name: 'UTOPIA',
      year: '2024',
      color: 'Exposed Carbon',
      image: '/porshe.jpg',
      bgLighting: 'rgba(50, 100, 255, 0.1)',
      details: [
        { label: 'Engine', value: '6.0L V12 TT' },
        { label: 'Trans', value: '7-spd Manual' },
        { label: 'Art', value: '1 of 99' }
      ]
    },
    {
      id: '06',
      brand: 'BUGATTI',
      name: 'CHIRON',
      year: '2022',
      color: 'Nocturne Black',
      image: '/about.jpg',
      bgLighting: 'rgba(200, 200, 255, 0.1)',
      details: [
        { label: 'Engine', value: '8.0L W16' },
        { label: 'Power', value: '1500 PS' },
        { label: 'Top Spd', value: '420 km/h' }
      ]
    },
    {
      id: '07',
      brand: 'KOENIGSEGG',
      name: 'JESKO',
      year: '2024',
      color: 'Crystal White',
      image: '/porshe.jpg',
      bgLighting: 'rgba(255, 200, 50, 0.1)',
      details: [
        { label: 'Engine', value: '5.0L V8 TT' },
        { label: 'Power', value: '1600 hp' },
        { label: 'Trans', value: '9-spd LST' }
      ]
    }
  ];

  ngAfterViewInit() {
    setTimeout(() => {
        this.initCinematicShowroom();
    }, 200);
  }

  private initCinematicShowroom() {
    const section = this.garageSection.nativeElement;
    const track = this.horizontalTrack.nativeElement;
    const baysElements = track.querySelectorAll('.car-bay');

    if (!baysElements.length) return;

    // Use total width of all bays
    const scrollDistance = track.scrollWidth - window.innerWidth;

    // 1. Create the Master Horizontal Timeline
    // This provides the "Oversized Scroll Height" and "Sticky Viewport Section"
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true, // Sticks the viewport
        scrub: 1, // Smooth scrolling
        start: 'top top',
        end: () => `+=${scrollDistance * 1.5}`, // Oversized height for distance
        invalidateOnRefresh: true,
        // Snap Cinematic Animation: Makes each car the hero focus
        snap: {
          snapTo: 1 / (this.bays.length - 1),
          duration: { min: 0.2, max: 0.8 },
          delay: 0.1,
          ease: "power2.inOut"
        }
      }
    });

    // 2. Horizontal Translation (translateX)
    mainTimeline.to(track, {
      x: -scrollDistance,
      ease: 'none'
    });

    this.scrollTriggerInstance = mainTimeline;

    // 3. Animate individual elements as the camera pans over them
    baysElements.forEach((bayEl: any, index: number) => {
      const carContainer = bayEl.querySelector('.car-container');
      const softBox = bayEl.querySelector('.soft-box-light');
      const bayUi = bayEl.querySelector('.bay-ui');
      const bayData = this.bays[index];

      // A. Car Parallax: Car moves slightly in the opposite direction of the pan for depth
      gsap.fromTo(carContainer, 
        { x: 100, rotateY: 5 },
        {
          x: -100,
          rotateY: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: bayEl,
            containerAnimation: mainTimeline,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        }
      );

      // B. Soft-Box Flare: Light turns on as the car enters the center of the viewport
      gsap.fromTo(softBox,
        { opacity: 0.1, scaleX: 0.8 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bayEl,
            containerAnimation: mainTimeline,
            start: 'left 60%', 
            toggleActions: 'play none none reverse'
          }
        }
      );

      // C. UI Reveal: Text slides up smoothly
      gsap.fromTo(bayUi, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bayEl,
            containerAnimation: mainTimeline,
            start: 'left 55%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // D. Background Lighting Change
      ScrollTrigger.create({
        trigger: bayEl,
        containerAnimation: mainTimeline,
        start: 'left 50%', // Change color when the bay hits the exact center
        end: 'right 50%',
        onToggle: (self) => {
          if (self.isActive) {
            this.activeBgLighting = bayData.bgLighting;
          }
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}
