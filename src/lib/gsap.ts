import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText, CustomEase);
CustomEase.create('menuEase', '0.76, 0, 0.24, 1');

export { gsap, ScrollTrigger, SplitText, useGSAP, CustomEase };

