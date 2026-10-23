'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AnimateOnScroll animation="fade-up" duration={550}>
        <ContactForm />
      </AnimateOnScroll>
    </div>
  );
}
