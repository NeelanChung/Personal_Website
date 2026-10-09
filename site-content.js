// Edit your portfolio content here. Add social URLs when available.
window.siteContent = {
  name: "Neelan Chung",
  social: {
    linkedin: "", // Example: https://www.linkedin.com/in/your-handle/
    github: "",   // Example: https://github.com/your-handle
    email: "neelanchung@gmail.com"
  },
  experience: [
    {
      role: "Mechanical & Materials Engineering Intern",
      organization: "Fluor Mining & Metals",
      dates: "Aug 2026 — Present",
      details: [
        "3D modelled mining infrastructure and material flows in SOLIDWORKS.",
        "Managed vendor package documentation and wrote a VBA program to rename and designate vendor files."
      ]
    },
    {
      role: "Telemetry Lead",
      organization: "ThunderBikes UBC",
      dates: "Sep 2026 — Present",
      details: [
        "Developing a telemetry system to track and log key motorcycle metrics in line with MotoStudent competition regulations.",
        "Creating and maintaining project deliverables, documenting firmware development, testing, and the final PCB design."
      ]
    },
    {
      role: "Firmware Team Member",
      organization: "ThunderBikes UBC",
      dates: "Sep 2025 — Present",
      details: ["Developed firmware for a CAN charger interface board that displays battery and charging metrics on an OLED screen."]
    }
  ],
  volunteer: [
    {
      role: "Oasis Café Volunteer",
      organization: "Tenth Church",
      // General program description; personal duties and dates are not yet supplied.
      details: ["A community café program where volunteers help run the café and create a welcoming environment for guests from diverse backgrounds."],
      source: "https://www.tenth.ca/oasisvolunteer"
    },
    {
      role: "Advocacy Volunteer",
      organization: "Arthritis Society Canada",
      details: ["An advocacy program focused on raising awareness of arthritis, amplifying policy priorities, and supporting positive changes for people living with arthritis."],
      source: "https://arthritis.ca/get-involved/volunteer/"
    }
  ],
  projects: [
    {
      title: "Smart Navigation Goggle Module",
      image: { src: "./assets/smart-goggles.png", alt: "COORA heads-up display module mounted on a pair of glasses, rendered in CAD." },
      subtitle: "COORA Smart Running Display · UBC IGEN 230 · Jan — Apr 2026",
      summary: [
        "COORA was an intensive team design project to develop a glasses-mounted heads-up display for runners. We took the system from requirements and early prototypes through subsystem development, integration, and outdoor testing. The goal was to put pace, distance, elapsed time, and navigation cues in the runner’s field of view, reducing the need to look down at a phone or watch.",
        "The project combined an Android application, embedded electronics and firmware, an optical system, and a custom 3D-printed housing. The app handled route planning and GPS calculations, sending data over Bluetooth Low Energy to an ESP32-S3. My firmware processed that data and drove the OLED, whose image was magnified through lenses and reflected into the user’s view. Making these subsystems work together required coordinating data formats, display content, optical alignment, wiring, and mechanical fit.",
        "We iterated through multiple housing and optical prototypes while working within constraints on cost, weight, battery life, field-of-view obstruction, and outdoor readability. We conducted extensive technical testing of the individual subsystems and the integrated device, checking both whether it met our engineering requirements and how well it worked during actual use.",
        "Documentation was a substantial part of the project. We maintained a team logbook and recorded design decisions, prototype iterations, testing, and results. We also wrote two in-depth technical reports—a midterm report and a final report—covering the development process, engineering rationale, verification and validation, and areas for future improvement."
      ],
      system: {
        heading: "How the app and firmware worked together",
        paragraphs: [
          "After connecting to the module, the user could plan a new route by entering start and end points, import a Google Maps link or GPX file, or start a free run. Route modes supplied navigation cues alongside time, distance, and pace; free-run mode supplied the running metrics without turn instructions.",
          "The team’s Kotlin Android app handled GPS and route calculations. For a planned route, it used Google Maps API data to identify the route and upcoming intersections. It compared the runner’s position with the next intersection, displayed the relevant manoeuvre within a distance threshold, and advanced to the next instruction as the runner reached the intersection.",
          "The phone acted as the BLE central device and the ESP32 as the peripheral. GATT services and characteristics, identified by UUIDs, provided the interface for transferring the values. During a run, the app sent updates to the module at one-second intervals. When the runner stopped moving, the metrics held their values while elapsed time continued updating.",
          "My C++ firmware handled the module side of this interface: receiving and interpreting the incoming values, keeping byte order consistent with the app, and formatting the data for the OLED over I2C. A physical push button let the user switch display screens. The phone performed the navigation calculations, while the module turned their results into readable information projected through the optics."
        ],
        figure: {
          src: "./assets/smart-goggles-app-flowchart.png",
          alt: "App flowchart: connect to the module, then plan a new route, import a Google Maps link or GPX file, or start a free run. Route modes display time, distance, pace, and direction cues; free run displays time, distance, and pace.",
          caption: "App flowchart showing how route planning, route import, and free-run mode feed the module’s display.",
          width: 1515,
          height: 670
        }
      },
      contributionIntro: "I wrote the C++ firmware running on the goggle module’s ESP32-S3 microcontroller. My firmware connects the phone’s navigation and running metrics to the small OLED display.",
      contributions: [
        "Implemented BLE communication using GATT services and characteristics to receive the app’s navigation and performance data.",
        "Developed the OLED display logic over I2C, formatting running metrics and directional cues for the compact screen and supporting a push button to switch between screens.",
        "Handled incoming data formatting and byte order so the phone and microcontroller interpreted transmitted values consistently."
      ],
      outcome: "Our technical testing included feeding known values through LightBlue to verify OLED output, checking BLE pairing and data transfer, and verifying byte-order consistency between the app and the module. At the system level, we assessed navigation on outdoor routes, battery operation, device weight, electrical safety, optical clarity, and display readability. We documented the results against our requirements. The prototype demonstrated hands-free route navigation, while bright-sunlight readability and comfort remained areas for improvement.",
      figure: {
        src: "./assets/smart-goggles-system-flowchart.png",
        alt: "COORA system flowchart: the phone app retrieves Google Maps data and sends it over Bluetooth to the ESP32 firmware, which drives the display over I2C; focal lenses and a semi-transparent acrylic lens project the display toward the eye.",
        caption: "System flowchart I created to map the data path from the phone app through the module’s firmware, display, and optics.",
        width: 1192,
        height: 770
      }
    },
    {
      title: "Vendor Package File Organization & Renaming Tool (VBA)",
      subtitle: "Fluor Mining & Metals · Excel VBA",
      image: { src: "./assets/vba/folder-structure.png", alt: "Project folder structure: package folders contain vendor PDFs and metadata workbooks, with a shared manifest workbook." },
      summary: ["I built an Excel VBA application to turn vendor document designations into readable filenames using titles and revision information from metadata workbooks. It processes a project directory containing separate vendor package folders and generates a manifest for review before changing any filenames."],
      contributionIntro: "I developed the UserForms, metadata matching, manifest generation, and file-renaming workflow. The program guides users through selecting their inputs, reviewing proposed names, correcting exceptions, and confirming each package’s renaming.",
      contributions: [
        "Separated the main controller, manifest generation, and renaming logic into VBA modules, with helper functions for matching and filename validation.",
        "Used dictionaries to map document identifiers to proposed filenames and track name and path lengths.",
        "Built a review step so users could resolve missing metadata and overly long names in the manifest before confirming the changes."
      ],
      sections: [
        {
          heading: "How it works",
          steps: [
            "Open the application workbook. The introduction form explains how to arrange package folders and metadata files.",
            "Choose the project folder containing the vendor package subfolders.",
            "Select the metadata workbook for the current package.",
            "Choose the relevant sheet and table, then identify the document designation, title, and revision columns.",
            "Generate the manifest. Each package folder has its own worksheet listing original filenames and proposed replacements.",
            "Review and correct the manifest. Resolve missing titles and highlighted filename or path-length problems before proceeding.",
            "Confirm renaming. The program applies the reviewed names, displays a completion summary, marks the package folder as renamed, and continues to the next package."
          ],
          galleryHeading: "Workflow screenshots",
          gallery: [
            { src: "./assets/vba/start-window.png", label: "1 — Introduction", caption: "The opening UserForm explains the directory structure and starts the workflow.", alt: "VBA introduction form with folder-structure instructions and a Start button." },
            { src: "./assets/vba/select-project-folder.png", label: "2 — Select the project folder", caption: "Choose the root directory containing the vendor package folders.", alt: "Folder selection dialog for the project directory." },
            { src: "./assets/vba/select-metadata-workbook.png", label: "3 — Select the metadata workbook", caption: "Choose the workbook containing vendor document titles and revision data.", alt: "File selection dialog for a vendor metadata Excel workbook." },
            { src: "./assets/vba/metadata-columns.png", label: "4 — Map the metadata columns", caption: "Select the sheet, table, designation, title, and revision fields.", alt: "Metadata UserForm with dropdowns for sheet, table, original designation, title, and revision." },
            { src: "./assets/vba/manifest-errors.png", label: "5–6 — Generate and review the manifest", caption: "Inspect suggested names and correct highlighted exceptions before renaming.", alt: "Manifest worksheet showing proposed filenames and highlighted path-length exceptions." },
            { src: "./assets/vba/confirm-renaming.png", label: "7 — Confirm renaming", caption: "The confirmation form asks the user to check the manifest before proceeding.", alt: "Confirmation UserForm with OK and Cancel buttons for renaming the current package." }
          ]
        },
        {
          heading: "Program structure",
          paragraphs: [
            "The main controller selects the project folder and loops through its package subfolders. For each unprocessed package, it calls the manifest-generation routine and then the renaming routine. Cancelling either stage stops the workflow.",
            "The manifest module opens or creates Manifest.xlsx, collects the metadata selections through UserForms, and builds dictionaries of document identifiers and proposed names. It writes a review worksheet for the package and flags unmatched files or length issues.",
            "The renaming module reads the reviewed worksheet after confirmation, validates the proposed filenames, finds the original PDFs through a FileSystemObject, and applies the replacements. It then adds a _Renamed suffix to the package folder and reports the result."
          ],
          galleryHeading: "Program flowcharts",
          gallery: [
            { src: "./assets/vba/manifest-flowchart.png", label: "Manifest generation", caption: "Read metadata, map identifiers to proposed names, and write the review manifest.", alt: "Manifest-generation flowchart showing metadata selection, dictionary creation, and worksheet output.", enlargeLabel: "Click image to enlarge" },
            { src: "./assets/vba/controller-flowchart.png", label: "Main project controller", caption: "Process each package through manifest generation and renaming, with exit paths for errors.", alt: "Main controller flowchart looping through package folders and calling manifest generation and file renaming.", enlargeLabel: "Click image to enlarge" },
            { src: "./assets/vba/rename-flowchart.png", label: "File renaming", caption: "Validate reviewed names, rename each file, and mark the package as processed.", alt: "Renaming flowchart showing manifest row iteration, filename validation, file lookup, and package completion.", enlargeLabel: "Click image to enlarge" }
          ]
        },
        {
          heading: "Challenges",
          paragraphs: [
            "Matching document identifiers was complicated by spaces, extra dashes, and underscores in vendor filenames. I wrote a helper function that extracts the numeric portion of each identifier, allowing the package filenames and metadata designations to be compared consistently.",
            "A valid metadata title could still produce a filename or full path that was too long for the workflow. I added a separate dictionary to track proposed filename and path lengths. The manifest highlights affected rows and records the lengths so the user can shorten the names before confirming the rename operation."
          ],
          figure: { src: "./assets/vba/manifest-errors.png", label: "path-length error example", caption: "Path-length exceptions highlighted in the manifest for manual correction.", alt: "Manifest with red-highlighted rows and filename and path-length warnings.", width: 1881, height: 776 }
        },
        {
          heading: "Before and after",
          galleryHeading: "File naming comparison",
          gallery: [
            { src: "./assets/vba/files-before.png", label: "Before — vendor designations", caption: "Package files named primarily by document designation and revision.", alt: "Vendor package folder before renaming, with coded document filenames." },
            { src: "./assets/vba/files-after.png", label: "After — readable document titles", caption: "The same package after applying titles from the reviewed metadata manifest.", alt: "Vendor package folder after renaming, with readable document titles." }
          ]
        }
      ]
    },
    {
      title: "ThunderBikes Telemetry Module",
      contributionHeading: "What We're doing",
      status: "In progress",
      subtitle: "ThunderBikes UBC · CAN telemetry and data logging",
      image: { src: "./assets/telemetry-system-outline.png", alt: "Planned telemetry architecture connecting the CAN bus to an MCU, USB, GPIO, BLE, and microSD storage." },
      summary: [
        "This project will develop a telemetry module for the ThunderBikes electric motorcycle, mounted near the dashboard. The module will collect vehicle and powertrain data from the CAN bus and record it to a microSD card, giving the team a way to review bike performance and operating conditions.",
        "The planned architecture centres on a microcontroller with CAN, USB, UART/USART, and SPI or SDMMC interfaces. An STM32-family device is being considered, alongside Bluetooth or BLE capability. The diagram shows the intended connections; component selection and the final implementation are still in progress.",
        "SD-card logging is the initial focus. USB or UART access and wireless transfer are possible later stages, with the storage and transmission approach to be refined as the system develops."
      ],
      contributionIntro: "As Telemetry Lead, I am defining the system scope, planning the hardware and firmware work, and maintaining the project deliverables. The outline below describes the intended development path rather than completed results.",
      contributions: [
        "Identify the required signals and their sources across the motor controller, battery management system, and vehicle CAN network.",
        "Select a suitable microcontroller or development board and plan its peripheral configuration and logging firmware.",
        "Document firmware development, testing, and the eventual PCB design as the module progresses."
      ],
      figure: {
        src: "./assets/telemetry-system-outline.png",
        alt: "Telemetry system outline: CAN data enters the MCU, which connects to USB, GPIO, a BLE antenna, and a microSD slot over SPI or SDMMC.",
        label: "telemetry system outline",
        caption: "Planned system architecture — CAN acquisition, microSD logging, and interfaces for data access and future wireless capability.",
        width: 910,
        height: 643
      },
      sections: [
        {
          heading: "Planned data collection",
          paragraphs: [
            "The motor controller will provide vehicle or wheel speed, throttle position, motor rotational speed, motor temperature, and controller or inverter temperature over CAN. The BMS will provide battery-pack temperature, voltage, and current.",
            "Coolant inlet and outlet temperatures are also in scope, but their source still needs confirmation. The scope notes consider existing thermistor measurements or data supplied by the VCU over CAN; dedicated thermistor inputs on this telemetry PCB are not currently planned."
          ]
        },
        {
          heading: "Development outline",
          steps: [
            "Choose the microcontroller and development board, then create the IOC peripheral configuration.",
            "Explore FreeRTOS and establish working microSD-card logging.",
            "Refine the high-level system design and create simulated CAN values using a separate board, such as a Blue Pill.",
            "Implement the CAN acquisition and logging logic, using simulated traffic before integrating with the bike.",
            "Develop the PCB around a CAN transceiver, a protected microSD interface, USB, and sufficient GPIO. Plan BLE antenna routing if a custom wireless implementation is selected."
          ]
        },
        {
          heading: "Future possibilities",
          paragraphs: [
            "Later work may add reading stored logs over UART or USB and streaming them wirelessly. Wireless firmware updates and using the module as a portal for a CAN bootloader are exploratory ideas, with feasibility and scope still to be established."
          ]
        }
      ]
    },
    {
      title: "Mining Infrastructure Modelling",
      subtitle: "Fluor Mining & Metals · SOLIDWORKS",
      image: { src: "./assets/mining/dump-pocket.png", alt: "Dump-pocket CAD model with an adjustable material loading point." },
      summary: [
        "At Fluor Mining & Metals, I modelled mining equipment and infrastructure in SOLIDWORKS. The work included a dump pocket feeding coarse ore into a primary crusher, a surge pocket holding crushed ore before it reaches a belt feeder and conveyor, and a rough CAT 313D excavator assembly for mine-site layout planning.",
        "For the pockets, the aim was to estimate material fill lines and live storage volume. Material settles at its angle of repose, leaving some material near the walls as the pocket empties. The models helped explore how loading-point height and position affect usable capacity and infrastructure dimensions."
      ],
      contributions: [
        "Built pocket models to estimate fill boundaries and the volume available for drawdown, accounting for material remaining near the walls.",
        "Created multiple configurations driven by global equations to vary loading-point height and position and compare the resulting material geometry.",
        "Modelled a surge-bin door assembly and created an exploded-view animation.",
        "Created a rough CAT 313D excavator assembly when supplier CAD files were unavailable, applying movement constraints from the available reference information so engineers could position it in the mine-site Navisworks model."
      ],
      gallery: [
        { src: "./assets/mining/dump-pocket.png", label: "Dump pocket", caption: "Equation-driven material fill geometry with adjustable loading points.", alt: "Dump-pocket CAD model showing material geometry, a loading-point height plane, and dimensions." },
        { src: "./assets/mining/surge-pocket-volume.png", label: "Surge pocket — volume estimation", caption: "SOLIDWORKS volume properties used to assess material drawdown.", alt: "Surge-pocket material geometry beside the SOLIDWORKS mass-properties volume readout." },
        { src: "./assets/mining/surge-bin-door.png", label: "Surge-bin door assembly", caption: "Door panels, hinges, and actuator assembly modelled in SOLIDWORKS.", alt: "CAD model of paired surge-bin door panels with hinges and an actuator." },
        { type: "video", src: "./assets/mining/door-assembly.mp4", poster: "./assets/mining/surge-bin-door.png", label: "Door assembly — exploded-view animation", caption: "Play the animation to see the assembly’s individual components." },
        { src: "./assets/mining/cat-313d-assembly.png", label: "CAT 313D — excavator assembly", caption: "SOLIDWORKS excavator assembly created for mine-site layout planning.", alt: "SOLIDWORKS excavator model showing the tracks, cab, articulated boom, hydraulic cylinders, and bucket." },
        { src: "./assets/mining/cat-313d-reference.png", label: "CAT 313D — reference working envelope", caption: "Reference diagram used to guide the excavator assembly’s movement constraints.", alt: "CAT 313D manufacturer reference diagram showing the excavator’s digging reach and working envelope." }
      ]
    }
  ],
  education: "BASc - Integrated Engineering - University of British Columbia",
  interests: "Interested in mechatronics for prosthetics and other biomedical applications, remote infrastructure engineering, and power generation.",
  availability: "Seeking biomedical and remote infrastructure / FIFO internships starting September 2027."
};
