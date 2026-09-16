import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, DownloadCloud } from 'lucide-react';

export const ExamNoticeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
