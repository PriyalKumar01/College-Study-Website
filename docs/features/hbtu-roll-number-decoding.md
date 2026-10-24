# HBTU Roll Number Auto-Detection

## Decoding Logic
- **Pattern:** `YYBBXXXXX@hbtu.ac.in`
  - `YY`: Admission Year (e.g. `24` -> `2024`)
  - `BB`: Department Code (e.g. `05` -> CSE, `12` -> Plastic Technology)
  - Graduating Year = `Admission Year + 4`
