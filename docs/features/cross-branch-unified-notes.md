# Cross-Branch Unified Notes Strategy

## Problem Statement
Previously, shared subjects (e.g. Entrepreneurship, Business Ethics, FMMO, CPC) had fragmented note links across departments.

## Solution Architecture
1. The **semesterSubjectsCatalog** acts as a unified knowledge graph.
2. Notes uploaded in CSE, IT, or Chemical are consolidated into a master union list.
3. Every branch page calls `getUnifiedSubjectNotes(semesterNum, subjectName, fallbackNotes)`.
4. Zero duplicates, zero missing PDFs.
