// [step 7/25] style(disclaimer): construct dialog header with ShieldAlert icon and alert badge
// [step 6/25] feat(disclaimer): add handleAccept handler with localStorage setItem
// [step 5/25] refactor(disclaimer): check csh_study_disclaimer_accepted on component mount
// [step 4/25] feat(disclaimer): add isOpen state and localStorage persistence key
// [step 3/25] style(disclaimer): import Dialog primitives and icons in StudyDisclaimerModal
// [step 2/25] feat(disclaimer): scaffold StudyDisclaimerModal component
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
