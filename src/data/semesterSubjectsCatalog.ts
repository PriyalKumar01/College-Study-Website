// Auto-generated Semester Subjects Catalog & Relational Sync
export interface CatalogNoteItem {
  title: string;
  url: string;
  recommended?: boolean;
}

export interface CatalogPlaylists {
  detailed: Array<{ title: string; url: string; recommended?: boolean }>;
  oneshot: Array<{ title: string; url: string; recommended?: boolean }>;
}

export interface SemesterSubjectItem {
  id: string;
  key: string;
  name: string;
  icon: string;
  color: string;
  branches: string[];
  notes: CatalogNoteItem[];
  playlists: CatalogPlaylists;
}

export const SEMESTER_SUBJECTS_CATALOG: Record<string, SemesterSubjectItem[]> = {
  "3": [
    {
      "id": "analyticalTechniques",
      "key": "analyticaltechniquesinbiotechnology",
      "name": "Analytical Techniques in Biotechnology",
      "icon": "⚙️",
      "color": "bg-teal-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bsa",
      "key": "basicsystemanalysis",
      "name": "Basic System Analysis",
      "icon": "🧲",
      "color": "bg-red-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Signals, Systems & Transforms (Laplace & Fourier) Notes",
          "url": "https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Laplace Transform Unit 3 Revision Notes",
          "url": "https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Signals & Systems Full Course by Umesh Dhande (GATE Academy)",
            "url": "https://www.youtube.com/playlist?list=PLqHE5qNs7QAhCj62sM9qF5cOnD411470e",
            "recommended": false
          },
          {
            "title": "Signals and Systems Complete Playlist (Engineering Funda)",
            "url": "https://www.youtube.com/playlist?list=PLHxIOuzvjEuXUqfL3G0gG4mH0kUa7Oa0p",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "biochemistry",
      "key": "biochemistrynotes",
      "name": "BioChemistry Notes",
      "icon": "🧪",
      "color": "bg-blue-500",
      "branches": [
        "BT"
      ],
      "notes": [
        {
          "title": "Pyrimidine Synthesis",
          "url": "https://drive.google.com/file/d/1pTJns7FgSGp7qxVu8T2rLknh-HZ85vWJ/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Purine & Pyrimidine Metabolism",
          "url": "https://drive.google.com/file/d/1OJf9h9G1TaGaRixcRVp-GlfJ3bEN3eTk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Nucleic Acid Metabolism",
          "url": "https://drive.google.com/file/d/1a7ZWZ64UBKFg1p5mqkrgM03q9Es4AOgB/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Lipids- Properties, Structure & Classifications",
          "url": "https://drive.google.com/file/d/1aBwCyYpW8S6qm2wG14-3ZXeDEoKQWRAR/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Lipid Oxidation of Fatty Acid",
          "url": "https://drive.google.com/file/d/1U4b4as7ATO8c-XaUODewAt_CNKPJqIa0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Lipid Disorder PDF",
          "url": "https://drive.google.com/file/d/1gI0lKKXatGxgExHMfD0tFhtvOu8fqm5L/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK-Principles of BioChemistry (by_Lehninger_4th Edition)",
          "url": "https://drive.google.com/file/d/1EISLid_3Lsy7qnFlOs1uaUWuQ9uU252S/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Enzyme PDF",
          "url": "https://drive.google.com/file/d/1c4ZNlSxzT0XYgrEVLK7UtMzB-U4Im8tw/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Disorder Of Carbohydrate Metabolism",
          "url": "https://drive.google.com/file/d/1J4F1SWGUdJ7MIZnZSxZblJIKEbFvtM-d/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Disorder of Purine and Pyrimidine",
          "url": "https://drive.google.com/file/d/1LUJg1S4KoxMwqUj_gJlI0IfWCtO-P11n/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Amino Acid Disorder",
          "url": "https://drive.google.com/file/d/1lF5odTEK-gJfp4s8LXUAYq0KSBZKBRTH/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bmc",
      "key": "buildingmaterialconstruction",
      "name": "Building Material & Construction",
      "icon": "🧱",
      "color": "bg-amber-600",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Exp.16- Compressive Strength",
          "url": "https://drive.google.com/uc?export=download&id=1Ihajiuc7lfFm9VBNJrPDbrtlCgnBnp8j",
          "recommended": false
        },
        {
          "title": "Unit-1 Composition of Good Bricks",
          "url": "https://drive.google.com/uc?export=download&id=1rVw0nHZSp4mPoyzsbpJwY4mc9Xayyedb",
          "recommended": false
        },
        {
          "title": "Unit-1 Designing of Stone",
          "url": "https://drive.google.com/uc?export=download&id=1obFomPg8EBisPXULfw132MELLMLkL9vw",
          "recommended": false
        },
        {
          "title": "Unit-1 Lime",
          "url": "https://drive.google.com/uc?export=download&id=1l-0Fh4ic3wCqDXChReowInUe-dyJrcP7",
          "recommended": false
        },
        {
          "title": "Unit-1 Topic: Manufacturing of Bricks",
          "url": "https://drive.google.com/uc?export=download&id=1jXmdfXPYApDYN0CcA1F2RIJM5qs9Z-bL",
          "recommended": false
        },
        {
          "title": "Unit-1 Topic: Stone Notes",
          "url": "https://drive.google.com/uc?export=download&id=1K8ProTDLlwm2F0rBUP4xYjKGvNdvkw3E",
          "recommended": false
        },
        {
          "title": "Unit-2 Characteristics of Aggregate",
          "url": "https://drive.google.com/uc?export=download&id=1L_racpULP-TQVAnNTs5GRLkTeZXHeC2-",
          "recommended": false
        },
        {
          "title": "Unit-2 Mortar & Its Classification",
          "url": "https://drive.google.com/uc?export=download&id=1ZUYNMO5unrpBMwrK7DwKYvhZWS-yczAD",
          "recommended": false
        },
        {
          "title": "Unit-2 Topic Admixture/Additives",
          "url": "https://drive.google.com/uc?export=download&id=1bTjel4NQY5-V2tIf7RXHtYYnW75lw5kL",
          "recommended": false
        },
        {
          "title": "Unit-2 Topic Cement",
          "url": "https://drive.google.com/uc?export=download&id=17L-FOB_cSJUuVY9f9KR_5iw0wwChH56T",
          "recommended": false
        },
        {
          "title": "Unit-2 Topic Manufacturing of Cement",
          "url": "https://drive.google.com/uc?export=download&id=1p6r1z9yh1_XY3ecD_ZQux4D-WL9k1pe8",
          "recommended": false
        },
        {
          "title": "Unit-2 Topic Timber Notes",
          "url": "https://drive.google.com/uc?export=download&id=1PuttlH6uYi9CqlAtBZ4IuJ7ulcrQRk7z",
          "recommended": false
        },
        {
          "title": "Unit-2 Types of Cement",
          "url": "https://drive.google.com/uc?export=download&id=1fgln9WybK5lcRmpGRxAJ_sOLaVFvMCwY",
          "recommended": false
        },
        {
          "title": "Unit-2 Aggregate Notes",
          "url": "https://drive.google.com/uc?export=download&id=19X6xdj_W7dPP1zx_0HLPtPg01ut33-Yn",
          "recommended": false
        },
        {
          "title": "Unit-2 Testing of Cement",
          "url": "https://drive.google.com/uc?export=download&id=1ym2P7Ik8aEk0zyT0N6kyt5a03hn_C2Pm",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cet",
      "key": "chethermo",
      "name": "Chemical Engineering Thermodynamics",
      "icon": "🔥",
      "color": "bg-red-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Full CET Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1zlfT4jBJLD4CRU_6ZBuxoFV9_K0uXetU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CET Full Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1p7fsSI1WveZivltVvUwKI_zxyhB7m0Di/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cpc",
      "key": "chemicalprocesscalculations",
      "name": "Chemical Process calculations (CPC)",
      "icon": "⚗️",
      "color": "bg-emerald-500",
      "branches": [
        "BE",
        "CHE",
        "FT",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "CPC BOOK By-D.C. SIKDAR",
          "url": "https://drive.google.com/file/d/13MfTeTun6v9N6V23N900a4DCQslGVhLx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC BOOK PDF By- Richard",
          "url": "https://drive.google.com/file/d/1YVThx8aLj0LLrwrif1wxTMJ1exoHRfcU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Imp. Notes",
          "url": "https://drive.google.com/file/d/1E4Im3I0DagUzRPz7-t2dzqdt3D6iozTA/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Notes",
          "url": "https://drive.google.com/file/d/1IlIEc5WezQ2HJqSzgyAS40bhfPuFB6JJ/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Class Ques.",
          "url": "https://drive.google.com/file/d/1D7sM9TggsJCuYrqHe9SSstIkIDBtRm9T/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Unit-1 Notes",
          "url": "https://drive.google.com/file/d/1xjEHt0QYO1inJEuOvaoFzvN8pQov5i2c/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC -Unit & Dimensions Notes",
          "url": "https://drive.google.com/file/d/1WaDMh8m02FyeO8nJGo36AlJhK914FfBh/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC All Unit Practice Problem",
          "url": "https://drive.google.com/file/d/1SvFXHNktnf7e7hIAkRrc9fvxEZNhqEN7/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Theory Part PDF",
          "url": "https://drive.google.com/file/d/1RaOznhdQL9TSuup6Vw193FupiBclMkIB/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Unit-2 Notes",
          "url": "https://drive.google.com/file/d/1Bp_prijNXbbdXcN6Eqs-BhPWbtaWFOEU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Unit-3 & 4 Notes",
          "url": "https://drive.google.com/file/d/1NixNyYKaq0gyU3GmZlBh6WmsiBnyQmUI/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BEST CPC Notes -Unit Operations & Process",
          "url": "https://drive.google.com/file/d/1m2VrF8AnRiHrfdGY7eiX6fR8kqbR5kfF/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Ideal Gas Law Notes",
          "url": "https://drive.google.com/file/d/1CzzJqujElxsMlmvED5wM6g-IZ0Wm4FGv/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Full Handwritten Notes",
          "url": "https://drive.google.com/file/d/1mqfkuHUGZ9scJ5Erv8qFEXMfm5bXptZy/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Numerical PDF",
          "url": "https://drive.google.com/file/d/13FFVHJVzOUg6H9r-gEvMyz8mHaxSH2S4/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Numerical Notes Plastic",
          "url": "https://drive.google.com/file/d/1zndHWn8Di_onzrLYqsXg6qQ8w_Mty5vc/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Unit-1,2 PYQs",
          "url": "https://drive.google.com/file/d/1TI77F8ycCA1gRXDMq6xaxo0uAhMB-KFc/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CPC Unit-2,3,4 PYQs",
          "url": "https://drive.google.com/file/d/1xQ1qfqTyaesMtrhPvNHaGbcozj2Kf7Xn/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "coap",
      "key": "chemistryofoilappliedproduct",
      "name": "Chemistry of Oil & Applied Product",
      "icon": "🧪",
      "color": "bg-blue-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "co",
      "key": "computerorganisation",
      "name": "Computer Organisation",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "CO Notes",
          "url": "https://drive.google.com/file/d/1_BSSWlVYgFZrNF2tmNEBhMDATUmCj73B/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Unit 3 & 4 Notes",
          "url": "https://drive.google.com/file/d/1nmTLVoJw-JmThfro0vm5Wk-taA1jDHBn/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Unit 3 Handwritten Notes",
          "url": "https://drive.google.com/file/d/1nt9Llpt9gmc2SlQb0fqwVzcEfAYjZkGD/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full CO Playlist SS Notes",
          "url": "https://drive.google.com/file/d/1565sCtaXE8cUAYyQ9t6hlShUkteSK8di/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Control Unit & Design Notes",
          "url": "https://drive.google.com/file/d/1o3kF8AMJDkFcIFVaaxiB2i8HNejd-GTk/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full Important CO Material - ESE",
          "url": "https://drive.google.com/file/d/15Ah5duaHgJSNDRD2chR68rUc1dozjcYW/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "RISC Vs CISC PDF",
          "url": "https://drive.google.com/file/d/1nuRiot85uZwMmsH_4vizdT92BNGGdPEJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Mid Sem 2 Numericals - Last Minute Revision PDF",
          "url": "https://drive.google.com/file/d/1o4JJ7-guZ4ttvNNitQd0Vh4aDeoNogRe/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Computer Organization Complete",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX&si=DIFQTSm2C9CeKCSW",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Computer Organization One Shot 1",
            "url": "https://youtu.be/DsK35f8wyUw?si=txkw3jBfvMrPRHI9",
            "recommended": false
          },
          {
            "title": "Computer Organization One Shot 2",
            "url": "https://youtu.be/nezosHntjPg?si=b07dVQUqLYcwXAak",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "dsuc",
      "key": "datastructures",
      "name": "Data Structures Using C",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Complete DSUC Best Notes - Quantum",
          "url": "https://drive.google.com/file/d/1owA6SjSqpZrLk1-qH_W0o96jamAcciOC/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "All Most Important Programs for End Sem DSUC",
          "url": "https://drive.google.com/file/d/16eqDnz71Ir1RulrBmeN7Lsxb54NnFPVs/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Lab File",
          "url": "https://drive.google.com/file/d/1-XiDXdsHOUgn_FWc7Vj3nqkPIpvQ6Z00/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 3 Notes",
          "url": "https://drive.google.com/file/d/16vyaX2v03fQIIRlPQEuRpZlj9yMkwslJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 1 Notes",
          "url": "https://drive.google.com/file/d/17AvvwyJt04S2BVhsGaeIPTmKiauFjFt3/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 2 Notes",
          "url": "https://drive.google.com/file/d/176a8uPhPDR4sCE0OGOnem3fAJzhEafHp/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 4 Notes",
          "url": "https://drive.google.com/file/d/16puOi7D4C8zNYQy7b5g57ldSY4uxKu1U/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 5 Notes",
          "url": "https://drive.google.com/file/d/16lSiwGeeApPd-ROVWiHzE2p_lrGl8Nmx/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Best Unit 1 Notes",
          "url": "https://drive.google.com/file/d/1ox2uuOi9_5E_OykzE4HVFziuaztrG_6h/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "DSUC Complete Playlist",
            "url": "https://youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU&si=ywuxQFLJq-6kBNBz",
            "recommended": false
          },
          {
            "title": "DSUC Advanced Playlist",
            "url": "https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j&si=UoNjnrMNLqIyMOJ7",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "DSUC One Shot Complete",
            "url": "https://youtu.be/MdG0Vw9f1A4?si=l-gk-33QAWwbhSeC",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "de",
      "key": "digitalelectronics",
      "name": "Digital Electronics (DE)",
      "icon": "🔢",
      "color": "bg-teal-500",
      "branches": [
        "CSE/IT",
        "ET"
      ],
      "notes": [
        {
          "title": "DE Complete Notes (BEST)",
          "url": "https://drive.google.com/file/d/1BUBUuMlABL7Uu-CxOa8_Q5tbFajxBI8t/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Full DE Notes - 5 Min. Engg.",
          "url": "https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Question Bank (Chapter Wise)",
          "url": "https://drive.google.com/file/d/1ANtk5b6Sr6Q6LQLDELmjDsiLis77ThjI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DE Complete Lab File",
          "url": "https://drive.google.com/file/d/1-u7KbXNDxNQNw7g64PEbwfqE7FOhZmRb/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Digital Circuit Book PDF",
          "url": "https://drive.google.com/uc?export=download&id=1M7-WFp832omjfPALcua0haNhY8-SBgv6",
          "recommended": false
        },
        {
          "title": "Digital Design Book",
          "url": "https://drive.google.com/uc?export=download&id=1ws89s_RjCm6ze8z2K1jknxTkZtgZTCgF",
          "recommended": false
        },
        {
          "title": "Digital Electronics Quantum PDF (Best)",
          "url": "https://drive.google.com/uc?export=download&id=1ksW_xMibmzUZRFScn3NenGzYYc2yxNS0",
          "recommended": false
        },
        {
          "title": "Semiconductor Material PDF",
          "url": "https://drive.google.com/uc?export=download&id=1P1X9JiJzdGg7FbEL3arfw4uTVISMcvbs",
          "recommended": false
        },
        {
          "title": "MOS Logic Family",
          "url": "https://drive.google.com/uc?export=download&id=1Yy9cysGTwmRHwfZAsdRY6YI3sRIYwAlR",
          "recommended": false
        },
        {
          "title": "Transistor Logic Circuit",
          "url": "https://drive.google.com/uc?export=download&id=1DqjPJwWjDvJ3ZBVFCQ3m6Nkg5I0XQp4l",
          "recommended": false
        },
        {
          "title": "Modeling Styles in VHDL",
          "url": "https://drive.google.com/uc?export=download&id=18xcUAe-dJjmnYlbZ7JHbEcLYDAW4vw2S",
          "recommended": false
        },
        {
          "title": "Binary Multiplier",
          "url": "https://drive.google.com/uc?export=download&id=1yApmfaL6yZybANtzaGWqMO2S1qp4DPNF",
          "recommended": false
        },
        {
          "title": "Code Converter PDF",
          "url": "https://drive.google.com/uc?export=download&id=1D5fIC8AfZVwvh-Gd9N2-vqNeGV2fry51",
          "recommended": false
        },
        {
          "title": "2 Bit Magnitude Comparator",
          "url": "https://drive.google.com/uc?export=download&id=1P4Yu75WoAst1fhF9trgee_uqu-yel5Ik",
          "recommended": false
        },
        {
          "title": "Implementation of MUX",
          "url": "https://drive.google.com/uc?export=download&id=1uyYZllDc2HKuu-Q98s8kj5_Ly_aq4shU",
          "recommended": false
        },
        {
          "title": "Minimize Output Logical Expression (Assignment)",
          "url": "https://drive.google.com/uc?export=download&id=1FKVUTDtpTANotGo8gQQ4ul8uqv6oY0tI",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Digital Electronics by-Vaibhav Jain (Best)",
            "url": "https://youtube.com/playlist?list=PL0c0N7xv8s06alYrdpsYjGXBs1IqIU8QS&si=YrMsDIvKhqS3pAjx",
            "recommended": false
          },
          {
            "title": "Digital Electronics by- Engg. Funda",
            "url": "https://youtube.com/playlist?list=PLgwJf8NK-2e7nYSG31YWEUfwgAp2uIOBY&si=gjuY7Q3o8GBTfdR3",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "DE One Shot by- Knowledge Gate",
            "url": "https://youtu.be/pHNbm-4reIc?si=BAIqs2C-Ga8NRzPJ",
            "recommended": false
          },
          {
            "title": "DE One Shot by- 5 Min. Engg.",
            "url": "https://youtu.be/9Tn9M98yER8?si=Mubongdz8rnHGTaz",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "em",
      "key": "economicsmanagement",
      "name": "Economics & Management (E & M)",
      "icon": "💼",
      "color": "bg-emerald-500",
      "branches": [
        "BE",
        "CHE",
        "FT",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "BEST Complete Notes (Unit 1 to 5)",
          "url": "https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Business Economics Book",
          "url": "https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "E&M Unit 1 (Part-1) Notes",
          "url": "https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "E&M Unit 1 (Part 2) Notes",
          "url": "https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 1 (Elasticity Notes)",
          "url": "https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Unit 2 Notes",
          "url": "https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 (Part-1) Notes",
          "url": "https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 (Part-2) Notes",
          "url": "https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "E&M Handwritten Notes",
          "url": "https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full Last Min. Revision Notes",
          "url": "https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 Notes",
          "url": "https://drive.google.com/file/d/1oFpjOIShc09HqzTfaLGO9R8ARQh4JQb8/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit 5 Notes",
          "url": "https://drive.google.com/file/d/1Bo3URn-WujyZCXYY5KuPQdL7itjztXyy/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Economics and Management Complete (Best)",
            "url": "https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy",
            "recommended": false
          },
          {
            "title": "Economics and Management Advanced",
            "url": "https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "electrical-machines-1",
      "key": "emmi",
      "name": "Electrical Machines & Measurements Instrumentation (EMMI)",
      "icon": "⚡",
      "color": "bg-amber-500",
      "branches": [
        "EE",
        "ET"
      ],
      "notes": [
        {
          "title": "Electrical Machines-I (Transformers & DC Machines) Complete Notes",
          "url": "https://drive.google.com/uc?export=download&id=122gY7moNtAZyisChZzdgtvkGI0dEHIux",
          "recommended": false
        },
        {
          "title": "Electrical Machines Formula Sheet & Important Derivations",
          "url": "https://drive.google.com/uc?export=download&id=1-L15l3RWjJfZYbIymeVjnwxSYevcDgGh",
          "recommended": false
        },
        {
          "title": "Unit-3 Notes",
          "url": "https://drive.google.com/uc?export=download&id=1wLj4vhrI_P-AY3yHWcjDo2bKbRXPY9jY",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "emft",
      "key": "electromagneticfieldtheory",
      "name": "Electromagnetic Field Theory ",
      "icon": "❓",
      "color": "bg-red-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Electromagnetic Field Theory Notes",
          "url": "https://vemu.org/uploads/lecture_notes/03_01_2020_1040364250.pdf",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "eca",
      "key": "electroniccircuitanalysis",
      "name": "Electronic Circuit Analysis (ECA)",
      "icon": "🔌",
      "color": "bg-blue-500",
      "branches": [
        "ET"
      ],
      "notes": [
        {
          "title": "ECA Book",
          "url": "https://drive.google.com/uc?export=download&id=1ei7KX3yS6TCUcC2Lkya5zVVLYD99ZvF5",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "et",
      "key": "enggthermodynamics",
      "name": "Engg. Thermodynamics",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Unit-1 ET Notes",
          "url": "https://drive.google.com/file/d/1L_cqxvSO6djvfa32zliF32MXiLT2nQh7/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 ET Notes (PART-1)",
          "url": "https://drive.google.com/file/d/1l5qwbL5puPX-SAD5Yc4ww5mSEsWnNvrd/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 ET Notes (PART-2)",
          "url": "https://drive.google.com/file/d/1BRrCZ5njGVkHWqDa6fG4rpB_ewIIePwG/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 ET Notes",
          "url": "https://drive.google.com/file/d/1hI6X8tlTlrJlNixbhaGIiRctrppFy9fx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 ET Notes",
          "url": "https://drive.google.com/file/d/1_kiMpbsqzcwPwOsl3hQpg9Wl9Q_Sfp75/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ET Self Study Notes",
          "url": "https://drive.google.com/file/d/10V0KF21CkXScf__3pLqWgFF7f--VE7mc/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "math2",
      "key": "math2",
      "name": "Engineering Mathematics-II",
      "icon": "📐",
      "color": "bg-emerald-500",
      "branches": [
        "BE",
        "CE",
        "CHE",
        "CSE/IT",
        "EE",
        "ET",
        "FT",
        "LFT",
        "ME",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "BEST Complete Notes (Unit 1 to 5)",
          "url": "https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit 1 C.F & PI Notes",
          "url": "https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 Notes",
          "url": "https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Notes",
          "url": "https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Mid Sem 2 Last Minute Revision",
          "url": "https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Best Maths Chapter 1 & 2 Notes",
          "url": "https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Formula Sheet Unit 1",
          "url": "https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Unit 1 Differential Equation- Fearless",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy",
            "recommended": false
          },
          {
            "title": "Unit 3 Laplace Transform - Fearless",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB",
            "recommended": false
          },
          {
            "title": "Fourier Series -Pradeep Giri Playlist",
            "url": "https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7",
            "recommended": false
          },
          {
            "title": "Fourier Series - MKS Playlist",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8",
            "recommended": false
          },
          {
            "title": "Partial Diff. Eq.- Gajendra Prohit",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k",
            "recommended": false
          },
          {
            "title": "Complete Engg Math-II -By: Gajendra Prohit",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx",
            "recommended": false
          },
          {
            "title": "Partial Diff. Eq.- MKS Playlist",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyJoNnAqghUK-Lit3qBgfa6o&si=RfESwXzHT7mFK_DG",
            "recommended": false
          },
          {
            "title": "Appliaction of Fourier Transforms to BVP",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyJCwFXRDW8KmDlBFGRAxnAu&si=Vi9_HhLL2K5r15gn",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "fmmo",
      "key": "fluidmechanics",
      "name": "Fluid Mechanics & Mechanical Operations (FMMO)",
      "icon": "🔬",
      "color": "bg-emerald-500",
      "branches": [
        "BE",
        "CE",
        "CHE",
        "FT",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "FMMO BOOK By-R.K.Bansal",
          "url": "https://drive.google.com/file/d/1gUIEEQgB-gr2kzFVMUjjvaP3DBsH0fYA/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Unit Operations-I BOOK",
          "url": "https://drive.google.com/file/d/1vGhqjvUuZpufXPTAT2f_zqULgTwGI2_K/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 PDF (Prof.)",
          "url": "https://drive.google.com/file/d/1sv5aeZzhBcru7YyyI22SiH0YMD2hh-Vz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 Notes (BEST)",
          "url": "https://drive.google.com/file/d/1pBTj_SwMPldAp8SYxBtBEyGJ2IDUo85p/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Notes (BEST)",
          "url": "https://drive.google.com/file/d/1ZRcG0KYOn1owZTAZgNwbf49bQZ4fX2dU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 Notes (BEST)",
          "url": "https://drive.google.com/file/d/1U0pCF65tSsQFNAjvrGvtlxay6qbB1hMk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Notes (BEST)",
          "url": "https://drive.google.com/file/d/1IAKxwQTXgo08XTJ_dKHqqeu1hpoRm6aS/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 Notes (BEST)",
          "url": "https://drive.google.com/file/d/1AWr7NUjpJIdoMSPRCv1JFc55f6ZiF-hx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Complete FMMO Notes (NEW & BEST)",
          "url": "https://drive.google.com/file/d/1SJ3aWlJFH-zFs15mvyUz9r0MkM7XuLsL/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Full Notes PDF (OLD)",
          "url": "https://drive.google.com/file/d/1G9NYplt56PH5BGzJObGRybQbPrYB1AOs/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO PYQS Solution PDF",
          "url": "https://drive.google.com/file/d/1W57HazGKgGCzYWW-zqAqa7PS5TDKZ8Fq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Unit-5 Diagram PDF",
          "url": "https://drive.google.com/file/d/1bcqck-B9HE1QPbR6JSgz1RnOn2na7cQq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Rotameter PDF",
          "url": "https://drive.google.com/file/d/1x9JM67WQ-7_ymlpnr7G4FFdxgoMMKIK-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Pump & Valves PDF",
          "url": "https://drive.google.com/file/d/1MzHpprRwR1j3EyToLPkL5HK-6pd6QLah/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Size Reduction Equipments Notes",
          "url": "https://drive.google.com/file/d/1AIPD6fjZwYaFyCvHj8VQcVb0k62wkXEh/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Manual PDF",
          "url": "https://drive.google.com/file/d/1SeTY3_cjBAXwRPJF-zcXmzir2subMH7Y/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1, 2, 3 (Part-1)",
          "url": "https://drive.google.com/file/d/1vH4H28t4RaXCv2ILjI3FUQviiTGDMdvm/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CEFM Notes (Part-2)",
          "url": "https://drive.google.com/file/d/14Aw4AqVi0-8WsA2cByZPiMNaE77E_bXj/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CEFM Notes (Part-3)",
          "url": "https://drive.google.com/file/d/1m_SuOF2lhHkFpDeUBwfBxZpAecgvT3lr/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CEFM Theoretical Notes",
          "url": "https://drive.google.com/file/d/1hje_3zG0kzp9vTmUDbXY6M_ylvlA3Qft/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Settling PDF",
          "url": "https://drive.google.com/file/d/1j9Qs-4MWG56ld5CreZGWTh6VRqKdizrH/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Screen Analysis PDF",
          "url": "https://drive.google.com/file/d/1BlYeGIH6WKgTAsCSS2nt_eS8Ce8hPWtq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Rotameter PDF",
          "url": "https://drive.google.com/file/d/12cN4OntYDhyj7J5peP2Rb1AxjAFbn6QV/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Jaw Crusher PDF",
          "url": "https://drive.google.com/file/d/159Z5Hs2YQ2J6NE29ojo65iYhDNHKuGkm/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Reynolds PDF",
          "url": "https://drive.google.com/file/d/1W5EACqOzZfKF4ftkEMNJu7qAXPJOzLXn/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Bernoullis Theorem PDF",
          "url": "https://drive.google.com/file/d/1uUW8X5RnykpdJtanfKf7W0rrEgy93fgl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Ball Mill PDF",
          "url": "https://drive.google.com/file/d/1o2qXKBm1iYYvLWB1lSUgIEfBicrY-7Pe/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "FMMO Lab Exp. -Roll Crusher PDF",
          "url": "https://drive.google.com/file/d/1U_9VVlvaAQv4t2GvAcJTvGAx0Zvrc-KS/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "falab",
      "key": "foodanalysislab",
      "name": "Food Analysis Lab",
      "icon": "👞",
      "color": "bg-amber-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "You May refer this PDF (as per your Syllabus)",
          "url": "https://buat.edu.in/wp-content/uploads/2025/06/Manual.pdf",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "fofs",
      "key": "fundamentalsoffoodsciencehumannutrition",
      "name": "Fundamentals of Food Science & Human Nutrition",
      "icon": "⚙️",
      "color": "bg-blue-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "You May refer this PDF (as per your Syllabus)",
          "url": "https://web.sol.du.ac.in/my_modules/type/cbcs-40/data/root/B.A.%20Programme/Semester%201/DISCIPLINE%20SPECIFIC%20CORE%20COURSE-DSC/NHE%20-%20Fundamentals%20of%20Nutrition%20and%20Food%20Science/English%20Medium/Unit%201-3.pdf",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "geotechnical",
      "key": "geotechnicalengineering",
      "name": "Geotechnical Engineering",
      "icon": "🪨",
      "color": "bg-yellow-600",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Unit-3 Consolidation of Soil",
          "url": "https://drive.google.com/uc?export=download&id=1-9mhmPtgVA02vg6g3W1eW87extGq3W92",
          "recommended": false
        },
        {
          "title": "Unit-3 Soil Compaction",
          "url": "https://drive.google.com/uc?export=download&id=1UpGmsD-noROZH64GTt6mrjQ_7cYDlD8l",
          "recommended": false
        },
        {
          "title": "Unit-4 Shear Stress of Soil",
          "url": "https://drive.google.com/uc?export=download&id=1luBPv3QT2WpifPJJ5tjJTGvNpyeiUYbE",
          "recommended": false
        },
        {
          "title": "Unit-4 Stress Distribution of Soil",
          "url": "https://drive.google.com/uc?export=download&id=1Zz6_7Jtjz55SLPQ0GqYxYzvxNZQO08BW",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "hdl",
      "key": "hardwaredescriptionlanguage",
      "name": "Hardware Description Language (HDL)",
      "icon": "💻",
      "color": "bg-purple-500",
      "branches": [
        "ET"
      ],
      "notes": [
        {
          "title": "HDL Book",
          "url": "https://drive.google.com/uc?export=download&id=1Do7Toyz5Wkjr-4RtbfrLPv4jd3rBhiqK",
          "recommended": false
        },
        {
          "title": "Complete HDL Notes",
          "url": "https://drive.google.com/uc?export=download&id=1CuFCLwYW92Bc9OJk2nnrLx8SVAxEtdo5",
          "recommended": false
        },
        {
          "title": "HDL Lab File",
          "url": "https://drive.google.com/uc?export=download&id=18eWiTlXAUAS-OP9JhDM8s0n-cRwO573H",
          "recommended": false
        },
        {
          "title": "VHDL Notes PDF",
          "url": "https://drive.google.com/uc?export=download&id=1Bpa98ASoIatwH53to9pPsR8Dtfwjthdh",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "immunology",
      "key": "immunologyimmunotechnology",
      "name": "Immunology & Immunotechnology",
      "icon": "🛡️",
      "color": "bg-purple-500",
      "branches": [
        "BT"
      ],
      "notes": [
        {
          "title": "Hypersensitivity to a Substance",
          "url": "https://drive.google.com/file/d/1bBXaBG8i55OrKu1OU8gV_Os0td4DU47H/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Immunology PDF Notes",
          "url": "https://drive.google.com/file/d/1I5CI39rdPx7g5c6YwqLisQ0o2DWa0f79/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Immunology BOOK by-Kuby(5 edition)",
          "url": "https://drive.google.com/file/d/1qzAlv9xYoYyBOgMgIccmhK_b5wnfkNeH/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Innate Immunity PDF",
          "url": "https://drive.google.com/file/d/1_m5NlOX_wx5yYF8rxSHn12bf2C5COL1D/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "itetiict",
      "key": "introtoemergingtechnologiesinict",
      "name": "Intro to Emerging Technologies in ICT",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "IoT Introduction PDF",
          "url": "https://drive.google.com/file/d/1_RxHI-c9kG75CDeqvMaq6ZF7kfpcASfr/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Cryptocurrency Notes",
          "url": "https://drive.google.com/file/d/1nXHy2Yc2Sj9Dbnk5sc8b40WRdR5FEYt-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "IoT Smart City PDF",
          "url": "https://drive.google.com/file/d/1_Ptg9E0I-o6t8yu_dx3tEEZ1SdF3mk7M/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OSI Model PDF",
          "url": "https://drive.google.com/file/d/1_UGWKcSl3PlJoPFnh7doApswuIxVDoxA/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Blockchain Notes",
          "url": "https://drive.google.com/file/d/1naxhYNRX8Jh3F761QKSXgz1GSPvEWQPI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Mid Sem 2 (Unit 3 & 4 Revision Notes)",
          "url": "https://drive.google.com/file/d/1o66wwin_5zxme7XQZtLxzrfDfRndVaIN/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Blockchain Reference Book",
          "url": "https://drive.google.com/file/d/1n31Nl9JGvvB9gu2IcYnHxA_f-_f81Abd/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Topic Smart Contract PDF",
          "url": "https://drive.google.com/file/d/1ncpHnKX8YdQb0S-qYPjZpy0raJSG6xCx/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "AWS, Azure & Cloud Difference - Most Important PDF",
          "url": "https://drive.google.com/file/d/1_5MPY5RNWggsfMMZ8OfNYwv25cTe5o1J/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Artificial Intelligence Notes",
          "url": "https://drive.google.com/file/d/1nQMQcUnAiWtmGsA7I8O5uhkGCJfVpumY/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "10 Use Cases of Blockchain PDF",
          "url": "https://drive.google.com/file/d/1nWBxdm1CXBihI_yI8BLan6lKeWkshEus/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 1 Short Notes",
          "url": "https://drive.google.com/file/d/1Yx6KtWPOFZo9r0Gkzz4wB63xGlzcRD7E/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 Short Notes",
          "url": "https://drive.google.com/file/d/1Z75dUAIGpD9BjO6XbTmrC5PLR3hbu4H6/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Short Notes",
          "url": "https://drive.google.com/file/d/1Z7DnmJZGdh9FvJf-9uzGWb2X0wlAi2ep/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 5 Short Notes",
          "url": "https://drive.google.com/file/d/1ZIdEag2hUDiDcS0oMMD6_0AYzucWll0n/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": [
          {
            "title": "ICT Introduction Video 1",
            "url": "https://youtu.be/6ptZr9VRxPs?si=IRMWuVFfR4-Yj6rM",
            "recommended": false
          },
          {
            "title": "ICT Introduction Video 2",
            "url": "https://youtu.be/Pg_9kXV1lXg?si=Z-jfUI57nI_c8_2w",
            "recommended": false
          },
          {
            "title": "ICT Introduction Video 3",
            "url": "https://youtu.be/mbdl-Fh5ALg?si=1JQlwxU9UroBsgL8",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "itpc",
      "key": "introtopolymerchemistry",
      "name": "Intro to Polymer Chemistry (ITPC)",
      "icon": "🛞",
      "color": "bg-teal-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "isctc",
      "key": "introductiontosurfacecoatingstheircomponents",
      "name": "Introduction to Surface Coatings & their Components",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "PT"
      ],
      "notes": [
        {
          "title": "ISCTC Lab Manual PDF",
          "url": "https://drive.google.com/file/d/1SicKQPQDoaQDrwiGN3qzoLPrmLj4BuF0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC Handwritten Lab Manual(2024-25)",
          "url": "https://drive.google.com/file/d/15_XZh01dDFy22raYnK-E1Gy7EZYFiebm/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Lab File PDF (2025-26)",
          "url": "https://drive.google.com/file/d/1yhFEy1Y61SO5AWhFlB9HPfMQWvK9lJOC/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC Material Science Notes",
          "url": "https://drive.google.com/file/d/1eADE8vXR9e_q_YW77XUmS2tLctzDW59G/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-1)",
          "url": "https://drive.google.com/file/d/1BV0U_5NCjihkqVTw6VN1Vz5TYh0IX2iW/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-2)",
          "url": "https://drive.google.com/file/d/1dlunt7Ld7zlnpYNCZmWvY7-ypb7IwiNf/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-3)",
          "url": "https://drive.google.com/file/d/1N9ALEID284Xkawk9DpGf99bJOdPEQGOs/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-4A)",
          "url": "https://drive.google.com/file/d/1Tegayk6H03oo4gyqhbOMOTe4Vt6iKw8F/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-4B)",
          "url": "https://drive.google.com/file/d/17_3NQnEx2lq-XCgKJZDvUNI7fcU1MdOC/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-5)",
          "url": "https://drive.google.com/file/d/1PkS_pe5gOpo4CVoNqLRrO7sgmoCHCjYE/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-6)",
          "url": "https://drive.google.com/file/d/1a7tAQF2D6YrZkk1BKPHO9lITWjhwcXY-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-7A)",
          "url": "https://drive.google.com/file/d/1uFZBjYHqZnfSWzRADhVnq_kFfx2i96hw/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-7B)",
          "url": "https://drive.google.com/file/d/1T_QGrdzYKIDmhjZcGhPGajLT9kh6rZJH/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-17)",
          "url": "https://drive.google.com/file/d/1xEKfsiqGD5CG6Xg0nUyK5Sr28j6c1iij/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC NOTES (Part-20)",
          "url": "https://drive.google.com/file/d/1CX6cGVitRhKf9FyAi6y8YBMkNLjU8TZt/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "UNIT-1 NOTES",
          "url": "https://drive.google.com/file/d/1pqPVNSdlt5MCDPkicOxvOF8LaLfPPl1i/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "UNIT-2 NOTES",
          "url": "https://drive.google.com/file/d/1f6uFKrkjkho-au-JqpskZ9a7yoPB4eZw/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 Modification of Oil",
          "url": "https://drive.google.com/file/d/18DyNRafEKaiGX5UUmlzuVZAhc9HGYcXY/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1,2,3 Class Notes",
          "url": "https://drive.google.com/file/d/1gb9wH8WicEIwZDUf40kGQGeIqrMNeKQM/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC Unit-4&5 Notes",
          "url": "https://drive.google.com/file/d/1_BZ8jfH52ckWoMkFxQzJOnW9dpow8nAl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC Unit-4 Class Notes",
          "url": "https://drive.google.com/file/d/1NOmb2eglOFAUX9gJ3H3VHQ4Y_0qwae_J/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ISCTC Unit-5  Class Notes",
          "url": "https://drive.google.com/file/d/1CNhrXXrXrlHeivRRaRJJ7UONIJbwMzFy/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "HF Paint-Volume 2 BOOK",
          "url": "https://drive.google.com/file/d/1XPcSgZwmWXDefe7YFpKMCXq0XAQmgNS9/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Driers PDF Notes",
          "url": "https://drive.google.com/file/d/11MLvSqJybl6LQFXpbAfOJu3O7GBPcYsg/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK Content - Vegetable Oil",
          "url": "https://drive.google.com/file/d/1JZDaR_05rlsgQenrtAuTSehQ9dxmrdDz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK Content - Solvents",
          "url": "https://drive.google.com/file/d/1DSzJzKo0jk-l8dXPgy214kjKaN6nfBgS/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK Content - Driers (Part-1)",
          "url": "https://drive.google.com/file/d/1DyYFJCUmLWMSdgmxicqRkD_KJZRP3-hx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK Content - Driers (Part-2)",
          "url": "https://drive.google.com/file/d/1OHtEQWWgdgYvvAQVNaR3vC_xZhHb9LVw/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ipr",
      "key": "iprethicspatentinginbiotechnology",
      "name": "IPR, Ethics & Patenting in Biotechnology",
      "icon": "📄",
      "color": "bg-green-500",
      "branches": [
        "BT"
      ],
      "notes": [
        {
          "title": "Unit-4 Bio-Safety (BEST)",
          "url": "https://drive.google.com/file/d/1r_GASU4kLBYxEOmUTBWJxpswvYUCAoAl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Bio Safety PDF",
          "url": "https://drive.google.com/file/d/1_CbZuuk4AC6-XxhaP4rO4gZD2O4sqigZ/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Bombs, Missiles, Rockets Patentability",
          "url": "https://drive.google.com/file/d/1-wZNO58wp_uxYYOKgLQekkHWIJ04fi7L/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "IPR & Patent in Biotechnology",
          "url": "https://drive.google.com/file/d/1vJO-9aF4JKKt0H-8JJQXhByZz2Pp3HeO/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "International Conventions & GATT",
          "url": "https://drive.google.com/file/d/1IblrgMSmoj_JS3zpKbYnGGGHsZsPIhgl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "IPR PDF",
          "url": "https://drive.google.com/file/d/1Jwi8aD6EC3APbE5wYqW_NgqMAKd-XNR1/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "kom",
      "key": "kinematicsofmachine",
      "name": "Kinematics of Machine",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "KOM BOOK By-S.S. Rattan",
          "url": "https://drive.google.com/file/d/1Ret3lDNQ-Q_aHekhx-1IrVwWN0T1teMN/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "lmspl",
      "key": "leathermicroscopyskinpretannageslab",
      "name": "Leather Microscopy & Skin PreTannages Lab",
      "icon": "👞",
      "color": "bg-amber-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "lmsp",
      "key": "leathermicroscopyskinproteins",
      "name": "Leather Microscopy & Skin Proteins",
      "icon": "⚙️",
      "color": "bg-blue-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "md",
      "key": "machinedrawing",
      "name": "Machine Drawing",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Official MD Syllabus",
          "url": "https://drive.google.com/file/d/1KwWOJi9yGLwqA5dLJJnF0pPR7rEbVXMq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "MD Objective Ques.",
          "url": "https://drive.google.com/file/d/1KEkAFfUTKrlfBZSflaRp-3JSY55W2z69/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ms",
      "key": "materialscience",
      "name": "Material Science",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Ferrous Material Notes",
          "url": "https://drive.google.com/file/d/1tUuPIWhyWBwySY3MwFzkStAjHAffeOdm/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1,2 & 3 Notes",
          "url": "https://drive.google.com/file/d/1oPMef-67CF8M0gDwoNHAfxutsSuCy_Me/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Notes",
          "url": "https://drive.google.com/file/d/1WjNZVn-02CXoYFBMYZU3ucP0vbk-KJ0R/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 Notes",
          "url": "https://drive.google.com/file/d/11RCPAy1-YnHr06_S6eM9u9ay5uKl1twR/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "GATE GPSC_Material Science Unit-1,2& 3 Notes",
          "url": "https://drive.google.com/file/d/1ibTXNh7As3GPVdt1W-AKZGAjsYF76M2C/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Imp. PYQS with Solutions",
          "url": "https://drive.google.com/file/d/1nmlQKBUPfw5RfO0-WRnXSrwyD4V4vvBi/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mes",
      "key": "mesnotes",
      "name": "MES Notes",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Unit-2 MES Notes",
          "url": "https://drive.google.com/file/d/1SQCyclPgRSj_dGA7WVU6lW9Eglw8y3kG/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 MES Notes",
          "url": "https://drive.google.com/file/d/1EO_jaSk0YL-xr8lJT9MZjc1UKQLIgFr3/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 MES Notes",
          "url": "https://drive.google.com/file/d/1hcIsrWh89XAXCJF_pE0zQhVMJkF6EQp2/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 MES Notes",
          "url": "https://drive.google.com/file/d/1CYNvhFWiz3zXyJD90XkJA99kRi6kzq1Q/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Most Imp. PYQS Solutions",
          "url": "https://drive.google.com/file/d/1kC6iv_fkPr8_JMGN_Ro_CpTPl_-rqymo/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "microBiology",
      "key": "microbiology",
      "name": "Micro Biology",
      "icon": "🔬",
      "color": "bg-orange-500",
      "branches": [
        "BT"
      ],
      "notes": [
        {
          "title": "Indicator Micro-Organism & Environment MicroBiology",
          "url": "https://drive.google.com/file/d/1qvJxb3pyd2xdfi7t8hbROALSb4T8BUim/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Bacterial Isolation, Identification & Storage",
          "url": "https://drive.google.com/file/d/1KZ84vZaL-nEojZ4h-YXbGw-epfifz_bi/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "MicroBiology PDF",
          "url": "https://drive.google.com/drive/folders/17Z8un86xg-4L-npNqap4AvXGhn8_K-Ka",
          "recommended": false
        },
        {
          "title": "Cont. Culture of Micro-Organism",
          "url": "https://drive.google.com/file/d/1XnLDMceHy2agIIuIUQIilDraJ3hOLgXR/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Control of Microbes",
          "url": "https://drive.google.com/file/d/1N6CWrOX0DlkZUpkr-Tg_LV01qEQRQu63/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Effect of factors on Growth",
          "url": "https://drive.google.com/file/d/18Id-MqneDHdEEfXyyuyqNSSTRlIDaAqk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Growth Curve PDF",
          "url": "https://drive.google.com/file/d/1C4i81RqL5jN-Oe5aBc5Pmxy-SA_0Vefw/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Micro-Biology BOOK By-Lansing M.Prescott",
          "url": "https://drive.google.com/file/d/1ByTWe6o6LPOxuVDJ__Ini7PcHVE538Xx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Maintenance & Preservation Of Microbes",
          "url": "https://drive.google.com/file/d/1OaLyAQo7r_DRDpw8JXF6Z6E75hoEYIHc/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Media , Type Culture Media PDF",
          "url": "https://drive.google.com/file/d/12Hxs3WkB_8Nt4Fk0KG52-LfCFOyu7k3v/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "MicroBiology BOOK By-Michael J.Pelczar",
          "url": "https://drive.google.com/file/d/1vBKvXHb1Af6qomRObNjd-VthHXmNuogy/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Microbial Growth Kinetics PDF",
          "url": "https://drive.google.com/file/d/1WaBiPgZFn6rOj-dgHHJIEqMUp4RX1Mnx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Numericals on Batch Reactor",
          "url": "https://drive.google.com/file/d/1GnE6ZkkqC4WGv2OTsIHAAIrwHg9v6jIT/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Procaryotic & Eukaryotic Microbes",
          "url": "https://drive.google.com/file/d/1G9JZkUliRjPIaj8I8QXBsZN8K5vFkOdq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "UNIT-2 Microbial Growth Kinetics(Batch,Fed batch,Chemostat microbial)",
          "url": "https://drive.google.com/file/d/1ftQHcySNxc0olXosmVTeGBcaHft-z3-k/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Viruses PDF",
          "url": "https://drive.google.com/file/d/15O74fVDx18rZfGSnKECvwVhThwqquhTW/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mbf",
      "key": "microbiologybiochemistryoffood",
      "name": "Microbiology & BioChemistry of Food (REFER from 3rd Sem BIOTECH BRANCH)",
      "icon": "🧪",
      "color": "bg-emerald-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Microbiology -REFER from 3rd Sem BIOTECH BRANCH (if topics Match)",
          "url": "https://college-study.netlify.app/third-semester-bt",
          "recommended": false
        },
        {
          "title": "BioChemistry -REFER from 3rd Sem BIOTECH BRANCH (if topics Match)",
          "url": "https://college-study.netlify.app/third-semester-bt",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "oal",
      "key": "oiloilseedanalysislab",
      "name": "Oil & Oilseed Analysis Lab",
      "icon": "🔬",
      "color": "bg-yellow-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "plantAnimal",
      "key": "plantanimalbiotechnology",
      "name": "Plant & Animal Biotechnology",
      "icon": "🌿",
      "color": "bg-indigo-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pclab",
      "key": "polymerchemistrylab",
      "name": "Polymer Chemistry Lab",
      "icon": "📝",
      "color": "bg-yellow-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pm",
      "key": "polymerizationengineeringi",
      "name": "Polymerization Engineering-I",
      "icon": "📐",
      "color": "bg-indigo-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pths",
      "key": "pretanningtanningofhidesandskins",
      "name": "Pre-Tanning & Tanning of Hides and Skins",
      "icon": "🧪",
      "color": "bg-emerald-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pfpp",
      "key": "principlesoffoodprocessingpreservation",
      "name": "Principles of Food Processing & Preservation",
      "icon": "🍽️",
      "color": "bg-orange-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Unit-1 (Part-1)",
          "url": "https://drive.google.com/file/d/1oCtO7Cpb_qFMZUT_04g1mAvN2a0follZ/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-2)",
          "url": "https://drive.google.com/file/d/184-BKZyYehJFsqA4hn1nNHgYsVggfR9K/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-3)",
          "url": "https://drive.google.com/file/d/12obsM0HJdgMEuOX4rm3wDKQdnBqnikFd/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-4)",
          "url": "https://drive.google.com/file/d/1bzW69P-hdYpu1fuFgJAG1Ljs7xgwsJA-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-5)",
          "url": "https://drive.google.com/file/d/1wNMyIADDGr71BEu3gp7JNNMxCVxjGomk/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-1)",
          "url": "https://drive.google.com/file/d/1Ty5ocnQ-YxohQyLusRzhz3YF69SSvggz/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-2)",
          "url": "https://drive.google.com/file/d/1KBpJNdy9XUQa_9Gg0mIkHpfD6CHKAW8Y/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Book: Unit Operations of Chemical Engineering",
          "url": "https://drive.google.com/file/d/1F2mZjPRCxjhYbPqsaowy8C0cbj9Z6arX/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "python",
      "key": "python",
      "name": "Python Programming",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "PP Notes",
          "url": "https://drive.google.com/file/d/14MsO70g821_IZrtXEp8bezOKnte8Enak/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PP Lab File",
          "url": "https://drive.google.com/file/d/1-Vb1JsaRf3VnonTH80EtYzg2W53n5HV5/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PP Best Quantum Notes",
          "url": "https://drive.google.com/file/d/1ovVLnKwYM1vsYSeAk0UNEqcF-lU7otVH/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Important PP Programs for ESE",
          "url": "https://drive.google.com/file/d/13viyP84UNb_1UfGWPUnqOapXUSq2jcMz/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Python Full Handwritten Notes",
          "url": "https://drive.google.com/file/d/1_VF2ORzst49Yu5BtYdhSkTbw16Wge2rE/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Python Programming Complete",
            "url": "https://youtube.com/playlist?list=PLvu-LC7buiaVdESLhxGj0BDQMjSLIEiSL&si=_GpcglKz_pZ78pt_",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Python Programming One Shot",
            "url": "https://youtube.com/playlist?list=PL49mRA0Y_C8vu2RWHdPsuRNRAcd89-eaz&si=dTvCvGhRbf7esBPJ",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "ssd",
      "key": "ssdc",
      "name": "Solid State Devices & Circuit (SSDC)",
      "icon": "🧲",
      "color": "bg-red-500",
      "branches": [
        "EE",
        "ET"
      ],
      "notes": [
        {
          "title": "SSD Unit-1 & 2 Notes",
          "url": "https://drive.google.com/file/d/1X-NSopwUOC9A6BsD__AhnjmnFEg7TSkE/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SSD Unit- 2 (Rest Part) Notes",
          "url": "https://drive.google.com/file/d/16KAdJDK18p5DkKFfkKkdZZFGpDX37Eyz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SSD Unit-3 Notes",
          "url": "https://drive.google.com/file/d/1XTvScS9PfCq7Nmwfvbb6lmdLhINN7vt0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SSD Unit-4 Notes",
          "url": "https://drive.google.com/file/d/1HY1UPSAbC8ortyoHtNx1EiFAL6ik2fc_/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SSD Unit-5 Notes",
          "url": "https://drive.google.com/file/d/1IpAE2s8LN6DkuHgQtx2EtATV6l3DoUr-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Microelectronic Circuit Book",
          "url": "https://drive.google.com/uc?export=download&id=1h-Xz0wo9m_tmzIUHI4a2GK1Wms5ICEqH",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Analog Electronics Playlist",
            "url": "https://youtube.com/playlist?list=PLs5_Rtf2P2r5MplAOADz3fTWIyBZTkGbB&si=7kE-IzLhxTi_ZYd8",
            "recommended": false
          },
          {
            "title": "EDC Complete YouTube Playlist",
            "url": "https://youtube.com/playlist?list=PLs5_Rtf2P2r75okkE2V9oXbwJI-8m-63Q&si=1zgs2v-uAFM46ddP",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "sccofw",
      "key": "sourcecompositioncharacterizationofoilsfatwaxes",
      "name": "Source Composition Characterization of Oils,Fat & Waxes",
      "icon": "🛢️",
      "color": "bg-teal-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "som",
      "key": "strengthofmaterial",
      "name": "Strength of Material",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Unit-1 Notes",
          "url": "https://drive.google.com/file/d/19bTcoGiDiYm6rtoXGe8IJvhgbCTc48h5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1, 2 & 3 Handwritten Notes",
          "url": "https://drive.google.com/file/d/17blfHAcJBn3xuR72YyZEos8HpX4gah50/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Theory of Failure",
          "url": "https://drive.google.com/file/d/1oKnyxO-KzRUuu2qFl21zgxyulHTxFZ0S/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 Thin & thick Cylinder Notes",
          "url": "https://drive.google.com/file/d/1fJZ2clBRsX8t6hZoA_Sue85IueQzL25e/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SOM Lab Ques.",
          "url": "https://drive.google.com/file/d/15aa0NBdtwFBJUaaK1tMdMM8GTxsDvlcL/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "SOM BOOK By- R.K.Bansal",
          "url": "https://drive.google.com/file/d/15ahuMSoS3b6XeNwK7WVxOQ93pk9ukMwx/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "som",
      "key": "strengthofmaterials",
      "name": "Strength of Materials",
      "icon": "💪",
      "color": "bg-green-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "SOM Book-by RK Bansal",
          "url": "https://drive.google.com/uc?export=download&id=15ahuMSoS3b6XeNwK7WVxOQ93pk9ukMwx",
          "recommended": false
        },
        {
          "title": "SOM lab Ques.",
          "url": "https://drive.google.com/uc?export=download&id=15aa0NBdtwFBJUaaK1tMdMM8GTxsDvlcL",
          "recommended": false
        },
        {
          "title": "Unit-1, 2 & 3 Handwritten Notes",
          "url": "https://drive.google.com/uc?export=download&id=17blfHAcJBn3xuR72YyZEos8HpX4gah50",
          "recommended": false
        },
        {
          "title": "Unit-4 Notes",
          "url": "https://drive.google.com/uc?export=download&id=1oKnyxO-KzRUuu2qFl21zgxyulHTxFZ0S",
          "recommended": false
        },
        {
          "title": "Unit-5 Notes",
          "url": "https://drive.google.com/uc?export=download&id=1fJZ2clBRsX8t6hZoA_Sue85IueQzL25e",
          "recommended": false
        },
        {
          "title": "Unit-1 pdf Notes",
          "url": "https://drive.google.com/uc?export=download&id=19bTcoGiDiYm6rtoXGe8IJvhgbCTc48h5",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "surveying",
      "key": "surveying",
      "name": "Surveying",
      "icon": "🗺️",
      "color": "bg-orange-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Surveying Book",
          "url": "https://drive.google.com/uc?export=download&id=1qtJeCVp96BCwBEL7VZFnw4ad4s5u5vHi",
          "recommended": false
        },
        {
          "title": "Ch-2 Horizontal Measurement Notes",
          "url": "https://drive.google.com/uc?export=download&id=1bV1bMacPNYa2zg2cwEsGgSm333f9NIsd",
          "recommended": false
        },
        {
          "title": "Ch-3 Compass Surveying",
          "url": "https://drive.google.com/uc?export=download&id=1dEQzPdFcZ0H83LHX3ZG_mS3H18fm2-Dk",
          "recommended": false
        },
        {
          "title": "Ch-4 Traversing Notes",
          "url": "https://drive.google.com/uc?export=download&id=12hNbwceSBlMebKC82Z1A9wMN-Mo0enM2",
          "recommended": false
        },
        {
          "title": "Module 4: Theodolite Surveying",
          "url": "https://drive.google.com/uc?export=download&id=13RKz1xnIfY2-gVg_4X-tdOM1Taa-jMyH",
          "recommended": false
        },
        {
          "title": "Surveying Lab Manual",
          "url": "https://drive.google.com/uc?export=download&id=12CaI5d370Xc9fgHwFh2u79DtCAzIuglE",
          "recommended": false
        },
        {
          "title": "Surveying Book-by SK.Duggal",
          "url": "https://drive.google.com/uc?export=download&id=1PikDBlGKeE3kmqDc8G-4mI_eB0f1t27y",
          "recommended": false
        },
        {
          "title": "Ch-1 Surveying",
          "url": "https://drive.google.com/uc?export=download&id=1bXv399k77ntNOUN--FfOZpT5icMv1trf",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "tofep",
      "key": "technologyoforganicfunctionaleffectpigments",
      "name": "Technology of Organic, Functional & Effect Pigments",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "PT"
      ],
      "notes": [
        {
          "title": "Unit-1 Notes (Prof.)",
          "url": "https://drive.google.com/file/d/1Rd194AYuRrzBlpHwutK9wyX5IObAxRnN/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 Notes (student)",
          "url": "https://drive.google.com/file/d/1AA4RV0KFEPbWM_sB27CFcsPC-LytIRjz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Notes(Prof.)",
          "url": "https://drive.google.com/file/d/1M1DvMpvH08uy4Jz9D1zpWKUFIKM8Gfvu/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Full Unit-3 Notes",
          "url": "https://drive.google.com/file/d/1_1ycfadTfGxxTtvV7EEOQO65Yi3EO1EO/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1a8AdHWHHDa_zl-vP8lQgsBvLLfiwc--v/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1u_JiNsEZ3N3O7TeToMSL-aU6gEIypGt1/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 & 4 Notes",
          "url": "https://drive.google.com/file/d/1RQNw3ezA1-sSHTnE4357uqcIksc7FPDs/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 Notes",
          "url": "https://drive.google.com/file/d/1M1ODKKsA6nc9hYLnpK4x7665yUgSSkUz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK -HF PAYNE VOL.1 PDF",
          "url": "https://drive.google.com/file/d/1fm5Lw8W4uCZQpTxy_ucMeqY10AKbEacI/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BOOK -OUTLINES OF PAINT TECHNOLOGY (BY-WM MORGANS)",
          "url": "https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    }
  ],
  "4": [
    {
      "id": "AgricultureBioTech",
      "key": "agriculturebiotechnology",
      "name": "Agriculture BioTechnology",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ac",
      "key": "analogcircuits",
      "name": "Analog Circuits",
      "icon": "💻",
      "color": "bg-red-600",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "amlml",
      "key": "analysisofmaterialsofleathermanufacturelab",
      "name": "Analysis of Materials of Leather Manufacture Lab",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "BioInformatics",
      "key": "bioinformaticsnotes",
      "name": "Bio-Informatics Notes",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "BioProcess",
      "key": "bioprocess",
      "name": "Bio-Process Engg.",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bme",
      "key": "biomedicalequipment",
      "name": "Biomedical Equipment",
      "icon": "🏥",
      "color": "bg-red-500",
      "branches": [
        "BE"
      ],
      "notes": [
        {
          "title": "BME Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cem",
      "key": "cemii",
      "name": "CEM-II",
      "icon": "🧪",
      "color": "bg-green-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Notes Coming Soon",
          "url": "#",
          "recommended": false
        },
        {
          "title": "Chemistry Lab Notes",
          "url": "https://drive.google.com/file/d/12v99u53GrcMPG33oW6UMfOohjPeSYbfP/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "cet",
      "key": "chethermo",
      "name": "Chemical Engineering Thermodynamics",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "Full CET Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1zlfT4jBJLD4CRU_6ZBuxoFV9_K0uXetU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CET Full Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1p7fsSI1WveZivltVvUwKI_zxyhB7m0Di/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "co",
      "key": "computerorganisation",
      "name": "Computer Organisation",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "CO Notes",
          "url": "https://drive.google.com/file/d/1_BSSWlVYgFZrNF2tmNEBhMDATUmCj73B/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Unit 3 & 4 Notes",
          "url": "https://drive.google.com/file/d/1nmTLVoJw-JmThfro0vm5Wk-taA1jDHBn/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Unit 3 Handwritten Notes",
          "url": "https://drive.google.com/file/d/1nt9Llpt9gmc2SlQb0fqwVzcEfAYjZkGD/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full CO Playlist SS Notes",
          "url": "https://drive.google.com/file/d/1565sCtaXE8cUAYyQ9t6hlShUkteSK8di/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Control Unit & Design Notes",
          "url": "https://drive.google.com/file/d/1o3kF8AMJDkFcIFVaaxiB2i8HNejd-GTk/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full Important CO Material - ESE",
          "url": "https://drive.google.com/file/d/15Ah5duaHgJSNDRD2chR68rUc1dozjcYW/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "RISC Vs CISC PDF",
          "url": "https://drive.google.com/file/d/1nuRiot85uZwMmsH_4vizdT92BNGGdPEJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "CO Mid Sem 2 Numericals - Last Minute Revision PDF",
          "url": "https://drive.google.com/file/d/1o4JJ7-guZ4ttvNNitQd0Vh4aDeoNogRe/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Computer Organization Complete",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX&si=DIFQTSm2C9CeKCSW",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Computer Organization One Shot 1",
            "url": "https://youtu.be/DsK35f8wyUw?si=txkw3jBfvMrPRHI9",
            "recommended": false
          },
          {
            "title": "Computer Organization One Shot 2",
            "url": "https://youtu.be/nezosHntjPg?si=b07dVQUqLYcwXAak",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "conm",
      "key": "computerorientednumericalmethods",
      "name": "Computer Oriented Numerical Methods",
      "icon": "📊",
      "color": "bg-green-500",
      "branches": [
        "CHE",
        "PT"
      ],
      "notes": [
        {
          "title": "CONM Notes (Part-1)",
          "url": "https://drive.google.com/file/d/12e_ozWRloNzQ1sJdaJkZgkY_LzR-2pC9/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CONM Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1bKvMQvMpZz5IotvJ3uteQaxhnSFP-6Zl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CONM Notes(unit 1-5)",
          "url": "https://drive.google.com/file/d/18lnFb5NV00LsRkdAqk1MyBHyinOf19n7/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "conm",
      "key": "computerorientednumericalsmethod",
      "name": "Computer Oriented Numericals Method",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "conm",
      "key": "conm",
      "name": "CONM Notes",
      "icon": "🌀",
      "color": "bg-blue-500",
      "branches": [
        "LFT",
        "PL"
      ],
      "notes": [
        {
          "title": "CONM Notes(unit 1-5)",
          "url": "https://drive.google.com/file/d/18lnFb5NV00LsRkdAqk1MyBHyinOf19n7/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cre",
      "key": "crei",
      "name": "CRE -I",
      "icon": "🧪",
      "color": "bg-blue-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "CRE Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1c7fQk_yJRZSXqGGCSc_QqC2stEnpbiBq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CRE Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1HbnmK2R-ldt9h350knkPMQskvz5IKQtD/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "dsuc",
      "key": "datastructures",
      "name": "Data Structures Using C (DSUC)",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "ET",
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "Complete DSUC Best Notes - Quantum",
          "url": "https://drive.google.com/file/d/1owA6SjSqpZrLk1-qH_W0o96jamAcciOC/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "All Most Important Programs for End Sem DSUC",
          "url": "https://drive.google.com/file/d/16eqDnz71Ir1RulrBmeN7Lsxb54NnFPVs/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Lab File",
          "url": "https://drive.google.com/file/d/1-XiDXdsHOUgn_FWc7Vj3nqkPIpvQ6Z00/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 3 Notes",
          "url": "https://drive.google.com/file/d/16vyaX2v03fQIIRlPQEuRpZlj9yMkwslJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 1 Notes",
          "url": "https://drive.google.com/file/d/17AvvwyJt04S2BVhsGaeIPTmKiauFjFt3/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 2 Notes",
          "url": "https://drive.google.com/file/d/176a8uPhPDR4sCE0OGOnem3fAJzhEafHp/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 4 Notes",
          "url": "https://drive.google.com/file/d/16puOi7D4C8zNYQy7b5g57ldSY4uxKu1U/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DSUC Unit 5 Notes",
          "url": "https://drive.google.com/file/d/16lSiwGeeApPd-ROVWiHzE2p_lrGl8Nmx/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Best Unit 1 Notes",
          "url": "https://drive.google.com/file/d/1ox2uuOi9_5E_OykzE4HVFziuaztrG_6h/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "DSUC Complete Playlist",
            "url": "https://youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU&si=ywuxQFLJq-6kBNBz",
            "recommended": false
          },
          {
            "title": "DSUC Advanced Playlist",
            "url": "https://youtube.com/playlist?list=PLVlQHNRLflP_OxF1QJoGBwH_TnZszHR_j&si=UoNjnrMNLqIyMOJ7",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "DSUC One Shot Complete",
            "url": "https://youtu.be/MdG0Vw9f1A4?si=l-gk-33QAWwbhSeC",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "de",
      "key": "digitalelectronics",
      "name": "Digital Electronics (DE)",
      "icon": "🔢",
      "color": "bg-teal-500",
      "branches": [
        "EE",
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "DE Complete Notes (BEST)",
          "url": "https://drive.google.com/file/d/1BUBUuMlABL7Uu-CxOa8_Q5tbFajxBI8t/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Full DE Notes - 5 Min. Engg.",
          "url": "https://drive.google.com/file/d/1LaApEGFI4z5n-6N54CtgmRwq7B03EZq5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Question Bank (Chapter Wise)",
          "url": "https://drive.google.com/file/d/1ANtk5b6Sr6Q6LQLDELmjDsiLis77ThjI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "DE Complete Lab File",
          "url": "https://drive.google.com/file/d/1-u7KbXNDxNQNw7g64PEbwfqE7FOhZmRb/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Digital Circuit Book PDF",
          "url": "https://drive.google.com/uc?export=download&id=1M7-WFp832omjfPALcua0haNhY8-SBgv6",
          "recommended": false
        },
        {
          "title": "Digital Design Book",
          "url": "https://drive.google.com/uc?export=download&id=1ws89s_RjCm6ze8z2K1jknxTkZtgZTCgF",
          "recommended": false
        },
        {
          "title": "Digital Electronics Quantum PDF (Best)",
          "url": "https://drive.google.com/uc?export=download&id=1ksW_xMibmzUZRFScn3NenGzYYc2yxNS0",
          "recommended": false
        },
        {
          "title": "Semiconductor Material PDF",
          "url": "https://drive.google.com/uc?export=download&id=1P1X9JiJzdGg7FbEL3arfw4uTVISMcvbs",
          "recommended": false
        },
        {
          "title": "MOS Logic Family",
          "url": "https://drive.google.com/uc?export=download&id=1Yy9cysGTwmRHwfZAsdRY6YI3sRIYwAlR",
          "recommended": false
        },
        {
          "title": "Transistor Logic Circuit",
          "url": "https://drive.google.com/uc?export=download&id=1DqjPJwWjDvJ3ZBVFCQ3m6Nkg5I0XQp4l",
          "recommended": false
        },
        {
          "title": "Modeling Styles in VHDL",
          "url": "https://drive.google.com/uc?export=download&id=18xcUAe-dJjmnYlbZ7JHbEcLYDAW4vw2S",
          "recommended": false
        },
        {
          "title": "Binary Multiplier",
          "url": "https://drive.google.com/uc?export=download&id=1yApmfaL6yZybANtzaGWqMO2S1qp4DPNF",
          "recommended": false
        },
        {
          "title": "Code Converter PDF",
          "url": "https://drive.google.com/uc?export=download&id=1D5fIC8AfZVwvh-Gd9N2-vqNeGV2fry51",
          "recommended": false
        },
        {
          "title": "2 Bit Magnitude Comparator",
          "url": "https://drive.google.com/uc?export=download&id=1P4Yu75WoAst1fhF9trgee_uqu-yel5Ik",
          "recommended": false
        },
        {
          "title": "Implementation of MUX",
          "url": "https://drive.google.com/uc?export=download&id=1uyYZllDc2HKuu-Q98s8kj5_Ly_aq4shU",
          "recommended": false
        },
        {
          "title": "Minimize Output Logical Expression (Assignment)",
          "url": "https://drive.google.com/uc?export=download&id=1FKVUTDtpTANotGo8gQQ4ul8uqv6oY0tI",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Digital Electronics Complete (Best)",
            "url": "https://youtube.com/playlist?list=PL0c0N7xv8s06alYrdpsYjGXBs1IqIU8QS&si=YrMsDIvKhqS3pAjx",
            "recommended": false
          },
          {
            "title": "Digital Electronics Advanced",
            "url": "https://youtube.com/playlist?list=PLgwJf8NK-2e7nYSG31YWEUfwgAp2uIOBY&si=gjuY7Q3o8GBTfdR3",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Digital Electronics One Shot 1",
            "url": "https://youtu.be/pHNbm-4reIc?si=BAIqs2C-Ga8NRzPJ",
            "recommended": false
          },
          {
            "title": "Digital Electronics One Shot 2",
            "url": "https://youtu.be/9Tn9M98yER8?si=Mubongdz8rnHGTaz",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "eem",
      "key": "electricalenggmaterials",
      "name": "Electrical Engg. Materials",
      "icon": "💻",
      "color": "bg-teal-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "em-II",
      "key": "electricalmachineii",
      "name": "Electrical Machine-II",
      "icon": "💻",
      "color": "bg-teal-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Complete Notes",
          "url": "https://drive.google.com/file/d/1ZPre4AgidRaV13iDh8pfpcbHkH0diRDl/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "EM-II BOOK PDF",
          "url": "https://drive.google.com/file/d/1YbGN2j5OSvmOAbHYyvOd3Q2HoqkXQjO6/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "ALL EM-II PYQS",
          "url": "https://drive.google.com/file/d/1gED5OOR1_M6zEKGgpD3_D5YOgsCoZFSR/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "emft",
      "key": "electromagneticfieldtheory",
      "name": "Electro Magnetic Field Theory (EMFT)",
      "icon": "💻",
      "color": "bg-red-600",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "eca",
      "key": "electroniccircuitanalysis",
      "name": "Electronic Circuit Analysis (ECA)",
      "icon": "🔌",
      "color": "bg-blue-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "ECA Book",
          "url": "https://drive.google.com/uc?export=download&id=1ei7KX3yS6TCUcC2Lkya5zVVLYD99ZvF5",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "math3",
      "key": "enggmath",
      "name": "Engg Math\\",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Complete Math-III Notes(Unit 1-5)",
          "url": "https://drive.google.com/file/d/1UNq-P8jCu1R0ucy2zXh1OID5ExaQcUL5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BS Gerewal Math Book",
          "url": "https://drive.google.com/file/d/1WO6VBRte2_4ZdXbwuwLoA4PfjgSFdabL/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "HK Das Math Book",
          "url": "https://drive.google.com/file/d/1WO_2jHYoYX_T9PoZHVVvts4WssiWRqPK/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Unit-1,2 & 3 Notes",
          "url": "https://drive.google.com/file/d/1CE9GVSQI9YCq6iEZ25ASudXDyLHEL5tJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 (Moment) Notes",
          "url": "https://drive.google.com/file/d/1R0KO9NqX0WFnSbuFqZMTxyol1KmIrC5T/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 5 Notes",
          "url": "https://drive.google.com/file/d/1R0nue1eUT7kZXKeQnXJiZ6mZuijVoQ07/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 Curve Fitting Notes",
          "url": "https://drive.google.com/file/d/1CEcIG1FTaeZdqRn53Fy-O8at9SGbmXX2/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Z-Transform Notes",
          "url": "https://drive.google.com/file/d/1_QbIn7C9i3M8E6HD_J3hNwgMORjrMEaj/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "EM-III Residue Notes",
          "url": "https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Harmonic Function Prove Notes",
          "url": "https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "em",
      "key": "economicsmanagement",
      "name": "Engg. Economics & Management (E & M)",
      "icon": "💼",
      "color": "bg-blue-500",
      "branches": [
        "CSE/IT",
        "EE",
        "ET"
      ],
      "notes": [
        {
          "title": "Complete Notes (Unit 1 to 5)",
          "url": "https://drive.google.com/file/d/1FKODzWwkZ4NLUs4J53Jw6aE3qIkfV3NK/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Business Economics Book",
          "url": "https://drive.google.com/file/d/1XD2CnTGa8tpUzqLPlzzDnc1-P60wdAJO/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "E&M Unit 1 (Part-1) Notes",
          "url": "https://drive.google.com/file/d/1UI4YbkhC7bbb7DpMtNgnciPCFV_c7FaL/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "E&M Unit 1 (Part 2) Notes",
          "url": "https://drive.google.com/file/d/1UObid3Prm9I_JVbxPqaPSukSmQ8qyCV6/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 1 (Elasticity Notes)",
          "url": "https://drive.google.com/file/d/1U8GWR590L9kRgbe5_fZ6t-myuUoXmqn8/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Unit 2 Notes",
          "url": "https://drive.google.com/file/d/1UOd_TOHZeOayp-W0NeKdmnv2mXr7-or-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 (Part-1) Notes",
          "url": "https://drive.google.com/file/d/1UPKMYKBS5k96DWeB2xyVy1ix9gUBnF_o/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 (Part-2) Notes",
          "url": "https://drive.google.com/file/d/1U_rmk9aE-Ge6cxrPqIBbNovw9kwXm56M/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 Notes",
          "url": "https://drive.google.com/file/d/1oFpjOIShc09HqzTfaLGO9R8ARQh4JQb8/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit 5 Notes",
          "url": "https://drive.google.com/file/d/1Bo3URn-WujyZCXYY5KuPQdL7itjztXyy/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "E&M Handwritten Notes",
          "url": "https://drive.google.com/file/d/1XANMyirw8Bb8Ks4m-R9jOtJ-0CncP5mQ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Full Last Min. Revision Notes",
          "url": "https://drive.google.com/file/d/1Tv4l6-DNZygMKa-7AP73LvBki4L3QQcI/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Economics and Management Complete (Best)",
            "url": "https://youtube.com/playlist?list=PLsh2FvSr3n7cjVNULjFnVvI_DMVoMYG9o&si=iQiHHTspvuH4MEOy",
            "recommended": false
          },
          {
            "title": "Economics and Management Advanced",
            "url": "https://youtube.com/playlist?list=PLaAhQ2ofZZRC1OFxHoa8qGyFHDgk7PyUN&si=5HtscWYDIA3f9qae",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "math3",
      "key": "math2",
      "name": "Engineering Mathematics-III",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "BE",
        "CSE/IT",
        "EE",
        "ET",
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "EM-III Complete Notes",
          "url": "#",
          "recommended": false
        },
        {
          "title": "Complete Math-III Notes(Unit 1-5)",
          "url": "https://drive.google.com/file/d/1UNq-P8jCu1R0ucy2zXh1OID5ExaQcUL5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "BS Gerewal Math Book",
          "url": "https://drive.google.com/file/d/1WO6VBRte2_4ZdXbwuwLoA4PfjgSFdabL/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "HK Das Math Book",
          "url": "https://drive.google.com/file/d/1WO_2jHYoYX_T9PoZHVVvts4WssiWRqPK/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Unit-1,2 & 3 Notes",
          "url": "https://drive.google.com/file/d/1CE9GVSQI9YCq6iEZ25ASudXDyLHEL5tJ/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 (Moment) Notes",
          "url": "https://drive.google.com/file/d/1R0KO9NqX0WFnSbuFqZMTxyol1KmIrC5T/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 5 Notes",
          "url": "https://drive.google.com/file/d/1R0nue1eUT7kZXKeQnXJiZ6mZuijVoQ07/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 4 Curve Fitting Notes",
          "url": "https://drive.google.com/file/d/1CEcIG1FTaeZdqRn53Fy-O8at9SGbmXX2/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Z-Transform Notes",
          "url": "https://drive.google.com/file/d/1_QbIn7C9i3M8E6HD_J3hNwgMORjrMEaj/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "EM-III Residue Notes",
          "url": "https://drive.google.com/file/d/1_PeEnniPP66dRbwGRJiPzyjLTEs00jbX/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Notes (Unit 1 to 5)",
          "url": "https://drive.google.com/file/d/1EZQ7WMY4EoS9kewXgqRp-dbkLFcsVx-J/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit 1 C.F & PI Notes",
          "url": "https://drive.google.com/file/d/1_OfjdkVBUxb6352LJcCSqv_nKrjz4uSU/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 Notes",
          "url": "https://drive.google.com/file/d/1_OSlf-B7K9TFC1LgA6yZDUH2sQL-RTy0/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Notes",
          "url": "https://drive.google.com/file/d/1_PtU2rwcwDjGnrBwBpTtSeohDrbvxDBa/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Mid Sem 2 Last Minute Revision",
          "url": "https://drive.google.com/file/d/1oGU5M62XSyErVp3qP4CrEj1v0t5FQqej/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Best Maths Chapter 1 & 2 Notes",
          "url": "https://drive.google.com/file/d/1_JfBOvZp84amQj6Mo7-KtwrARm1kTHUr/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Formula Sheet Unit 1",
          "url": "https://drive.google.com/file/d/1T6PERNwiIdoA0Vm2EGyIVwp9TlrG7IrX/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Fourier Integral Playlist by-Fearless (Best)",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyITz_e6F9YiyongjaCryasK&si=xhAnYIkAQTe5jAw-",
            "recommended": false
          },
          {
            "title": "Complex Variable (Complete Playlist) by-Fearless (Best)",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljVCPXMA2wwA9oIV3blxLLQ6&si=zRcZEv8D7dK-CP2M",
            "recommended": false
          },
          {
            "title": "Unit 3 Complex Integration Playlist By-Fearless (Best)",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljWlvUJ-YmjMsjkAANOagCk7&si=o7JtHhGSY40pDjWY",
            "recommended": false
          },
          {
            "title": "Unit 4 Curve Fitting, Correlation & Regression by-Gajendra Prohit (Best)",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfL1Mrdj7bs2A6bQOU7FMqKX&si=wFlWnVRj-HEH7qAw",
            "recommended": false
          },
          {
            "title": "Unit 5 Probability & Distribution Playlist by- MKS (Best)",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyLB62_-fT9VNbjRkDEzJzzp&si=FE8RI4spBCakwAgh",
            "recommended": false
          },
          {
            "title": "Laplace Transform & Fourier Series By-Pradeep Giri (Best)",
            "url": "https://youtube.com/playlist?list=PLT3bOBUU3L9jr5vb-zUd4GUFaexGDiRc9&si=uMG3aPDDGVRo_QOQ",
            "recommended": false
          },
          {
            "title": "Hypothesis Testing Playlist By-Fearless (Best)",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljWze2qPIgZv-CtBJYHEIvqa&si=yrKbGQpWpqNZeDwi",
            "recommended": false
          },
          {
            "title": "Engineering Mathematics-III General 1",
            "url": "https://youtube.com/playlist?list=PLNKD1qB9pptvgPP_zrKXa64SPYtKQpy-C&si=mOUPo8QHIhN5w9md",
            "recommended": false
          },
          {
            "title": "Engineering Mathematics-III General 2",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljVF5-HxU829qWUMRFwDAu3v&si=YqbaDiSVfO_BQrlN",
            "recommended": false
          },
          {
            "title": "Engineering Mathematics-III General 3",
            "url": "https://youtube.com/playlist?list=PLT3bOBUU3L9ibhrkzWki0_tfrugS4rvnJ&si=fOLiA6fhcpYafFnO",
            "recommended": false
          },
          {
            "title": "Engineering Mathematics-III General 6",
            "url": "https://youtube.com/playlist?list=PLT3bOBUU3L9iHqXEfSTmpmOpEkUmj-Qay&si=xiSCdE-W81UTMxg6",
            "recommended": false
          },
          {
            "title": "Engineering Mathematics-III General 7",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfK_FysPwDqaoUKhTqms_aEg&si=4iqfG5zjBHpBMQU_",
            "recommended": false
          },
          {
            "title": "Unit 1 Differential Equation- Fearless",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljW1pwNMiPFDvR6zCbA9kRyd&si=eKIFeUwcRRvEW-iy",
            "recommended": false
          },
          {
            "title": " Unit 3 Laplace Transform - Fearless",
            "url": "https://youtube.com/playlist?list=PL5Dqs90qDljWpJyo3QVVyY-o2xVCtxOfF&si=7l12sPrchJuFdEFB",
            "recommended": false
          },
          {
            "title": "Fourier Series -Pradeep Giri Playlist",
            "url": "https://youtube.com/playlist?list=PLT3bOBUU3L9garIMWIqgAJ6wqBUe4ckFm&si=sULV2V8F8CxNfLU7",
            "recommended": false
          },
          {
            "title": "Fourier Series - MKS Playlist",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyLke5_cby8i8ZhK8FHpw3qs&si=EXY9L4AxKVg58a-8",
            "recommended": false
          },
          {
            "title": "Partial Diff. Eq.- MKS Playlist",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyJoNnAqghUK-Lit3qBgfa6o&si=RfESwXzHT7mFK_DG",
            "recommended": false
          },
          {
            "title": "Partial Diff. Eq.- Gajendra Prohit",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfJljvy7Goi78EGwjPDQEnSw&si=dJ54yTQ9R4ZYmV7k",
            "recommended": false
          },
          {
            "title": "Appliaction of Fourier Transforms to BVP",
            "url": "https://youtube.com/playlist?list=PLhSp9OSVmeyJCwFXRDW8KmDlBFGRAxnAu&si=Vi9_HhLL2K5r15gn",
            "recommended": false
          },
          {
            "title": "Complete Engg Math-II -By: Gajendra Prohit",
            "url": "https://youtube.com/playlist?list=PLU6SqdYcYsfKqa52m3wyMZb1KVWuZsA2T&si=MnC0WGH0egKRZkHx",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Engineering Mathematics-III One Shot",
            "url": "https://youtu.be/_Hjp6aFJO40?si=L8tp3IgTfCBFhxEz",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "eoc",
      "key": "essentialoilandcosmetics",
      "name": "Essential Oil and Cosmetics",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "etobm",
      "key": "expressionextractiontechniqueofoilbearingmaterials",
      "name": "Expression & Extraction Technique of Oil Bearing Materials",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "foodBiotech",
      "key": "foodbiotechnology",
      "name": "Food Bio-Technology",
      "icon": "📐",
      "color": "bg-indigo-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pht",
      "key": "heattransfer",
      "name": "Heat Transfer Operations (HTO)",
      "icon": "⚗️",
      "color": "bg-purple-500",
      "branches": [
        "CHE",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "Boiling Condensation Evaporator Notes",
          "url": "https://drive.google.com/file/d/1NN3lUUUI4vUfI0S3KnEqjFPUzPfe-TqB/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Conduction Notes",
          "url": "https://drive.google.com/file/d/1nNHHP_VwytaZ8BRfhqHzZWaIc_zsv5Pq/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Convection Notes",
          "url": "https://drive.google.com/file/d/1ovZoU-PzRqq1ZJ6WMra270wTZUTukg6j/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Radiation Notes",
          "url": "https://drive.google.com/file/d/1PmROELGO0Zkcw_H_oZEa6v7_qVRxXhVE/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unsteady State Notes",
          "url": "https://drive.google.com/file/d/14VcXZmBdLY42veDvQWo2RgsicB529Pw0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "HTO Unit 1 Notes",
          "url": "https://drive.google.com/file/d/1mw-W5Feapn5FOGTJqL_BsUXT5-YXyx8D/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "HTO Radiation Notes",
          "url": "https://drive.google.com/file/d/16QiPSJKpy4g0NEMn3w9_ct2CNP_U9b8F/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "HTO Boiling,Condensation,Evaporation Notes",
          "url": "https://drive.google.com/file/d/1crFm8mUX0x5JK7-QSTCB8pFt9yiM4dJ-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "HTO Convection Notes",
          "url": "https://drive.google.com/file/d/1TUn0f5IbpNArApLyGeqJNUl_4lWVXZ92/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "itetiict",
      "key": "introtoemergingtechnologiesinict",
      "name": "Intro to Emerging Technologies in ICT",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "IoT Introduction PDF",
          "url": "https://drive.google.com/file/d/1_RxHI-c9kG75CDeqvMaq6ZF7kfpcASfr/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Cryptocurrency Notes",
          "url": "https://drive.google.com/file/d/1nXHy2Yc2Sj9Dbnk5sc8b40WRdR5FEYt-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "IoT Smart City PDF",
          "url": "https://drive.google.com/file/d/1_Ptg9E0I-o6t8yu_dx3tEEZ1SdF3mk7M/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OSI Model PDF",
          "url": "https://drive.google.com/file/d/1_UGWKcSl3PlJoPFnh7doApswuIxVDoxA/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Blockchain Notes",
          "url": "https://drive.google.com/file/d/1naxhYNRX8Jh3F761QKSXgz1GSPvEWQPI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Mid Sem 2 (Unit 3 & 4 Revision Notes)",
          "url": "https://drive.google.com/file/d/1o66wwin_5zxme7XQZtLxzrfDfRndVaIN/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Blockchain Reference Book",
          "url": "https://drive.google.com/file/d/1n31Nl9JGvvB9gu2IcYnHxA_f-_f81Abd/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Topic Smart Contract PDF",
          "url": "https://drive.google.com/file/d/1ncpHnKX8YdQb0S-qYPjZpy0raJSG6xCx/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "AWS, Azure & Cloud Difference - Most Important PDF",
          "url": "https://drive.google.com/file/d/1_5MPY5RNWggsfMMZ8OfNYwv25cTe5o1J/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Artificial Intelligence Notes",
          "url": "https://drive.google.com/file/d/1nQMQcUnAiWtmGsA7I8O5uhkGCJfVpumY/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "10 Use Cases of Blockchain PDF",
          "url": "https://drive.google.com/file/d/1nWBxdm1CXBihI_yI8BLan6lKeWkshEus/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 1 Short Notes",
          "url": "https://drive.google.com/file/d/1Yx6KtWPOFZo9r0Gkzz4wB63xGlzcRD7E/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 Short Notes",
          "url": "https://drive.google.com/file/d/1Z75dUAIGpD9BjO6XbTmrC5PLR3hbu4H6/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 3 Short Notes",
          "url": "https://drive.google.com/file/d/1Z7DnmJZGdh9FvJf-9uzGWb2X0wlAi2ep/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 5 Short Notes",
          "url": "https://drive.google.com/file/d/1ZIdEag2hUDiDcS0oMMD6_0AYzucWll0n/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": [
          {
            "title": "ICT Introduction Video 1",
            "url": "https://youtu.be/6ptZr9VRxPs?si=IRMWuVFfR4-Yj6rM",
            "recommended": false
          },
          {
            "title": "ICT Introduction Video 2",
            "url": "https://youtu.be/Pg_9kXV1lXg?si=Z-jfUI57nI_c8_2w",
            "recommended": false
          },
          {
            "title": "ICT Introduction Video 3",
            "url": "https://youtu.be/mbdl-Fh5ALg?si=1JQlwxU9UroBsgL8",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "itpto",
      "key": "introtoposttanningoperations",
      "name": "Intro to Post tanning Operations",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "BioNanoTech",
      "key": "introtobionanotechnology",
      "name": "Intro. to BioNanoTechnology",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "microBiologyLab",
      "key": "microbiologylab",
      "name": "Micro Biology - LAB",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "BT"
      ],
      "notes": [
        {
          "title": "Practical-1 Plastic Isolation Protocol",
          "url": "https://drive.google.com/file/d/1COdUh_FCQvzl0vGz6o3aotwVyahQrmUf/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Practical-2 Plant DNA Isolation Notebook ",
          "url": "https://drive.google.com/file/d/16BEdltIt7oGxCaZa_MGOZYMnxBLdb8u_/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Practical -3 ",
          "url": "https://drive.google.com/file/d/1hx8aRwoHS98AopfHulSW4Ml9U-qYqyje/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Practical -4 ",
          "url": "https://drive.google.com/file/d/1nvfAs5WsWEgUvpUoWh5x8ad5KDzsaIco/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mat",
      "key": "modernanalyticaltechniques",
      "name": "Modern Analytical Techniques (MAT)",
      "icon": "📊",
      "color": "bg-green-500",
      "branches": [
        "CHE",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [
        {
          "title": "Differential Scanning Calorimetry Notes",
          "url": "https://drive.google.com/file/d/1wCEqN3tIifwtS_fv5qQl9LVKHykbuLD_/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Chromatography Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1iz4Cca_KWzuH7zRhpIBFfUAQ_6nF8NQC/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Chromatography Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1MRRbdlVurU5vDqABQSvfT1Q-G6oSH1lS/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Thermogravimetric Analysis(TGA) Notes",
          "url": "https://drive.google.com/file/d/10KgYmaFJ7Z1zX6DQn41RFoW-OQu5SO9d/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Working of TGA Notes",
          "url": "https://drive.google.com/file/d/1cVe0tAvH_VQt6oi7QBOe91Cut9eUclnj/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DTA-Differential Thermal Analysis Notes",
          "url": "https://drive.google.com/file/d/1pSFNT94ho5YjNAH1S2ZNA76hETTuBfsg/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Patentiometry & Conductometry Notes",
          "url": "https://drive.google.com/file/d/1mkXkhL6ua74tE8Ufo7uFxKPBha_ACFkb/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "X-ray Diffraction Notes",
          "url": "https://drive.google.com/file/d/1IWzSzhoYpm-SLShw-N3Xwz2E9OUSgahT/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Basic Principles of Polarography Notes",
          "url": "https://drive.google.com/file/d/162B6Zu6l491A2HyXgr5GY6s4XC0nV3hA/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "IR/Vibrational Spectroscopy Notes",
          "url": "https://drive.google.com/file/d/18-4JVJ80esN9sMfHbjCsSDt_OO3XtMmQ/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Mass Spectroscopy Notes",
          "url": "https://drive.google.com/file/d/1U0JBO8ZshIAiBcs_nJv0_kW04pWN-TwY/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Basic Components Of Geo Chromatography Notes",
          "url": "https://drive.google.com/file/d/1RRRN9lKSRx394X5b3f2MSK8_i7d7tnfG/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Liquid Chromatography Notes",
          "url": "https://drive.google.com/file/d/1YDHvaxeYZgwPtieALrq4oObI9QhYqlEv/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Chromatography -Intro Notes",
          "url": "https://drive.google.com/file/d/1gjHkLBLXrZgUsWT0MfDPRsgW4qB8EBNi/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Polarography pdf Notes",
          "url": "https://drive.google.com/file/d/1TusWFH_WUF1Hshs5ycVyw8RpdbLjFyHK/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Gas Chromatography Notes",
          "url": "https://drive.google.com/file/d/1jh0Re_Uw31d1MQoQqT5evVrFDKaLweu5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Nuclear Magnetic Resonance Spectroscopy Notes",
          "url": "https://drive.google.com/file/d/1yTltHqKtOBREqS26UGayWzTyxaZhsFHM/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "NMR Spectroscopy including CMR Notes",
          "url": "https://drive.google.com/file/d/1zS_Wi7Ml2eHotb7sLNBMO77L-fLuhAAN/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Polarography -DME/RPE Notes",
          "url": "https://drive.google.com/file/d/1-rAD72lQkObeS4K237E9UpzZJ2cugIWk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Scanning Electron Microscope Notes",
          "url": "https://drive.google.com/file/d/1hul-DR8eoWJEowV2jMqLDvqhasnz-ImU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "TEM Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1aq7Hc_i6RTgDP_acP8Cuf_8tAWC9v-wb/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "TEM Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1njbs465mU1L2QVLznoqMYAlsETi9uMXe/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "molecularBiology",
      "key": "molecularbiology",
      "name": "Molecular Biology",
      "icon": "📝",
      "color": "bg-yellow-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mto",
      "key": "mtoi",
      "name": "MTO -I",
      "icon": "🔬",
      "color": "bg-orange-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Unit-1 Class Notes",
          "url": "https://drive.google.com/file/d/1o_qt4Fxs49Sozjgme6oA60zTII-sgNc8/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Membranes & its Processes Fundamentals",
          "url": "https://drive.google.com/file/d/1JGXKFisxS4RgxZ0_5znlJQ8fpLgyTypr/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Membrane Separation -Inro.",
          "url": "https://drive.google.com/file/d/1QqR4h6Q9Co9RdtWNa9tSEOCLwar1fsfc/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "ocl",
      "key": "oilcharacterizationlab",
      "name": "Oil Characterization Lab",
      "icon": "🔌",
      "color": "bg-teal-500",
      "branches": [
        "OT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "os",
      "key": "operatingsystem",
      "name": "Operating System",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "OS Unit-2,3,4 & 5 Notes + Imp. Diagrams",
          "url": "https://drive.google.com/file/d/1eAmO8ZWoSUJpoD2DratHpmdtX79XYFil/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Signal Handling Notes",
          "url": "https://drive.google.com/file/d/1dP129HBR-TeLyeeVaM6IdtjHFlx8uJzo/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Signal Notes (Part-1)",
          "url": "https://drive.google.com/file/d/1dWOYpI3__S2wgcXOxwdiLRWNs-NE6TMU/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Signal Notes (Part-2)",
          "url": "https://drive.google.com/file/d/1dXKXaUcIar-x_zSu1WgIvXXRI9RlTDRD/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Thread Notes",
          "url": "https://drive.google.com/file/d/1dVcpDFeOc3MOn7qtuX38fiJM0xB7lDJz/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Unit-1,2 & 3 Handwritten Notes",
          "url": "https://drive.google.com/file/d/1eDNTvHrbaoVGjK1o2hpUpOtZblRUG09L/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Wiley Book (Very Imp.)",
          "url": "https://drive.google.com/file/d/1dbo8X8UuubqEyE7fNwGGfV8isF9n57zg/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS Wiley Book (Practice Ques.)",
          "url": "https://drive.google.com/file/d/1dlHVXg5DniDFYabpuetm0AVZx2LV54PM/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "OS William Stalling Book",
          "url": "https://drive.google.com/file/d/1WcCEPMIbYxYzJRSRF_Gc3jhspUNUV5Vl/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Operating System Complete (Best)",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p&si=Q37KNf4AAP4Qk8oq",
            "recommended": false
          },
          {
            "title": "Operating System Advanced",
            "url": "https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O&si=qbZZeUys9gnBM8_7",
            "recommended": false
          },
          {
            "title": "Operating System Comprehensive",
            "url": "https://youtube.com/playlist?list=PLG9aCp4uE-s17rFjWM8KchGlffXgOzzVP&si=23zhPsNlTjwU4OGV",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Operating System One Shot (Best)",
            "url": "https://youtu.be/xw_OuOhjauw?si=MzjKrv7cY2vswkg5",
            "recommended": false
          },
          {
            "title": "Operating System One Shot 2",
            "url": "https://youtu.be/009FHqBo87Q?si=1SzNKk9iZR8TAZms",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "lab",
      "key": "pigmentsandextenderslab",
      "name": "Pigments and Extenders Lab",
      "icon": "🥼",
      "color": "bg-emerald-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pplab",
      "key": "polymerizationengglab",
      "name": "Polymerization engg. Lab",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pe2",
      "key": "polymerizationengineeringii",
      "name": "Polymerization engineering-II",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ppl",
      "key": "principlesofprogramminglanguage",
      "name": "Principles of Programming Language",
      "icon": "💻",
      "color": "bg-indigo-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "PPL Book PDF",
          "url": "https://drive.google.com/file/d/1ddHsyjqoYPErKWD2vjELX0wC0L3Y9sba/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PPL Unit-5 Notes",
          "url": "https://drive.google.com/file/d/1cmcJTPaiVHDb10m8kmAxdqUGfFuTSSkq/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PPL Storage Management Notes",
          "url": "https://drive.google.com/file/d/1d9Vq_fXAFqEDSBn_1--rTLOL-v011_Ni/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PPL Unit-1 to 4 Handwritten Notes",
          "url": "https://drive.google.com/file/d/1cdvnZ1DFnc5jHvJKvsngM1ys9xwKqvSi/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PPL Unit-4 & 5 GPT Notes",
          "url": "https://drive.google.com/file/d/1cg7TZ1CaIudGt4zT7e9wpPcc7h3ILyMU/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-5 Notes PDF",
          "url": "https://drive.google.com/file/d/1crfywzKWvg5vY6hGLawZ6XkZfJZLHDHy/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PPL Sub-program Notes",
          "url": "https://drive.google.com/file/d/1C5KMC-EHWNvc4LHOrGQoRYoB8DiH5vWw/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Exception Handling Notes",
          "url": "https://drive.google.com/file/d/1d5gfmpTLefmvlb1ZOx9ftwVO7VLL89cr/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part 1) Notes",
          "url": "https://drive.google.com/file/d/1dXwzaV3nuTNkHiXvTMs7WqAxuYxY-591/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part 2) Notes",
          "url": "https://drive.google.com/file/d/1dY_dh8D_Nrx62JsGb_UmQ6t8XOc7szQc/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part 3) Notes",
          "url": "https://drive.google.com/file/d/1dbfV9QCs0eocXoWlRsMHaJRGjCNsERxz/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 (Part 1) Notes",
          "url": "https://drive.google.com/file/d/1dcLD7ZvrgQWqmspqtBsiMdQ2kcjPBuNH/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 (Part 2) Notes",
          "url": "https://drive.google.com/file/d/1Bof5brMwKyqX7pLh2H-7JREw8mCHb-I1/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit 2 (Part 3) Notes",
          "url": "https://drive.google.com/file/d/1BxiydjcOonC6LN6IVSaBkWo4G8sAlUR1/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part 4) & Unit-3 (Part 1) Notes",
          "url": "https://drive.google.com/file/d/1BzzpT_s5n3YhXFSPCAi-P7ykE5TQhG9V/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part 2) Notes",
          "url": "https://drive.google.com/file/d/1C4yFY25rkAdLYoZ65TpEo1ogtMu969hs/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-4 Stage of Translation Notes",
          "url": "https://drive.google.com/file/d/1dHkajpGfI75LcTsnAl2SN6KgWZKtlmBY/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Principal of Programming Language 1",
            "url": "https://youtube.com/playlist?list=PL-JvKqQx2AtdIkEFDrqsHyKWzb5PWniI1&si=UAZUusqLpaAJZDPk",
            "recommended": false
          },
          {
            "title": "Principal of Programming Language 2",
            "url": "https://youtube.com/playlist?list=PLbWkMgLvWbDF3bErg6Ejo8d1QtTSqtWwN&si=1Z2lbiTm8JClSOEa",
            "recommended": false
          },
          {
            "title": "Principal of Programming Language 3",
            "url": "https://youtube.com/playlist?list=PLwheXbz_XBtltsxCn00Hkdc2Dqa9t6wNd&si=WQ5lH-A5EQB1sW_Z",
            "recommended": false
          },
          {
            "title": "Principal of Programming Language 4",
            "url": "https://youtube.com/playlist?list=PLTo1TmBz2ekof8VsYaoTxP-9VgJ9P-dTO&si=55vMVnCXKNwTVDnp",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "pop1",
      "key": "processofpolymersi",
      "name": "Process of Polymers-I",
      "icon": "🖥️",
      "color": "bg-green-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "python",
      "key": "python",
      "name": "Python Programming",
      "icon": "🐍",
      "color": "bg-orange-500",
      "branches": [
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "PP Notes",
          "url": "https://drive.google.com/file/d/14MsO70g821_IZrtXEp8bezOKnte8Enak/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PP Lab File",
          "url": "https://drive.google.com/file/d/1-Vb1JsaRf3VnonTH80EtYzg2W53n5HV5/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "PP Best Quantum Notes",
          "url": "https://drive.google.com/file/d/1ovVLnKwYM1vsYSeAk0UNEqcF-lU7otVH/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Important PP Programs for ESE",
          "url": "https://drive.google.com/file/d/13viyP84UNb_1UfGWPUnqOapXUSq2jcMz/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Python Full Handwritten Notes",
          "url": "https://drive.google.com/file/d/1_VF2ORzst49Yu5BtYdhSkTbw16Wge2rE/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Python Programming Complete",
            "url": "https://youtube.com/playlist?list=PLvu-LC7buiaVdESLhxGj0BDQMjSLIEiSL&si=_GpcglKz_pZ78pt_",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Python Programming One Shot",
            "url": "https://youtube.com/playlist?list=PL49mRA0Y_C8vu2RWHdPsuRNRAcd89-eaz&si=dTvCvGhRbf7esBPJ",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "S&S",
      "key": "signalssystems",
      "name": "Signals & Systems",
      "icon": "💼",
      "color": "bg-red-600",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "se",
      "key": "softwareengineering",
      "name": "Software Engineering",
      "icon": "⚙️",
      "color": "bg-orange-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Sample Front Page for SE Lab File",
          "url": "https://drive.google.com/file/d/1f4w_qy8Xw3_wPRY01kz2vj7gzlGfFBvk/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Railway Reservation System SRS Document (SE Lab)",
          "url": "https://drive.google.com/file/d/1f3B8LyiCYj9tw3GwDwlhm59_YfBfZvsc/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Software Design Notes + Imp. Diagrams",
          "url": "https://drive.google.com/file/d/1f-jTrT_1YOFYl9Yfk-8NiLlqIA1E6evA/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "SE Notes for ESE",
          "url": "https://drive.google.com/file/d/1cdWjUs4QQcFIsezWgbUvkhbwhHbZY4_y/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "COCOMO Model Notes",
          "url": "https://drive.google.com/file/d/1eoRxxiE651xOVu7fdhUIbQ7Gjn7Rtd7Z/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "SE Unit-1 Notes",
          "url": "https://drive.google.com/file/d/1cMLUTDTZ9ewZ4imUCAbhW4fp-smNhuQ-/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Complete Unit 1 to 5 Notes",
          "url": "https://drive.google.com/file/d/1cc4ZbPh7dRnPIkRI3ztv5awCGak5yQtv/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "SE Unit-2 Quantum Notes",
          "url": "https://drive.google.com/file/d/1cLsEXQnu9TDKGBnO_t8Zwj0WuM_Sxel8/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-3 Quantum Notes",
          "url": "https://drive.google.com/file/d/1cLUwBU7Ptmgmrk4MWVLbVE2i5pJz7ave/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-4 Quantum Notes",
          "url": "https://drive.google.com/file/d/1cN1jyX8BnMrmAh-TH3ic5EWA8covDQpc/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-5 Quantum Notes",
          "url": "https://drive.google.com/file/d/1cOnVxh_6oshKly7E1P2DLe4kCnwsjT6p/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "SE Unit-1 to 4 Handwritten Notes",
          "url": "https://drive.google.com/file/d/1cJA-CYdIg3CR42yYeyYAvqLM94egetb1/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2.1 SRS Requirement PDF Notes",
          "url": "https://drive.google.com/file/d/1eMI451NUOyvAbJ0WKowu0JD25fl7rqPa/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2.2 Estimation Notes",
          "url": "https://drive.google.com/file/d/1efnISXG6ZEmjJhg5sCIEBehapPQ6KUq5/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-3 Software Design PDF Notes",
          "url": "https://drive.google.com/file/d/1eSi6xDL3HRcyKpQZ7iL_bfThtv7uoLVD/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-4 Software Testing Notes",
          "url": "https://drive.google.com/file/d/1eIfEhGq_A7Z7GeUZaE4_hcZTUSqunOuc/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-5 Software Maintenance Notes",
          "url": "https://drive.google.com/file/d/1eDhut9YkysRfZjqjgmqyLzShg8LmxcUb/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Laws of Software Maintenance Notes",
          "url": "https://drive.google.com/file/d/1euUA6RHIAMUW_Z2yEuVzoVB6B6GyhHv3/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Software Engineering Complete (Best)",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2&si=V_wg1F_QDMAzhqbJ",
            "recommended": false
          },
          {
            "title": "Software Engineering Advanced",
            "url": "https://youtube.com/playlist?list=PLvu-LC7buiaXLZ6P6ePiAhAI1uTWfyVXZ&si=68I7AzesTJAQhrGc",
            "recommended": false
          },
          {
            "title": "Software Engineering Comprehensive",
            "url": "https://youtube.com/playlist?list=PLqcuf9-ILPYA-OGMephZ0U9c8JvdefE0X&si=o6yJSSIx9o4kvaKL",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Software Engineering One Shot",
            "url": "https://youtu.be/NlLM3sVF8wY?si=z9MHr4P7KoiPxX5-",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "sm",
      "key": "strengthofmaterials",
      "name": "Strength of Materials",
      "icon": "🏗️",
      "color": "bg-blue-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "SOM Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "survey",
      "key": "surveying",
      "name": "Surveying",
      "icon": "📏",
      "color": "bg-green-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Surveying Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pigments",
      "key": "technologyofinorganicpigmentsandextenders",
      "name": "Technology of Inorganic Pigments and Extenders",
      "icon": "🎨",
      "color": "bg-teal-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "resins",
      "key": "technologyofnaturalresinsalkydsandpolyesters",
      "name": "Technology of Natural Resins, Alkyds and Polyesters",
      "icon": "🪵",
      "color": "bg-amber-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "wt",
      "key": "webtechnology",
      "name": "Web Technology",
      "icon": "🌐",
      "color": "bg-teal-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Complete Unit-1 to 5 Quantum Notes",
          "url": "https://drive.google.com/file/d/1dPJxkCx-uuN2tvHMFrp3gURZjF-mlLTH/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "WT Handwritten Notes",
          "url": "https://drive.google.com/file/d/1WjOaDpW8qhOpBIZRS8s7eY5RoaviloO3/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "WT Imp. Question Bank",
          "url": "https://drive.google.com/file/d/1Wdup17mKYlv5J4t5NLaCQrTiYH_SU7-S/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "WT Unit-3,4 & 5 GPT Notes",
          "url": "https://drive.google.com/file/d/1W_pBYiKIBI4C6TowcYnWdtx6wuaPpWsI/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-1 OneShot Notes",
          "url": "https://drive.google.com/file/d/1WmdI24FpQYcpfXHuv2wkozCkQP8GTp-p/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-2 OneShot Notes",
          "url": "https://drive.google.com/file/d/1Wp-Z1W5_XhK9AV4V26wvugWNqTFN3nZO/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-3 OneShot Notes",
          "url": "https://drive.google.com/file/d/1Wwi2cc_4Ro6XYGEwFabqJlANB-I-l3Su/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-4 OneShot Notes",
          "url": "https://drive.google.com/file/d/1WzZc5csum5vJdXJY1eFfxVk3nmhZyF06/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "Unit-5 OneShot Notes",
          "url": "https://drive.google.com/file/d/1X6xWaulVOBcpySBmd3fvDf8uUWKMB2JF/view?usp=drive_link",
          "recommended": false
        },
        {
          "title": "WT Full YouTube SS Notes",
          "url": "https://drive.google.com/file/d/1WfwsbrbRDXSfyb6nPaPqoxw_h01wHFGf/view?usp=drive_link",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Web Technology Complete",
            "url": "https://youtube.com/playlist?list=PLrjkTql3jnm8d1ddpVKifXO_fPjSKATCp&si=mK0fsnBGAZaW8hYN",
            "recommended": false
          },
          {
            "title": "Web Technology Advanced",
            "url": "https://youtube.com/playlist?list=PL49mRA0Y_C8u2dOqXa-f9KSoSx9XICZ1E&si=lv0RPacby30ubHRf",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Web Technology One Shot",
            "url": "https://youtube.com/playlist?list=PLR5USSocuZ5eMnOLgS57Uuemx6bGV2lan&si=dazqDSAIkgHk0XPm",
            "recommended": false
          }
        ]
      }
    }
  ],
  "5": [
    {
      "id": "oil",
      "key": "advancedoiltechnology",
      "name": "Advanced Oil Technology",
      "icon": "🛢️",
      "color": "bg-yellow-600",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "Oil Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ac",
      "key": "analogcommunication",
      "name": "Analog communication",
      "icon": "📡",
      "color": "bg-blue-500",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "AWP",
      "key": "antennawavepropogation",
      "name": "Antenna & Wave Propogation",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bioinstrumentation",
      "key": "bioinstrumentation",
      "name": "Bio-Instrumentation",
      "icon": "🔬",
      "color": "bg-teal-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "biomass",
      "key": "biomassenergy",
      "name": "Biomass Energy",
      "icon": "🌱",
      "color": "bg-green-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "biomechanics",
      "key": "biomechanics",
      "name": "Biomechanics",
      "icon": "🦴",
      "color": "bg-red-500",
      "branches": [
        "BE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bioprocess",
      "key": "bioprocess",
      "name": "Bioprocess Engineering",
      "icon": "🧪",
      "color": "bg-blue-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cre",
      "key": "chemicalreactionengineering",
      "name": "Chemical Reaction Engineering",
      "icon": "🔥",
      "color": "bg-orange-500",
      "branches": [
        "PL",
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cn",
      "key": "computernetwork",
      "name": "Computer Network",
      "icon": "🌐",
      "color": "bg-orange-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "CN -Forouzan Book",
          "url": "https://drive.google.com/uc?export=download&id=1kLMlKMA0AZ1saBEmQzYJv-8OZjYp04G0",
          "recommended": false
        },
        {
          "title": "CN -Tanenbaum Book",
          "url": "https://drive.google.com/uc?export=download&id=17Lzpfbjp_TUzirEfqEwBujBRpwGlM_1x",
          "recommended": false
        },
        {
          "title": "CN -Quantum Book",
          "url": "https://drive.google.com/uc?export=download&id=135ML5uks26wJiAKR9oOQ4kOK8CO6aBAC",
          "recommended": false
        },
        {
          "title": "FULL Unit-1 & 2 Handwritten Notes",
          "url": "https://drive.google.com/uc?export=download&id=1FdlyWmdpcePy9ON19EckOpM32MATHk1W",
          "recommended": false
        },
        {
          "title": "CN Complete Notes (best)",
          "url": "https://drive.google.com/file/d/1L3WfHCH893Xr6LGOeS8uXPhFloVP6xMB/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CN Practical File- Priyal",
          "url": "https://drive.google.com/file/d/1YpEVjHMbPVa8nIXD1yhSHPAwV5FmAcWe/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-1 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1dOdNZ3FfsRM9cOKbyvqwQVpk3oHe51YP/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-2 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/14S8oSaSzeiMdBjGhB5wlGN3deyF7vgUK/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-3 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1T7WtlX_uqy8CsgtrPPoRzojV1lr9yqz5/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-4 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/19thdrTwUKTbagPX5Yi1AsmYDv938YA76/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-5 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1fweOgN6kQI6_HEdAW5ZFsJg7HsTmolJy/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-6 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1gmFl-4xoUvz6BreneM23zm8_z5OobqRs/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-7 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1H_JHkidn2TrEQxjhs5_yZ1QSIIOa1X5Y/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-8 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1zceqjuMFJvh-uOFZ6jvCv551PKrtKvnO/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-9 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1xJH2ZX60D0eK2fIB-SYRkiJdQWG-cP-D/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-10 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1t1O0BDJJZpLdoQ4otTGrsjIZxUFXRvId/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-11 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1AARuEcWjx88472RzeGIF-wxRf7h1k5_7/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-12 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1HbZSaeNJPu9lUG7tLVOQ_4AbXitT8fEv/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-13 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1RysuSt_NhF-LZY2iTD_hpgR50PxMUsmY/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-14 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1PxTAIazka1oX5MjSeyS-19TaB3iRnJPN/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-15 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1eDAAiFwrH7iy4GN5jrPrLmFJruXlNFZk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-16 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1geAtQLRbHf9wlRkFnB5IOuKztr8x0A0J/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-19 (*17th & 18th pdf is not in syllabus)",
          "url": "https://drive.google.com/file/d/14fESRsqsXSMgJb1z07KO3ehB0_jqr7qx/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-20 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1_dMYKuNyPfQZ4BYS5Xr_Uxl9wzO0any6/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-21 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/163aOxOTx67ViY9p9ruFPoI4MPTGBCC64/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-22 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/18GqmVKynljQJT_yuMWzjIRp2pYpPmdBz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-23 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1qSPvU_lDg896jhxgez9ZEVcj7O1MdL3C/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-24 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1s8TEx5g0CMWbcUz4pbQywa2dweBTwYo-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-25 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1B45I-setY6TKy4KASaOzQvenmcV1qB25/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-26 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1B8954jXkFSoJ5FhZcvZpIZbfD4p52eiU/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-27 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1D_ggHdoGfLTuBB8uBEEZCF0QZKixCTXw/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-28 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1xD7cmGzPr0dfOqB71xKv4nyswFVIMl8h/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-29 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1N-c6cThH9Kd_AO8yrseeIfzyIyeNQ5ga/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-30 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/1Ervot1e8P9uaroZqn-CQ8myzThDWYiZr/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-31 (Prof. Lecture PDF)",
          "url": "https://drive.google.com/file/d/12heVyuBQXsmHMd-lA9P7rc4wLJyUHiz_/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CH-32 (Last Prof. Lec. PDF)",
          "url": "https://drive.google.com/file/d/1LxbWvmZfbuiLaT9f3W5WMPzUBqYxw_-e/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "CN Oneshot Playlist -Multi Atoms",
            "url": "https://youtube.com/playlist?list=PLh11ucJN276IL28KPahyHA5orDh4dYaJt&si=Pw-g5ySBMgOZxkEk",
            "recommended": false
          },
          {
            "title": "CN Playlist -Neso Academy",
            "url": "https://youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx&si=hFzQqIYH4m4bNQD0",
            "recommended": false
          },
          {
            "title": "CN Playlist -Gate Smashers",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_&si=lLZUzL2F1Us0kbL4",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "CN Oneshot -Knowledge Gate",
            "url": "https://youtu.be/q3Z3Qa1UNBA?si=aAM7JKTpm_hPjTW6",
            "recommended": false
          },
          {
            "title": "CN Oneshot -5 Min. Engg.",
            "url": "https://youtu.be/1V9mhVgVH3A?si=KvEkmDtyEnhJGFMS",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "concrete-technology",
      "key": "concretetechnology",
      "name": "Concrete Technology",
      "icon": "🧱",
      "color": "bg-gray-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Concrete Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "control-systems",
      "key": "controlsystems",
      "name": "Control Systems",
      "icon": "🎛️",
      "color": "bg-blue-500",
      "branches": [
        "EE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "daa",
      "key": "daa",
      "name": "DAA",
      "icon": "⚙️",
      "color": "bg-red-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "DAA Unit-1 Notes",
          "url": "https://drive.google.com/file/d/14Trs7Ge_xdaGCLUA6Lh1cpLD-EHWUEbT/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAA Unit-2 Notes",
          "url": "https://drive.google.com/file/d/18rKTgtSxtn7p6RTWzDka8CSiLF-6Pow2/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAA Unit-3 Notes",
          "url": "https://drive.google.com/file/d/1VNo796SOhr3PUejZW0kdqubUmyxapH30/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAA Unit-4 Notes",
          "url": "https://drive.google.com/file/d/1Dd_61x5YnAj2EWD_auhXFmXv2OLSBgy8/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAA Unit-5 Notes",
          "url": "https://drive.google.com/file/d/1PrMeHxGMgrQhWc4asCs00UJ3XSNw3sdk/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAA All Unit Notes",
          "url": "https://drive.google.com/file/d/1AtK4hZ9wHSZ-pSlN8fd36zmZp7o-u60q/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Complete DAA Notes-5 Min.Engg. (best)",
          "url": "https://drive.google.com/uc?export=download&id=1D9ElRUV9QF6Ri3x5aRxyEeeQ3VUfdNYv",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "DAA Playlist -Gate Hub",
            "url": "https://youtube.com/playlist?list=PL1QH9gyQXfgs7foRxIbIH8wmJyDh5QzAm&si=vo60TQy-DFTAaQ7Z",
            "recommended": false
          },
          {
            "title": "Unitwise Oneshot Playlist -Multi Atoms",
            "url": "https://youtube.com/playlist?list=PL49mRA0Y_C8tP7SvFD3zS8zxRYfKWg_yf&si=uoCCPq2VIigQ5cNj",
            "recommended": false
          },
          {
            "title": "DAA Playlist -University Academy",
            "url": "https://youtube.com/playlist?list=PL-JvKqQx2Atd--1Gs3WB8nmWOWRbEM7WW&si=Cs-dTfF4-xdHYysV",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "DAA One Shot -Knowledge Gate",
            "url": "https://youtu.be/z6DY_YSdyww?si=_vhMIt9WJPoAkhKV",
            "recommended": false
          },
          {
            "title": "DAA One Shot -5 Min. Engg.",
            "url": "https://youtu.be/h1mAUcDXCG0?si=Kvqf4Vmk6hwOnb4x",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "ds",
      "key": "datascience",
      "name": "Data Science",
      "icon": "📊",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "FULL Unit-1 Notes",
          "url": "https://drive.google.com/uc?export=download&id=1tevE9l-E44Jd3l2lL9YlDY1qrXfEBhDA",
          "recommended": false
        },
        {
          "title": "Statistics Notes",
          "url": "https://drive.google.com/file/d/1NV6lQsVOTc2c4OpMt6VykRZvMvtYe8DT/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Part-1 Notes",
          "url": "https://drive.google.com/uc?export=download&id=1LXSfbvhVZbJDUI6eivtySq7b98bKWZac",
          "recommended": false
        },
        {
          "title": "Full DS Notes from Data Modeling Onwards",
          "url": "https://drive.google.com/file/d/1MavBmoF6Ayn2OX6-JEtjXSj-8B0lQa7V/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DS -last Min. Revision Notes",
          "url": "https://drive.google.com/file/d/1Wm4dpAN2nI39nNSIK-7jx3H8htZaqssM/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DS -Complete Notes",
          "url": "https://drive.google.com/file/d/1ZiIw217rbI2IKt6HO_3WePIQ5caos3Od/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DS Complete Notes & Q&A",
          "url": "https://youngresearcher.in/ds_qa/",
          "recommended": false
        },
        {
          "title": "Numpy Cheat Sheet",
          "url": "https://drive.google.com/file/d/1lN2L0jdfTdFLuOCcaxDtja3JLly0t1rm/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Pandas Cheat Sheet",
          "url": "https://drive.google.com/file/d/1_hLM3xGLJ4VHFrMVjtPw2kjHZsX0zOk0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DS Practical File- Priyal(CSE)",
          "url": "https://drive.google.com/file/d/19RsKe9Aw3FT1_m35r9kOhqSKsA5tF1jg/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DS -Practical Exam PYQs(2025-26)",
          "url": "https://drive.google.com/file/d/1V7Un3Ye1MEQvx_LEY-3QHvYKJyUEUfuZ/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Data Science (Statistics)",
            "url": "https://youtu.be/1Cg9-KUqoUI?si=FyDOyUrgQEP-mUxE",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Data Science One Shot",
            "url": "https://youtu.be/1Cg9-KUqoUI?si=FyDOyUrgQEP-mUxE",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "dbms",
      "key": "dbms",
      "name": "DBMS",
      "icon": "🗄️",
      "color": "bg-blue-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Unit-1 Part-1 Navathe",
          "url": "https://drive.google.com/uc?export=download&id=1Njok356K8ftqy6IfELlH2LoYh4ncX0Kx",
          "recommended": false
        },
        {
          "title": "Unit-1 Part-2 Navathe",
          "url": "https://drive.google.com/uc?export=download&id=1il-V1xgTxz0cRdiVzhYqdpE4hrWIA_Kw",
          "recommended": false
        },
        {
          "title": "Unit-2 Part-3 Navathe",
          "url": "https://drive.google.com/uc?export=download&id=1xK0r9BkxR3BtA0iM9zJdcM5UNe7duy8S",
          "recommended": false
        },
        {
          "title": "Unit-1 Part-4 Navathe",
          "url": "https://drive.google.com/uc?export=download&id=1_PyxPpuWG1F7NJYxjaW2wFqjmuseUjsT",
          "recommended": false
        },
        {
          "title": "DBMS-Quantum Book",
          "url": "https://drive.google.com/uc?export=download&id=1DNKGyHci5Du4yjaL2Mf3EYHSADPz13la",
          "recommended": false
        },
        {
          "title": "DBMS Complete Notes - KnowledgeGATE",
          "url": "https://drive.google.com/uc?export=download&id=1oubD7Ov62JD1SOwhx-XsWqqK3TbOHAbn",
          "recommended": false
        },
        {
          "title": "DBMS Complete Notes-MultiAtoms",
          "url": "https://drive.google.com/uc?export=download&id=1O399cHUYpgAFswLIIzZjJuZ_Se98_oby",
          "recommended": false
        },
        {
          "title": "DBMS Complete Notes-5 min. Engg.",
          "url": "https://drive.google.com/uc?export=download&id=15lUt9NLdShn6fTg4QaRiGRyUWJJ3K4Z5",
          "recommended": false
        },
        {
          "title": "DBMS Book-Henry Korth",
          "url": "https://drive.google.com/uc?export=download&id=1GMdDx-BuR3pcnla16xVJ4mOx4JMrxlTd",
          "recommended": false
        },
        {
          "title": "DBMS Practical File- Priyal Kumar",
          "url": "https://drive.google.com/file/d/1FhsohpFS5j91ykfH350X90VezA2u9_ZT/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "DBMS -Neso Academy",
            "url": "https://youtube.com/playlist?list=PLBlnK6fEyqRiyryTrbKHX1Sh9luYI0dhX&si=LX8H6EbBHJjR3iH-",
            "recommended": false
          },
          {
            "title": "DBMS Unitwise Oneshot Playlist -Multi Atoms",
            "url": "https://youtube.com/playlist?list=PL49mRA0Y_C8sApWY0hYEaO-GldGwPE6Yo&si=OYP3sxnYZh53izrw",
            "recommended": false
          },
          {
            "title": "DBMS -Gate Smashers",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y&si=729UvQmL-7UcJw0x",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Unit 1 Oneshot",
            "url": "https://youtu.be/ptlIJiIByMc?si=WI-U-oZcuwaqnK_I",
            "recommended": false
          },
          {
            "title": "Unit 2 Oneshot",
            "url": "https://youtu.be/jRReZoQi1hw?si=amSvqZu4LJ_mrU6S",
            "recommended": false
          },
          {
            "title": "Unit 3 Oneshot",
            "url": "https://youtu.be/VAd8Audkxro?si=Q7AAnCx5Suu2ctiv",
            "recommended": false
          },
          {
            "title": "Unit 4 Oneshot",
            "url": "https://youtu.be/0Skq_YqrHjg?si=Ox5vgpaxUKE5MOmS",
            "recommended": false
          },
          {
            "title": "Unit 5 Oneshot",
            "url": "https://youtu.be/oR6IXFrJBEk?si=7DzaF2QkfEhv12yL",
            "recommended": false
          },
          {
            "title": "DBMS One Shot -5 Min. Engg.",
            "url": "https://youtu.be/jzuzxEFoiss?si=keewHhai6mXkNmOg",
            "recommended": false
          },
          {
            "title": "DBMS One Shot -Knowledge Gate",
            "url": "https://youtu.be/YRnjGeQbsHQ?si=mgvvNkChOHukHobq",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "emd",
      "key": "electricalmachinedesign",
      "name": "Electrical Machine design (EMD)",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "EE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "math4",
      "key": "math4",
      "name": "Engineering Mathematics-IV",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "CE",
        "FT",
        "ME"
      ],
      "notes": [
        {
          "title": "EM-IV Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "entrepreneurship",
      "key": "entrepreneurship",
      "name": "Entrepreneurship",
      "icon": "💼",
      "color": "bg-yellow-500",
      "branches": [
        "PL",
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "environmental-engineering",
      "key": "environmentalengineering",
      "name": "Environmental Engineering",
      "icon": "🌿",
      "color": "bg-green-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Environmental Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "environmental-management",
      "key": "environmentalmanagement",
      "name": "Environmental Management",
      "icon": "🌿",
      "color": "bg-teal-500",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "enzyme",
      "key": "enzymetechnology",
      "name": "Enzyme Technology",
      "icon": "⚙️",
      "color": "bg-orange-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "food-engineering",
      "key": "foodengineering",
      "name": "Food Engineering",
      "icon": "⚙️",
      "color": "bg-blue-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Food Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "food-microbiology",
      "key": "foodmicrobiology",
      "name": "Food Microbiology",
      "icon": "🦠",
      "color": "bg-green-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Food Microbiology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "food-processing",
      "key": "foodprocessingtechnologyii",
      "name": "Food Processing Technology-II",
      "icon": "🏭",
      "color": "bg-orange-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Food Processing Tech-II Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "food-quality",
      "key": "foodqualitycontrolsafety",
      "name": "Food Quality Control & Safety",
      "icon": "✅",
      "color": "bg-teal-500",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Food Quality Control Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "foundation-engineering",
      "key": "foundationengineering",
      "name": "Foundation Engineering",
      "icon": "⛏️",
      "color": "bg-yellow-600",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Foundation Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "genetics",
      "key": "geneticengineering",
      "name": "Genetic Engineering",
      "icon": "🧬",
      "color": "bg-purple-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "heat-transfer",
      "key": "heattransfer",
      "name": "Heat Transfer",
      "icon": "🔥",
      "color": "bg-orange-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Heat Transfer Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "hospital-engineering",
      "key": "hospitalengineering",
      "name": "Hospital Engineering",
      "icon": "🏥",
      "color": "bg-green-500",
      "branches": [
        "BE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "iem",
      "key": "industrialengineeringmanagement",
      "name": "Industrial Engineering & Management",
      "icon": "🏭",
      "color": "bg-teal-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "IEM Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "leather-finishing",
      "key": "leatherfinishing",
      "name": "Leather Finishing",
      "icon": "👞",
      "color": "bg-amber-700",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "leather-goods",
      "key": "leathergoods",
      "name": "Leather Goods",
      "icon": "👜",
      "color": "bg-brown-600",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "control-systems",
      "key": "linearsystemtheory",
      "name": "Linear System Theory (Control System)",
      "icon": "🎛️",
      "color": "bg-green-500",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "machine-design",
      "key": "machinedesign",
      "name": "Machine Design",
      "icon": "⚙️",
      "color": "bg-blue-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Machine Design Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mto",
      "key": "masstransferoperation",
      "name": "Mass Transfer Operation",
      "icon": "🌊",
      "color": "bg-teal-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mto",
      "key": "masstransferoperations",
      "name": "Mass Transfer Operations",
      "icon": "🌊",
      "color": "bg-teal-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "medical-imaging",
      "key": "medicalimaging",
      "name": "Medical Imaging",
      "icon": "🩻",
      "color": "bg-blue-500",
      "branches": [
        "BE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mp",
      "key": "microprocessors",
      "name": "Micro-Processors",
      "icon": "🔌",
      "color": "bg-green-500",
      "branches": [
        "EE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "microprocessor",
      "key": "microprocessormicrocontrollers",
      "name": "Microprocessor & Microcontrollers",
      "icon": "🖥️",
      "color": "bg-indigo-500",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "openElective",
      "key": "openelective",
      "name": "Open Elective",
      "icon": "📚",
      "color": "bg-gradient-to-br from-purple-500 to-pink-500",
      "branches": [
        "BT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pmdd",
      "key": "plasticmoulddesignanddies",
      "name": "Plastic Mould Design and Dies",
      "icon": "📐",
      "color": "bg-purple-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "prt",
      "key": "polymerrheologyandtesting",
      "name": "Polymer Rheology and Testing",
      "icon": "🧪",
      "color": "bg-indigo-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ptlab",
      "key": "polymertestinglab",
      "name": "Polymer Testing Lab",
      "icon": "🥼",
      "color": "bg-emerald-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "power-systems",
      "key": "powersystemsi",
      "name": "Power Systems-I",
      "icon": "⚡",
      "color": "bg-yellow-500",
      "branches": [
        "EE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pp2",
      "key": "processingofpolymersii",
      "name": "Processing of Polymers -II",
      "icon": "⚙️",
      "color": "bg-blue-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "quality-control",
      "key": "qualitycontrol",
      "name": "Quality Control",
      "icon": "✅",
      "color": "bg-green-600",
      "branches": [
        "LFT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "rehabilitation-engineering",
      "key": "rehabilitationengineering",
      "name": "Rehabilitation Engineering",
      "icon": "♿",
      "color": "bg-purple-500",
      "branches": [
        "BE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "structural-analysis",
      "key": "structuralanalysisii",
      "name": "Structural Analysis-II",
      "icon": "🏗️",
      "color": "bg-blue-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Structural Analysis-II Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "che5-subject-1",
      "key": "subject1",
      "name": "Subject 1",
      "icon": "🧪",
      "color": "bg-green-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Notes Coming Soon",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "che5-subject-2",
      "key": "subject2",
      "name": "Subject 2",
      "icon": "⚗️",
      "color": "bg-blue-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Notes Coming Soon",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "che5-subject-3",
      "key": "subject3",
      "name": "Subject 3",
      "icon": "🔬",
      "color": "bg-purple-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Notes Coming Soon",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "che5-subject-4",
      "key": "subject4",
      "name": "Subject 4",
      "icon": "📊",
      "color": "bg-orange-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Notes Coming Soon",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Playlist Coming Soon",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "xyz",
      "key": "subjectxyz",
      "name": "Subject XYZ",
      "icon": "📘",
      "color": "bg-blue-500",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "XYZ Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "coatings",
      "key": "technologyofformulationandmanufactureofcoatings",
      "name": "Technology of Formulation and Manufacture of Coatings",
      "icon": "🎨",
      "color": "bg-purple-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "additives",
      "key": "technologyofpaintandcoatingadditives",
      "name": "Technology of Paint and Coating Additives",
      "icon": "⚗️",
      "color": "bg-blue-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "syntheticResins",
      "key": "technologyofsyntheticresinsandpolymers",
      "name": "Technology of Synthetic Resins and Polymers",
      "icon": "🧪",
      "color": "bg-indigo-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "resinsLab",
      "key": "technologyofsyntheticresinsandpolymerslab",
      "name": "Technology of Synthetic Resins and Polymers Lab",
      "icon": "🥼",
      "color": "bg-emerald-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "theory-of-machines",
      "key": "theoryofmachinesii",
      "name": "Theory of Machines-II",
      "icon": "🔧",
      "color": "bg-green-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Theory of Machines-II Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "toafl",
      "key": "toafl",
      "name": "TOAFL",
      "icon": "🤖",
      "color": "bg-purple-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Unit-1 (Part-1) Intro",
          "url": "https://drive.google.com/uc?export=download&id=1kjeyYAnyvZ27BRNS-809YVqRA_S3l6lS",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-2) Finite Automata",
          "url": "https://drive.google.com/uc?export=download&id=1leNJq-PeybsShSZzAi1q4AxXfvQx0dbs",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-3) Finite Automata",
          "url": "https://drive.google.com/uc?export=download&id=1s5xIbwm8SW0nWwUe5yCKkTpgKXe1N12P",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-4) FSA",
          "url": "https://drive.google.com/uc?export=download&id=12iicJxCdSfDeMkMlVYW7jiT_GGdriSKT",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-5) Minimization of DFA",
          "url": "https://drive.google.com/uc?export=download&id=1RCEWYXj2CbuFSwbImho21oE5BC_LEVTl",
          "recommended": false
        },
        {
          "title": "Unit-1 (Part-6) Numericals",
          "url": "https://drive.google.com/uc?export=download&id=1dvmHtwB8xgHW4XHcRIDbFOU4HtiEWZ_3",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-1) Formal Language",
          "url": "https://drive.google.com/uc?export=download&id=12ibIAp1ADgGHx-aXO_f0-gG94bFLXBuU",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-2) Regular Language",
          "url": "https://drive.google.com/uc?export=download&id=178jZZLY_uUgGabJ_pt26EdVuMxhfNwbm",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-3) Identification of R.L",
          "url": "https://drive.google.com/uc?export=download&id=1jTGsam3FTCJcNKBFn9m2ZlL-4cUh1OOV",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-4) Conversion of F.A ↔ R.E",
          "url": "https://drive.google.com/uc?export=download&id=1LF5Ty6aCr3rErbp9nXyKCDyklq7ZF_Sg",
          "recommended": false
        },
        {
          "title": "Unit-2 (Part-5) Numericals",
          "url": "https://drive.google.com/uc?export=download&id=1ZvoI1UK0-UBpqcPwWDrfCB1SvjgqfZpO",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-1) C.F.G",
          "url": "https://drive.google.com/uc?export=download&id=16vRF2qbp_Qy0PlmGbNIFSgk8CXyJcTJt",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-2) Ambiguity",
          "url": "https://drive.google.com/uc?export=download&id=1HHhQqw1vENarMeC43GRK0XpUD9wEutwx",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-3) Normal form of CFG",
          "url": "https://drive.google.com/uc?export=download&id=1Uv2BRORyA3MM2VejDACIwgGvGWc93HBr",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-4) Conversion R.G to F.A",
          "url": "https://drive.google.com/uc?export=download&id=1Hc9UmUpAb-jefzVJkkz4lwLqMBQ1SGwi",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-5) Removal of € Production",
          "url": "https://drive.google.com/uc?export=download&id=1H4TrVwfMIK99FL09vFka14VYXBz7qU7l",
          "recommended": false
        },
        {
          "title": "Unit-3 (Part-6) Numericals",
          "url": "https://drive.google.com/uc?export=download&id=1FgF7K2tBaNbnDSKU1gxNbeYJSPKazhAt",
          "recommended": false
        },
        {
          "title": "Unit-4 (Part-1) PDA",
          "url": "https://drive.google.com/uc?export=download&id=1z34TgJxZAv8TdhQu2LT8cdJdX_2dF1e1",
          "recommended": false
        },
        {
          "title": "Unit-4 (Part-2) CFL & PDA",
          "url": "https://drive.google.com/uc?export=download&id=11zgw3vxokIntpi_X7uyvaDtwurwozhTy",
          "recommended": false
        },
        {
          "title": "Unit-4 (Part-3) Deterministic PDA & CFL",
          "url": "https://drive.google.com/uc?export=download&id=19AtDKXmRjEDDy2AUyGpzPzmGmxRHr-K5",
          "recommended": false
        },
        {
          "title": "Unit-4 (Part-4) Numericals",
          "url": "https://drive.google.com/uc?export=download&id=1jOerH4n6SsTS1GauHKYqQ6MhhIwpzFCN",
          "recommended": false
        },
        {
          "title": "Unit-5 (Part-1) Turing Machine",
          "url": "https://drive.google.com/uc?export=download&id=18npomOndEib0Sfp4w61bIJA6Pwf_0V_z",
          "recommended": false
        },
        {
          "title": "Unit-5 (Part-2) Turing Machine as Lang. Acceptor",
          "url": "https://drive.google.com/uc?export=download&id=1ZE6BNjPKb9kWh8F-8eUQv9UtDBQT-gJX",
          "recommended": false
        },
        {
          "title": "Unit-5 (Part-3) LBA & Decidability Problem",
          "url": "https://drive.google.com/uc?export=download&id=1c5Xyn5CYpTsBmuCXqUohX3dwYaPvGEgT",
          "recommended": false
        },
        {
          "title": "Unit-5 (Part-4) Numericals",
          "url": "https://drive.google.com/uc?export=download&id=1L_D8l0_FkYEcWrPLXBmxPPIEHbnGojfH",
          "recommended": false
        },
        {
          "title": "TOAFL Full Notes by 5 min. Engg.",
          "url": "https://drive.google.com/uc?export=download&id=1Coqf6FN6nUBddkL8uXp_bwUmsLTNje2E",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "TOAFL Playlist -Gate Smashers",
            "url": "https://youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i&si=RnlhLn9QVUpKRBWj",
            "recommended": false
          },
          {
            "title": "TOAFL Playlist -Gate Hub",
            "url": "https://youtube.com/playlist?list=PL1QH9gyQXfgsUBfYUR0WirJASgif4pHVX&si=ErI3w0QFAdHp0vik",
            "recommended": false
          },
          {
            "title": "TOAFL Playlist -CSE Academy",
            "url": "https://youtube.com/playlist?list=PLS6nugESt9lKS5TYU6VgqUgT1uPbYH9eE&si=3vXsmMfhOZK-FiGY",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "TOAFL-by 5 Min.Engg.",
            "url": "https://youtu.be/acCztqcZi_Q?si=u77gG3cBgxXyi94Q",
            "recommended": false
          },
          {
            "title": "TOAFL-by Knowledge GATE",
            "url": "https://youtu.be/9kuynHcM3UA?si=S0ZoakGy81zG1-r2",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "uet",
      "key": "utilizationofelectricalenergytraction",
      "name": "Utilization of Electrical Energy & Traction",
      "icon": "📊",
      "color": "bg-teal-500",
      "branches": [
        "EE"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "vlsi",
      "key": "vlsitechnology",
      "name": "VLSI Technology",
      "icon": "📻",
      "color": "bg-teal-500",
      "branches": [
        "ET"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    }
  ],
  "6": [
    {
      "id": "ai",
      "key": "artificialintelligence",
      "name": "Artificial Intelligence",
      "icon": "🤖",
      "color": "bg-purple-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "AI Notes (UPTO MID SEM-1)",
          "url": "https://drive.google.com/file/d/15XHFBtmouZBNB1IW2h6LL57T-uqzGDSH/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "A* Algorithm PDF",
          "url": "https://drive.google.com/file/d/1ks_pUlZYWHxskrM5bt9R5cnSxl7t43qj/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "AI Unit-2 PDF Notes",
          "url": "https://drive.google.com/file/d/1HzAZz8yz8owX-JFUAtnpV5NPBMEQSEiD/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Automated Reasoning & Visual Perception PDF",
          "url": "https://drive.google.com/file/d/1tXudt3Be5CsIwpDQbxrEAPCc2CAqP1yf/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Fillmore Grammer PDF",
          "url": "https://drive.google.com/file/d/1UTHmalD0JrzQzYZXY4hINchthZL9E600/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Intro to PROLOG PDF",
          "url": "https://drive.google.com/file/d/1gYtWG9BDeddCt9n5Q6eS8eJ8_Fm0Xw8k/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Case Studies: DENDRAL, MYCIN & JESS",
          "url": "https://drive.google.com/file/d/1SBL4n6rUE8gY_lpF0SNhzUVwJP6fncvD/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "AI - 5th Assignment",
          "url": "https://drive.google.com/file/d/1cg9pIUUqqXni3WpSMX92jkYrqF6uXdj_/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "AI Complete Playlist",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "AI One Shot",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "basicPaint",
      "key": "basicpainttechnology",
      "name": "Basic Paint Technology",
      "icon": "🎨",
      "color": "bg-amber-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bioinstrumentation",
      "key": "bioinstrumentation",
      "name": "Bio-Instrumentation",
      "icon": "🔬",
      "color": "bg-blue-500",
      "branches": [
        "BE"
      ],
      "notes": [
        {
          "title": "Bio-Instrumentation Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "biochem",
      "key": "biochemicalengineering",
      "name": "Biochemical Engineering",
      "icon": "🧬",
      "color": "bg-purple-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Biochemical Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bioinformatics",
      "key": "bioinformatics",
      "name": "Bioinformatics",
      "icon": "🖥️",
      "color": "bg-teal-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "biomass",
      "key": "biomassenergy",
      "name": "Biomass Energy",
      "icon": "🌿",
      "color": "bg-emerald-600",
      "branches": [
        "BE"
      ],
      "notes": [
        {
          "title": "Biomass Energy Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "bioprocess",
      "key": "bioprocess",
      "name": "Bioprocess Engineering",
      "icon": "🧫",
      "color": "bg-green-600",
      "branches": [
        "BE",
        "BT"
      ],
      "notes": [
        {
          "title": "Bioprocess Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cereal",
      "key": "cerealtechnology",
      "name": "Cereal Technology",
      "icon": "🌾",
      "color": "bg-yellow-600",
      "branches": [
        "LFT"
      ],
      "notes": [
        {
          "title": "Cereal Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "characterization",
      "key": "characterizationanalysisandevaluationofcoatings",
      "name": "Characterization, Analysis and Evaluation of Coatings",
      "icon": "🔬",
      "color": "bg-indigo-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "coatingsLab",
      "key": "characterizationanalysisandevaluationofcoatingslab",
      "name": "Characterization, Analysis and Evaluation of Coatings Lab",
      "icon": "🥼",
      "color": "bg-emerald-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cd",
      "key": "compilerdesign",
      "name": "Compiler Design",
      "icon": "💻",
      "color": "bg-blue-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "CD -Rough Copy (My Lecture Notes)",
          "url": "https://drive.google.com/file/d/1HfGUofPis_2lNC6HWPUJANSmjJmfQvQt/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Complete CD Notes By-Priyal Kumar (BEST)",
          "url": "https://drive.google.com/file/d/1uGNVlq5UNufG8Nz9JyJiqeAgvj_F46zb/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Code Optimization Notes (BEST)",
          "url": "https://drive.google.com/file/d/1ggNi8S3qTwtvrV7oRw1wVBnOOQ7HsoNH/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DAG Notes (BEST)",
          "url": "https://drive.google.com/file/d/1smxrq6G6IrWo5HmhzewZyNn5Vmif2wJF/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Intermediate Code Generator Notes (BEST)",
          "url": "https://drive.google.com/file/d/19S6Jzc4a7wx7RMuFggI-SFtSbr3KXuyA/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Full CD Notes (Optional)",
          "url": "https://drive.google.com/file/d/1o-EHoiE9vK4WmKiOMAKnaI02BYXsRvhp/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "CD Playlist By- Gate Hub",
            "url": "https://youtube.com/playlist?list=PL1QH9gyQXfguPNDTsnG90W2kBDQpYLDQr&si=-RC7IX3_lC1n7bRt",
            "recommended": false
          },
          {
            "title": "CD Unitwise OneShot Playlist - MultiAtoms",
            "url": "https://youtube.com/playlist?list=PLh11ucJN276J4uv6uwawDr3mNHTdx9n43&si=7K6fQKEqeDpyp_Et",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "CD One Shot By-5 Min. Engg",
            "url": "https://youtu.be/7ICf62fp_4I?si=IyIn0v3m9QmzPrpX",
            "recommended": false
          },
          {
            "title": "Unit-1 One Shot By-Gate Hub",
            "url": "https://youtu.be/VQeI7lB5ccM?si=qELcs_g6tsZ3exc5",
            "recommended": false
          },
          {
            "title": "CD One Shot By-Knowledge Gate",
            "url": "https://youtu.be/OQCjakjCJu4?si=tyAXGu7MVXaPJyD7",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "cg",
      "key": "computergraphics",
      "name": "Computer Graphics",
      "icon": "🎨",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "Unit-1 Complete Notes",
          "url": "https://drive.google.com/file/d/1YK7hE7bcjU08i1XORSFUyTPU029wzZf6/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Complete Notes",
          "url": "https://drive.google.com/file/d/1mFKMpVux4rH1-u62SJj80Ey_30bGXvYC/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 Complete Notes",
          "url": "https://drive.google.com/file/d/1Vu-o6nehnizx8L9Ix9MY6liRZzOKqtm4/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Complete Notes",
          "url": "https://drive.google.com/file/d/1IlfUbqaLyS2mCws7MWCHS844R04eOfj9/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-5 Complete Notes",
          "url": "https://drive.google.com/file/d/1NIdOhmiQzq1ZrUspMA-9xkPCocChfvCS/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CG Short Notes(UPTO MID SEM-1)",
          "url": "https://drive.google.com/file/d/1vrqJcmk6OWhT-78xm24lXYoNc4c9AyyA/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CG Lab File by-Priyal Kumar",
          "url": "https://drive.google.com/file/d/1mYLcW_NtDwqmiMrlYKwhr8CZz5L7wA-s/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "CG Imp. Lab Program for Practical & ESE",
          "url": "https://drive.google.com/file/d/1x_jsxXpk-Pk1Yg-Bk9KHX24lji7ZLicf/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "CG Playlist - 5 Min. Engg (Must Watch)",
            "url": "https://youtube.com/playlist?list=PLYwpaL_SFmcAtxMe7ahYC4ZYjQHun_b-T&si=bWK_DqlTVDh7-sXJ",
            "recommended": false
          },
          {
            "title": "CG OneShot Playlist - MultiAtom",
            "url": "https://youtube.com/playlist?list=PLvu-LC7buiaW7eFdacsxGSeaoe2euao6c&si=G2ZmT7LIk-wHj8Ll",
            "recommended": false
          },
          {
            "title": "CG By- Education 4 u Playlist (Must Watch)",
            "url": "https://youtube.com/playlist?list=PLrjkTql3jnm9cY0ijEyr2fPdwnH-0t8EY&si=1X_5EcUzdr7yXKca",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "CG Complete OneShot (NEW)",
            "url": "https://youtu.be/ufafNJAXSnA?si=kcJv6vrKBrNzMJnN",
            "recommended": false
          },
          {
            "title": "Transformations in 2D",
            "url": "https://youtu.be/LJA8HlPfyQw?si=OEVl7yX1CUoDcTGi",
            "recommended": false
          },
          {
            "title": "Transformations in 3D",
            "url": "https://youtu.be/0ebVXplaJFc?si=9Fl1n4k8Osm0CIju",
            "recommended": false
          },
          {
            "title": "Window to Viewport Transformation",
            "url": "https://youtu.be/ivNhBhS1UoU?si=QdXdlYHdMSHlO4J_",
            "recommended": false
          },
          {
            "title": "Curve & Surface -Lecture",
            "url": "https://youtu.be/uKXbkJR6gek?si=pCKpOIEJEYDWs6df",
            "recommended": false
          },
          {
            "title": "Hidden & Visible Surfaces -Intro",
            "url": "https://youtu.be/kPd95B2KOyc?si=BlBl7iDOgxv6WuBs",
            "recommended": false
          },
          {
            "title": "Hidden & Visible Surfaces -State Space Method",
            "url": "https://youtu.be/dqsVQ31ZfuE?si=IzlNa0KAQrOe4KWL",
            "recommended": false
          },
          {
            "title": "Coherence Properties -Lecture",
            "url": "https://youtu.be/BOiEtlLwUuw?si=ES0-2bAXrJJhUPhY",
            "recommended": false
          },
          {
            "title": "Back Face Removal -Lecture",
            "url": "https://youtu.be/_p16NATygqU?si=hqihEdZLK5A_m0Lx",
            "recommended": false
          },
          {
            "title": "Back Face Detection Methods-Lecture",
            "url": "https://youtu.be/tOOiJ91wWJY?si=IVgINXZDM1SmHpjC",
            "recommended": false
          },
          {
            "title": "Z-Buffer algorithm -Lecture",
            "url": "https://youtu.be/JZutixUiCEE?si=JH_RSKumVp77DmiZ",
            "recommended": false
          },
          {
            "title": "Curve & Its Types -Lecture",
            "url": "https://youtu.be/1iuINGsS_vo?si=ThiB_4HKgJ-rCSxs",
            "recommended": false
          },
          {
            "title": "Bezier Curve & Its Properties -Lecture",
            "url": "https://youtu.be/grYrC6_LDcY?si=uRKG1lBnTwvD3sM4",
            "recommended": false
          },
          {
            "title": "Bezier Curve -Numerical",
            "url": "https://youtu.be/wZbazXBkGv4?si=mlvtD15PVaHRixUa",
            "recommended": false
          },
          {
            "title": "Hermite Curve -Lecture",
            "url": "https://youtu.be/8vo21tbtDgU?si=OXcsTld9I2bXxLpu",
            "recommended": false
          },
          {
            "title": "Bezier Curve & Hermite Spline -Numericals",
            "url": "https://youtu.be/4vjBXh3xYB4?si=k4oTSB3YAVwblJtu",
            "recommended": false
          },
          {
            "title": "Concepts of B-Spline -Lecture",
            "url": "https://youtu.be/kFRl2eNyW1E?si=Cefg5esj-FM_dTc5",
            "recommended": false
          },
          {
            "title": "Numericals on B-Spline",
            "url": "https://youtu.be/H0VBveFyIZU?si=SY2ZIvDcacwv2z_l",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "cim",
      "key": "computerintegratedmanufacturing",
      "name": "Computer Integrated Manufacturing",
      "icon": "🏭",
      "color": "bg-green-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "CIM Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cn",
      "key": "computernetworks",
      "name": "Computer Networks",
      "icon": "🌐",
      "color": "bg-purple-500",
      "branches": [
        "ET"
      ],
      "notes": [
        {
          "title": "CN Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "controlsys",
      "key": "controlsystems",
      "name": "Control Systems",
      "icon": "🎛️",
      "color": "bg-blue-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Control Systems Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "corrosion",
      "key": "corrosionengineering",
      "name": "Corrosion Engineering",
      "icon": "🔩",
      "color": "bg-red-500",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "Corrosion Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "dairy",
      "key": "dairytechnology",
      "name": "Dairy Technology",
      "icon": "🥛",
      "color": "bg-blue-400",
      "branches": [
        "LFT"
      ],
      "notes": [
        {
          "title": "Dairy Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "dip",
      "key": "digitalimageprocessing",
      "name": "Digital Image Processing",
      "icon": "📷",
      "color": "bg-blue-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "DIP Complete Notes",
          "url": "https://youngresearcher.in/dip_qa/",
          "recommended": false
        },
        {
          "title": "DIP Book PDF",
          "url": "https://drive.google.com/file/d/1ftfZb_-YCh0Bn3BB5MqvWsJLIyGOoAcT/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DIP Additional Notes",
          "url": "https://drive.google.com/file/d/1i2FAENNKaIEYi_0f_J9BkXGIFceovc8s/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "DIP Lecture Notes",
          "url": "https://drive.google.com/file/d/11lifkDAxyt7LMVSy6JfgkzRviUDzAwq9/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "DIP Complete Playlist",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "DIP One Shot",
            "url": "#",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "dsp",
      "key": "digitalsignalprocessing",
      "name": "Digital Signal Processing",
      "icon": "📡",
      "color": "bg-purple-500",
      "branches": [
        "EE",
        "ET"
      ],
      "notes": [
        {
          "title": "DSP Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "electricmachine",
      "key": "emmi",
      "name": "Electrical Machines-II",
      "icon": "🔌",
      "color": "bg-green-600",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Electrical Machines-II Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "entrepreneurship",
      "key": "entrepreneurship",
      "name": "Entrepreneurship",
      "icon": "💡",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT",
        "ET",
        "ME"
      ],
      "notes": [
        {
          "title": "Entrepreneurship Notes (UPTO MID SEM-1)",
          "url": "https://drive.google.com/file/d/1m6DIjYxnAQhHJ2j7ER4J2-vVRhIfrsY7/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Full Entrepreneurship Notes (BEST)",
          "url": "https://docs.google.com/document/d/1-F4WRVvWzW8OZUjUsFtZX0mgtbsq1dGJ5tkl_hJao0I/edit?usp=sharing",
          "recommended": false
        },
        {
          "title": "Entrepreneurship Extra GPT Notes",
          "url": "https://drive.google.com/file/d/1epEbIJ_Y8J_V7rkbPM50ufwG8DVNVCq9/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Imp. Numerical PDF",
          "url": "https://drive.google.com/file/d/1X2GW3TcZiIp1RLpB_HECRerQQTBGFWIb/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Entrepreneurship Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "Financing Decision -Capital Structure",
            "url": "https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16",
            "recommended": false
          },
          {
            "title": "Investment Decision -Capital Budget",
            "url": "https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL",
            "recommended": false
          },
          {
            "title": "EBIT/EPS Numerical -Capital Structure",
            "url": "https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY",
            "recommended": false
          },
          {
            "title": "ARR Numerical -Capital Structure",
            "url": "https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF",
            "recommended": false
          },
          {
            "title": "IRR Numerical -Capital Structure",
            "url": "https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9",
            "recommended": false
          },
          {
            "title": "NPV Numerical -Capital Structure",
            "url": "https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1",
            "recommended": false
          },
          {
            "title": "Working Capital Management -Concepts",
            "url": "https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg",
            "recommended": false
          },
          {
            "title": "Working Capital Management -Numericals",
            "url": "https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2",
            "recommended": false
          },
          {
            "title": "Entrepreneurship Playlist",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": [
          {
            "title": "Financing Decision -Capital Structure",
            "url": "https://youtu.be/xO20sAjwbq4?si=EmbYJhfQGf8OBd16",
            "recommended": false
          },
          {
            "title": "Investment Decision -Capital Budget",
            "url": "https://youtu.be/KAITRH_Ohss?si=l9ggbusQWH0rbxOL",
            "recommended": false
          },
          {
            "title": "EBIT/EPS Numerical -Capital Structure",
            "url": "https://youtu.be/jG0pd7bFMbM?si=dT3qHXuoukRM9cfY",
            "recommended": false
          },
          {
            "title": "ARR Numerical -Capital Structure",
            "url": "https://youtu.be/duAS8l4GcgM?si=gWTqjks_LLGCsBmF",
            "recommended": false
          },
          {
            "title": "IRR Numerical -Capital Structure",
            "url": "https://youtu.be/EUGU9q1gzR0?si=osFvPbZY0NsGQBX9",
            "recommended": false
          },
          {
            "title": "NPV Numerical -Capital Structure",
            "url": "https://youtu.be/sTvV0fkLhh0?si=LeA4JZVzu0ptcFN1",
            "recommended": false
          },
          {
            "title": "Working Capital Management -Concepts",
            "url": "https://youtu.be/MDeCGC5G2BI?si=PyGYO7Xb_KioasUg",
            "recommended": false
          },
          {
            "title": "Working Capital Management -Numericals",
            "url": "https://youtu.be/8cB2NI3NkgU?si=59kVTIl96ee1YDs2",
            "recommended": false
          }
        ]
      }
    },
    {
      "id": "env",
      "key": "environmentalengineering",
      "name": "Environmental Engineering",
      "icon": "🌿",
      "color": "bg-green-500",
      "branches": [
        "CE",
        "OT"
      ],
      "notes": [
        {
          "title": "Environmental Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "enzyme",
      "key": "enzymetechnology",
      "name": "Enzyme Technology",
      "icon": "⚗️",
      "color": "bg-teal-500",
      "branches": [
        "BE"
      ],
      "notes": [
        {
          "title": "Enzyme Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "packaging",
      "key": "foodpackagingtechnology",
      "name": "Food Packaging Technology",
      "icon": "📦",
      "color": "bg-green-500",
      "branches": [
        "LFT"
      ],
      "notes": [
        {
          "title": "Food Packaging Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "foodpres",
      "key": "foodpreservationtechnology",
      "name": "Food Preservation Technology",
      "icon": "🥫",
      "color": "bg-orange-500",
      "branches": [
        "LFT"
      ],
      "notes": [
        {
          "title": "Food Preservation Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "footwear",
      "key": "footweartechnology",
      "name": "Footwear Technology",
      "icon": "👟",
      "color": "bg-amber-700",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Footwear Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "genetics",
      "key": "geneticengineering",
      "name": "Genetic Engineering",
      "icon": "🧬",
      "color": "bg-purple-500",
      "branches": [
        "BE",
        "BT"
      ],
      "notes": [
        {
          "title": "Genetic Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "geotech",
      "key": "geotechnicalengineering",
      "name": "Geotechnical Engineering",
      "icon": "⛏️",
      "color": "bg-yellow-700",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Geotechnical Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "hmt",
      "key": "heatmasstransfer",
      "name": "Heat & Mass Transfer",
      "icon": "🔥",
      "color": "bg-red-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "HMT Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "heatexchange",
      "key": "heatexchangerdesign",
      "name": "Heat Exchanger Design",
      "icon": "🔬",
      "color": "bg-red-500",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Heat Exchanger Design Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "immunology",
      "key": "immunotechnology",
      "name": "Immunotechnology",
      "icon": "🛡️",
      "color": "bg-indigo-500",
      "branches": [
        "BT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "instrumentation",
      "key": "industrialinstrumentation",
      "name": "Industrial Instrumentation",
      "icon": "🎛️",
      "color": "bg-blue-600",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "Industrial Instrumentation Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ipc",
      "key": "instrumentationprocesscontrol",
      "name": "Instrumentation & Process Control (IPC)",
      "icon": "🎛️",
      "color": "bg-blue-500",
      "branches": [
        "PL",
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ips",
      "key": "introductiontopolymerscience",
      "name": "Introduction to Polymer Science (IPS)",
      "icon": "🧪",
      "color": "bg-orange-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "chemicals",
      "key": "leatherchemicals",
      "name": "Leather Chemicals",
      "icon": "⚗️",
      "color": "bg-blue-600",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Leather Chemicals Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "exports",
      "key": "leatherexportmanagement",
      "name": "Leather Export Management",
      "icon": "📦",
      "color": "bg-green-600",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Leather Export Management Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "finishing",
      "key": "leatherfinishing",
      "name": "Leather Finishing",
      "icon": "✨",
      "color": "bg-yellow-600",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Leather Finishing Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "leather",
      "key": "leatherprocessing",
      "name": "Leather Processing",
      "icon": "🧤",
      "color": "bg-amber-800",
      "branches": [
        "FT"
      ],
      "notes": [
        {
          "title": "Leather Processing Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mae",
      "key": "machinedesign",
      "name": "Machine Design",
      "icon": "🔩",
      "color": "bg-blue-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Machine Design Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "masstransfer",
      "key": "masstransferoperations",
      "name": "Mass Transfer Operations",
      "icon": "⚗️",
      "color": "bg-blue-600",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Mass Transfer Operations Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "meat",
      "key": "meatpoultrytechnology",
      "name": "Meat & Poultry Technology",
      "icon": "🍖",
      "color": "bg-red-500",
      "branches": [
        "LFT"
      ],
      "notes": [
        {
          "title": "Meat & Poultry Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "mwe",
      "key": "microwaveengineering",
      "name": "Microwave Engineering",
      "icon": "📡",
      "color": "bg-blue-500",
      "branches": [
        "ET"
      ],
      "notes": [
        {
          "title": "MWE Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "oops",
      "key": "objectorientedsystemdesign",
      "name": "Object Oriented System Design",
      "icon": "⚙️",
      "color": "bg-green-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [
        {
          "title": "OOMD Notes with UML",
          "url": "https://drive.google.com/file/d/15U47qFbbIchLEjjOdDgDTasWDd9a9a0k/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "OOS Notes (UPTO MID SEM-1)",
          "url": "https://drive.google.com/file/d/1nT8SZZVX8HNIa-eL8gLHeS4tlSwrBPvz/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-1 Best Notes - Priyal Kumar",
          "url": "https://drive.google.com/file/d/1G2FjarscpxMvRsndYAuhrAIr2tBg0qjK/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-2 Best Notes - Priyal Kumar",
          "url": "https://drive.google.com/file/d/1rwOWWUwOsb2glQ6qREll3r-twpl6zglV/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-3 Best Notes - Priyal Kumar",
          "url": "https://drive.google.com/file/d/1VjBU1zMn2BD47RPdRPH09ZvPfaOKOALG/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Unit-4 Best Notes - Priyal Kumar",
          "url": "https://drive.google.com/file/d/1zgPUZMBFjTA5ndJqAImIZPMBool5sug0/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "OOS LAB File -Priyal Kumar",
          "url": "https://drive.google.com/file/d/1kPFwtHiRu6trNYwHlmgaZgY3HPn9ScTL/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "Imp. Diagrams & Last Min. Revision",
          "url": "https://drive.google.com/file/d/11yWd_yBYrcyGtYWseuzpFBP9sJfBkiI-/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "OOS All Assignment Ques. ( for Practice)",
          "url": "https://drive.google.com/file/d/1R4FSXABX1jfaAAKd2abvgmMl59GLfm1M/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "OOS -Quantum Book PDF",
          "url": "https://drive.google.com/file/d/1x2oKtVibZ-Ww77lw-DZwONHrn3wBvR4Y/view?usp=drivesdk",
          "recommended": false
        },
        {
          "title": "OOS - Book PDF",
          "url": "https://drive.google.com/file/d/18jDR9nJfJdz5I5vTYRxiI92-gRizkRdV/view?usp=drivesdk",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [
          {
            "title": "OOPS Playlist",
            "url": "#",
            "recommended": false
          }
        ],
        "oneshot": []
      }
    },
    {
      "id": "oilandgas",
      "key": "oilgastechnology",
      "name": "Oil & Gas Technology",
      "icon": "🛢️",
      "color": "bg-gray-600",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "Oil & Gas Technology Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "open-elective",
      "key": "openelective",
      "name": "Open Elective (OE)",
      "icon": "🌟",
      "color": "bg-indigo-600",
      "branches": [
        "BE",
        "BT",
        "CHE",
        "FT",
        "LFT",
        "OT",
        "PL",
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "petroleum",
      "key": "petroleumrefineryprocesses",
      "name": "Petroleum Refinery Processes",
      "icon": "⚙️",
      "color": "bg-orange-600",
      "branches": [
        "OT"
      ],
      "notes": [
        {
          "title": "Petroleum Refinery Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "petro",
      "key": "petroleumrefining",
      "name": "Petroleum Refining",
      "icon": "🛢️",
      "color": "bg-gray-600",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Petroleum Refining Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pclab",
      "key": "polymercharacterizationlab",
      "name": "Polymer Characterization Lab (PC LAB)",
      "icon": "🥼",
      "color": "bg-emerald-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "pc",
      "key": "polymercomposite",
      "name": "Polymer Composite (PC)",
      "icon": "🧱",
      "color": "bg-teal-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "powerelec",
      "key": "powerelectronics",
      "name": "Power Electronics",
      "icon": "⚡",
      "color": "bg-yellow-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Power Electronics Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "powersys",
      "key": "powersystemanalysis",
      "name": "Power System Analysis",
      "icon": "🏭",
      "color": "bg-red-500",
      "branches": [
        "EE"
      ],
      "notes": [
        {
          "title": "Power System Analysis Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "process",
      "key": "processdynamicscontrol",
      "name": "Process Dynamics & Control",
      "icon": "🎛️",
      "color": "bg-green-600",
      "branches": [
        "CHE"
      ],
      "notes": [
        {
          "title": "Process Dynamics Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "rcd",
      "key": "reinforcedconcretedesign",
      "name": "Reinforced Concrete Design",
      "icon": "🏗️",
      "color": "bg-gray-600",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "RCD Complete Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "rt",
      "key": "rubbertechnology",
      "name": "Rubber Technology (RT)",
      "icon": "⚙️",
      "color": "bg-indigo-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "sprp",
      "key": "structurepropertiesrelationshipofpolymers",
      "name": "Structure & Properties Relationship of Polymers (SPRP)",
      "icon": "🔬",
      "color": "bg-purple-500",
      "branches": [
        "PL"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "inks",
      "key": "technologyofprintinginksandcoatings",
      "name": "Technology of Printing Inks and Coatings",
      "icon": "🖨️",
      "color": "bg-teal-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "surfacePrep",
      "key": "technologyofsurfacepreparationtreatmentsandcoatingapplications",
      "name": "Technology of Surface Preparation, Treatments and Coating Applications",
      "icon": "✨",
      "color": "bg-purple-500",
      "branches": [
        "PT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "transport",
      "key": "transportationengineering",
      "name": "Transportation Engineering",
      "icon": "🛣️",
      "color": "bg-orange-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Transportation Engineering Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "te",
      "key": "turbomachinery",
      "name": "Turbo Machinery",
      "icon": "⚙️",
      "color": "bg-orange-500",
      "branches": [
        "ME"
      ],
      "notes": [
        {
          "title": "Turbo Machinery Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "water",
      "key": "waterresourcesengineering",
      "name": "Water Resources Engineering",
      "icon": "💧",
      "color": "bg-blue-500",
      "branches": [
        "CE"
      ],
      "notes": [
        {
          "title": "Water Resources Notes",
          "url": "#",
          "recommended": false
        }
      ],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    }
  ],
  "7": [
    {
      "id": "cc",
      "key": "cloudcomputing",
      "name": "Cloud Computing",
      "icon": "☁️",
      "color": "bg-indigo-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cns",
      "key": "cryptographynetworksecurity",
      "name": "Cryptography & Network Security",
      "icon": "📡",
      "color": "bg-blue-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "dept_elective",
      "key": "departmentalelective",
      "name": "Departmental Elective",
      "icon": "📘",
      "color": "bg-orange-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ds",
      "key": "distributedsystems",
      "name": "Distributed Systems",
      "icon": "🌐",
      "color": "bg-purple-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "ml",
      "key": "machinelearning",
      "name": "Machine Learning",
      "icon": "🤖",
      "color": "bg-green-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "open_elective_2",
      "key": "openelective",
      "name": "Open Elective-II",
      "icon": "🌟",
      "color": "bg-emerald-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    }
  ],
  "8": [
    {
      "id": "bigdata",
      "key": "bigdataanalytics",
      "name": "Big Data Analytics",
      "icon": "📊",
      "color": "bg-blue-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "cybersecurity",
      "key": "cybersecuritylaws",
      "name": "Cyber Security & Laws",
      "icon": "⚖️",
      "color": "bg-red-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "dl_ai",
      "key": "deeplearningartificialintelligence",
      "name": "Deep Learning & Artificial Intelligence",
      "icon": "🧠",
      "color": "bg-purple-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "dept_elective_8",
      "key": "departmentalelective",
      "name": "Departmental Elective",
      "icon": "📘",
      "color": "bg-green-600",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "major_project",
      "key": "majorprojectseminar",
      "name": "Major Project / Seminar",
      "icon": "🏗️",
      "color": "bg-orange-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    },
    {
      "id": "open_elective_8",
      "key": "openelective",
      "name": "Open Elective",
      "icon": "🌐",
      "color": "bg-indigo-500",
      "branches": [
        "CSE/IT"
      ],
      "notes": [],
      "playlists": {
        "detailed": [],
        "oneshot": []
      }
    }
  ]
};

/**
 * Returns all unique subjects taught in a given semester across all engineering branches.
 */
export function getSemesterSubjects(semesterNum: string | number): SemesterSubjectItem[] {
  const semStr = String(semesterNum).replace(/^semester-?/i, '').trim();
  return SEMESTER_SUBJECTS_CATALOG[semStr] || [];
}

/**
 * Normalizes subject title for fast relational matching across branches.
 */
export function getSubjectCanonicalKey(rawName: string): string {
  let s = (rawName || '').toLowerCase().trim();
  s = s.replace(/\s*\([^)]*\)/g, '');
  s = s.replace(/[^a-z0-9]/g, '');
  if (s.startsWith('enggmathematics') || s.startsWith('engineeringmathematics')) {
    if (s.includes('ii') || s.includes('2')) return 'math2';
    if (s.includes('iii') || s.includes('3')) return 'math3';
    if (s.includes('iv') || s.includes('4')) return 'math4';
  }
  if (s.includes('digitalelectronics')) return 'digitalelectronics';
  if (s.includes('datastructures')) return 'datastructures';
  if (s.includes('computerorganisation') || s.includes('computerorganization')) return 'computerorganisation';
  if (s.includes('python')) return 'python';
  if (s.includes('entrepreneur')) return 'entrepreneurship';
  if (s.includes('economicsmanagement') || s.includes('economicmanagement')) return 'economicsmanagement';
  if (s.includes('fluidmechanics')) return 'fluidmechanics';
  if (s.includes('chemicalprocesscalculation')) return 'chemicalprocesscalculations';
  if (s.includes('openelective')) return 'openelective';
  if (s.includes('bioprocess')) return 'bioprocess';
  if (s.includes('geneticengineering')) return 'geneticengineering';
  if (s.includes('chemicalenggthermodynamics') || s.includes('chemicalengineeringthermodynamics')) return 'chethermo';
  if (s.includes('heattransfer')) return 'heattransfer';
  if (s.includes('conm') || s.includes('computeronumerical')) return 'conm';
  if (s.includes('modernanalyticaltechnique')) return 'modernanalyticaltechniques';
  if (s.includes('solidstatedevices') || s.includes('ssdc')) return 'ssdc';
  if (s.includes('electricalmachines') || s.includes('emmi')) return 'emmi';
  if (s.includes('environmentalengineering')) return 'environmentalengineering';
  if (s.includes('previousyear') || s.includes('pyq')) return 'pyqs';
  if (s.includes('assignment')) return 'assignments';
  return s;
}

/**
 * Merges a branch's local subject notes with all known notes for this subject across other branches,
 * guaranteeing no branch is missing any notes for common subjects (e.g. Entrepreneurship, E&M, Math).
 */
export function getUnifiedSubjectNotes(semesterNum: string | number, subjectName: string, localNotes: CatalogNoteItem[] = []): CatalogNoteItem[] {
  const semStr = String(semesterNum).replace(/^semester-?/i, '').trim();
  const semList = SEMESTER_SUBJECTS_CATALOG[semStr] || [];
  const targetKey = getSubjectCanonicalKey(subjectName);
  
  const catalogItem = semList.find(s => s.key === targetKey || s.name.toLowerCase() === subjectName.toLowerCase());
  if (!catalogItem || !catalogItem.notes || catalogItem.notes.length === 0) {
    return localNotes;
  }

  const merged = [...localNotes];
  catalogItem.notes.forEach(cn => {
    const alreadyExists = merged.some(ln => ln.url === cn.url || (ln.title.toLowerCase() === cn.title.toLowerCase() && cn.url !== '#'));
    if (!alreadyExists) {
      merged.push(cn);
    }
  });

  return merged;
}

// Course Code: BCS-201 | Credits: 4 (3-1-0) | Standard Reference: Kenneth Rosen - Discrete Mathematics and Its Applications
// Course Code: BCS-202 | Credits: 4 (3-1-2) | Standard Reference: Cormen, Leiserson, Rivest, Stein - Introduction to Algorithms
// Course Code: BEC-203 | Credits: 4 (3-1-0) | Standard Reference: M. Morris Mano - Digital Logic & Computer Design
// Course Code: BCS-204 | Credits: 4 (3-1-0) | Standard Reference: William Stallings - Computer Organization and Architecture
// Course Code: BCS-205 | Credits: 4 (3-1-2) | Standard Reference: E. Balagurusamy - Object Oriented Programming with C++
// Course Code: BMA-201 | Credits: 4 (3-1-0) | Standard Reference: Erwin Kreyszig - Advanced Engineering Mathematics
// Course Code: BME-201 | Credits: 4 (3-1-0) | Standard Reference: Dr. R.K. Bansal - A Textbook of Fluid Mechanics
// Course Code: BME-202 | Credits: 4 (3-1-0) | Standard Reference: S. Ramamrutham - Strength of Materials
// Course Code: BEE-201 | Credits: 4 (3-1-2) | Standard Reference: P.S. Bimbhra - Electrical Machinery
// Course Code: BEE-202 | Credits: 4 (3-1-0) | Standard Reference: Van Valkenburg - Network Analysis
// Course Code: BEC-202 | Credits: 4 (3-1-0) | Standard Reference: Alan V. Oppenheim - Signals and Systems
// Course Code: BCH-201 | Credits: 4 (3-1-0) | Standard Reference: Himmelblau - Basic Principles and Calculations in Chemical Engineering
// Course Code: BCH-202 | Credits: 4 (3-1-0) | Standard Reference: McCabe, Smith, Harriott - Unit Operations of Chemical Engineering
// Course Code: BCH-301 | Credits: 4 (3-1-0) | Standard Reference: Octave Levenspiel - Chemical Reaction Engineering
// Course Code: BCH-204 | Credits: 4 (3-1-0) | Standard Reference: J.P. Holman - Heat Transfer
// Course Code: BCH-302 | Credits: 4 (3-1-0) | Standard Reference: Robert E. Treybal - Mass-Transfer Operations
// Course Code: BCS-206 | Credits: 4 (3-1-0) | Standard Reference: Peter Linz - An Introduction to Formal Languages and Automata
// Course Code: BCS-207 | Credits: 4 (3-1-2) | Standard Reference: Silberschatz, Galvin, Gagne - Operating System Concepts
// Course Code: BCS-208 | Credits: 4 (3-1-2) | Standard Reference: Korth, Sudarshan, Silberschatz - Database System Concepts
// Course Code: BCS-301 | Credits: 4 (3-1-0) | Standard Reference: Aho, Lam, Sethi, Ullman - Compilers: Principles, Techniques, and Tools
// Course Code: BCS-302 | Credits: 4 (3-1-2) | Standard Reference: Andrew S. Tanenbaum - Computer Networks
// Course Code: BCS-209 | Credits: 4 (3-1-0) | Standard Reference: Roger S. Pressman - Software Engineering: A Practitioner's Approach
// Course Code: BCS-210 | Credits: 4 (3-1-2) | Standard Reference: Horowitz, Sahni, Rajasekaran - Fundamentals of Computer Algorithms
// Course Code: BHM-301 | Credits: 3 (3-0-0) | Standard Reference: Poornima M. Charantimath - Entrepreneurship Development
// Course Code: BHM-302 | Credits: 3 (3-0-0) | Standard Reference: Fernando A.C. - Business Ethics: An Indian Perspective
// Course Code: BCS-305 | Credits: 3 (3-0-0) | Standard Reference: Nina Godbole - Information Systems Security
// Course Code: BHM-303 | Credits: 3 (3-0-0) | Standard Reference: O.P. Khanna - Industrial Engineering and Management
// Course Code: BCS-306 | Credits: 4 (3-1-0) | Standard Reference: Rajkumar Buyya - Cloud Computing: Principles and Paradigms