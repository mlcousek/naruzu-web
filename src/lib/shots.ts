/**
 * App screenshots captured from the public beta build (0.1.0-beta.1) for the
 * User guide (src/content/docs/docs/user/img). Sources and licence: website/ASSETS.md.
 */
import devices from "../content/docs/docs/user/img/devices.webp";
import garage from "../content/docs/docs/user/img/garage.webp";
import home from "../content/docs/docs/user/img/home.webp";
import hudCompact from "../content/docs/docs/user/img/hud-compact.webp";
import hudEditor from "../content/docs/docs/user/img/hud-editor.webp";
import hudLarge from "../content/docs/docs/user/img/hud-large.webp";
import mobileGarage from "../content/docs/docs/user/img/mobile-garage.webp";
import mobileHome from "../content/docs/docs/user/img/mobile-home.webp";
import mobileRoutes from "../content/docs/docs/user/img/mobile-routes.webp";
import pauseSheet from "../content/docs/docs/user/img/pause-sheet.webp";
import progress from "../content/docs/docs/user/img/progress.webp";
import rideHud from "../content/docs/docs/user/img/ride-hud.webp";
import rideSummary from "../content/docs/docs/user/img/ride-summary.webp";
import routeDetail from "../content/docs/docs/user/img/route-detail.webp";
import routes from "../content/docs/docs/user/img/routes.webp";
import settingsDisplay from "../content/docs/docs/user/img/settings-display.webp";
import setup from "../content/docs/docs/user/img/setup.webp";
import startLine from "../content/docs/docs/user/img/start-line.webp";
import workouts from "../content/docs/docs/user/img/workouts.webp";

export const SHOTS = {
  devices,
  garage,
  home,
  "hud-compact": hudCompact,
  "hud-editor": hudEditor,
  "hud-large": hudLarge,
  "mobile-garage": mobileGarage,
  "mobile-home": mobileHome,
  "mobile-routes": mobileRoutes,
  "pause-sheet": pauseSheet,
  progress,
  "ride-hud": rideHud,
  "ride-summary": rideSummary,
  "route-detail": routeDetail,
  routes,
  "settings-display": settingsDisplay,
  setup,
  "start-line": startLine,
  workouts,
} as const;
export type ShotName = keyof typeof SHOTS;

/** Alt text for each screenshot: what it shows, in the app's own words. */
export const SHOT_ALT: Record<ShotName, string> = {
  devices:
    "The Devices screen with four cards: Smart trainer, Power source, Cadence source and Heart rate, each with a Pair button.",
  garage:
    "The Garage, titled Make it yours: a live 3D rider on a mint road bike on the left, and the Wheels category open on the right with Deep-section selected.",
  home: "The app's Home screen: a Three steps to your first ride checklist above a featured route card with distance, climbing and average grade.",
  "hud-compact":
    "The ride screen with the HUD set to Compact: a slimmer metric bar over the road.",
  "hud-editor":
    "The HUD settings open over a ride, with HUD size Compact, Normal or Large, an accent colour and panel opacity.",
  "hud-large":
    "The ride screen with the HUD set to Large: bigger numbers in the metric bar.",
  "mobile-garage":
    "The Garage on a phone-width screen, with the rider preview above the category cards.",
  "mobile-home":
    "Home on a phone-width screen, with the first-ride checklist, a featured route and a bottom navigation bar.",
  "mobile-routes":
    "The Routes tab on a phone-width screen, with route collection switches and filters.",
  "pause-sheet":
    "The pause sheet, Take a breather, with Resume, Photo mode, Finish and save, Back to menu and Discard ride.",
  progress:
    "The Progress overview with the rider's configured FTP, weight, FTP per kilogram and the statistics period switches.",
  "ride-hud":
    "A ride in progress: a rider on a road through green trees, a metric bar with power, speed, cadence, heart rate, W/kg, distance, grade and ride time, a minimap with an elevation profile, and the controls bar.",
  "ride-summary":
    "The ride summary, Ride finished, saved on this device, with Export FIT, Export ride journal, Sharing pack and Upload buttons.",
  "route-detail":
    "A route profile page with the route outline, distance, climbing, highest point and a gradient-coloured elevation profile.",
  routes:
    "The Ride Routes tab with Discover routes, Scenic rides and My routes, a Quick Ride panel and distance and climbing filters.",
  "settings-display":
    "Settings, Display and sound: theme, camera, graphics quality, atmosphere with weather and world clock, and sound.",
  setup:
    "The Ride Setup screen with Road, Workout and Trainer rows and a Load ride button.",
  "start-line":
    "The start line: route distance and climbing, an elevation profile, the power source and workout, and a Start ride button.",
  workouts:
    "The Workouts tab, Build the effort. Ride your plan., with Import workout and Create workout, search and filter chips.",
};
