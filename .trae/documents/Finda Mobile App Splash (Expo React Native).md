## Stack Choice & Rationale
- Expo React Native with TypeScript for fast iOS/Android delivery and reuse of web logic (Supabase, auth models, Inter font).
- Aligns with current React-based website; minimizes context switching versus Flutter.
- Uses EAS Build for store-ready binaries and OTA updates.

## Tools to Use
- `expo-router` for file-based navigation
- `expo-splash-screen` for native splash control
- `react-native-reanimated` for smooth, 60fps animations
- `expo-linear-gradient` for the teal→indigo background
- `expo-font` with `Inter` (weights 800, 500)
- `expo-image` and `react-native-svg` for the app icon and decorative dots
- `expo-secure-store` + `@supabase/supabase-js` for session bootstrap (later screens)
- `expo-status-bar` and `react-native-safe-area-context` for safe areas

## Visual References from Web
- Gradient colors and layout are already in the web hero:
  - `c:\Users\USER\Desktop\Projects\Finda\.figma\12_2\index.module.scss:27-33` (135° gradient teal→indigo)
  - Headline/tagline: `index.jsx:33-37` and font family `index.module.scss:207-235`
- We will mirror these in mobile with `LinearGradient` and `Inter` font.

## Splash Behavior Spec
- Native static splash: quick brand screen while JS runtime initializes (static background approximating gradient + centered app mark).
- In-app animated splash:
  - Background: teal `#14b8a6` → indigo `#6366f1` gradient
  - Icon: rounded square with subtle glassy highlight and border glow
  - Text: "Finda" (Inter 800, ~44–56pt) and tagline "Discover Amazing Businesses" (Inter 500)
  - Accents: short gradient line under tagline; optional faint dots matching web hero
  - Motion: fade-in background (200ms), icon scale pop (0→1.08→1.0 over 600ms, ease-out), heading slide-up + fade (400ms), shimmer highlight sweep (700ms), underline grow (300ms)
  - Runtime: total ~1.2–1.5s then auto-continue when bootstrap completes
- Transition: after fonts and Supabase client init, hide native splash and navigate to the first screen (Onboarding or Home per your choice).

## Implementation Steps
1. Initialize Expo app with TypeScript; set up `expo-router`, fonts, and status bar.
2. Configure native splash (`app.json`) with brand image; keep it simple and fast.
3. Build `Splash` component:
   - `LinearGradient` background (teal→indigo)
   - Center icon (SVG/PNG) in rounded square with overlay highlight
   - Heading + tagline using `Inter` weights; underline bar
   - Optional decorative dots in corners
   - Sequence animations with `react-native-reanimated`
4. Bootstrap flow:
   - Prevent auto-hide (`SplashScreen.preventAutoHideAsync`)
   - Load fonts and create Supabase client
   - Run minimal health checks (optional)
   - Play animation; on complete and bootstrap done, hide splash and navigate
5. Verification on devices/Simulators: iPhone (notch) and Android (varied DPIs), portrait-only during splash, safe areas respected.

## Assets & Specs Needed
- Figma file key and node IDs for the splash artboard and brand mark
- Exact icon asset (SVG or high-res PNG) and any glow/highlight layers
- Confirm gradient direction/stop percentages; current web uses 135° teal→indigo
- Font licensing confirmation for `Inter`; fallback if required
- Copy confirmation for tagline (keep "Discover Amazing Businesses"?)

## Open Questions (to reach 95% confidence)
- Do you prefer Expo React Native over Flutter? My recommendation is Expo RN for speed and web alignment.
- Should splash transition to Onboarding, Home, or Auth-first? Any logic (e.g., if logged in → Home)?
- Target animation timings: OK with ~1.2–1.5s total? Any specific cues from the video (e.g., pause, shimmer path, dot pulses)?
- Keep decorative corner dots from the web hero, or simplify for mobile? (Space and visual noise on small screens.)
- Dark mode: always dark gradient or adaptive? If adaptive, provide light variant colors.
- Minimum OS versions to support (iOS 13+ / Android 8+ OK?).
- Do we wait for live network checks on splash, or keep offline-first and defer checks to the next screen?
- Navigation library preference: OK with `expo-router`?

## Acceptance Criteria
- Pixel-consistent brand splash on both platforms with Inter fonts
- Smooth animation sequence without jank on mid-tier Android devices
- Safe areas and status bar handled; no flicker on hide
- Transition to chosen first screen under 2 seconds when bootstrap is ready
- Assets sourced from Figma; matches colors/typography used in web (`.figma/12_2` references)

## Next Step After Confirmation
- Create the Expo project, install the listed tools, fetch assets from Figma, implement and test the splash on iOS Simulator and Android Emulator, and share preview builds.