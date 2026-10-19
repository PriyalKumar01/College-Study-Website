import { useState, useEffect } from 'react';

export function useLiveStudentCount() {
  return { rawCount: 2484, formattedK: '2.5K+', formattedWithComma: '2,484+' };
}
