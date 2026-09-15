// [step 24/25] style(disclaimer): polish button hover transitions and active states
// [step 23/25] style(disclaimer): add shadow and border-radius tokens to disclaimer card
// [step 22/25] style(disclaimer): add CheckCircle icon to acceptance button
// [step 21/25] refactor(disclaimer): optimize localStorage read on initial page render
// [step 20/25] style(disclaimer): add subtle backdrop blur to modal overlay
// [step 19/25] style(disclaimer): refine dark mode typography and contrast
// [step 18/25] docs(disclaimer): add JSDoc commentary to StudyDisclaimerModal
// [step 17/25] style(disclaimer): adjust modal responsive sizing for mobile viewports
// [step 16/25] accessibility(disclaimer): add aria-describedby and role attributes to modal
// [step 15/25] refactor(disclaimer): prevent dialog dismissal on outside click or escape key
// [step 14/25] style(disclaimer): design primary action button 'I Understand & Agree'
// [step 13/25] feat(disclaimer): add bullet points detailing permitted and prohibited actions
// [step 12/25] style(disclaimer): add cautionary callout box for legal consequences
// [step 11/25] feat(disclaimer): add explicit clause prohibiting commercial sale or redistribution
// [step 10/25] style(disclaimer): emphasize personal study use with bold highlights
// [step 9/25] feat(disclaimer): add legal warning text regarding content ownership
// [step 8/25] style(disclaimer): add warning border and subtle amber gradient to header
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
