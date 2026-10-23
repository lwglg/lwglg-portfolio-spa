'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy route: redirect to merged Skills & Interests page */
export default function InterestsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/skills/');
  }, [router]);
  return null;
}
