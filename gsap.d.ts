// gsap.d.ts
import { GSAPStatic } from "gsap";

declare module "gsap" {
  interface GSAPStatic {
    // This covers the usage of MotionPathPlugin as a registered plugin
    motionPath: any;
  }
}

declare module "gsap/MotionPathPlugin" {
  export const MotionPathPlugin: {
    prototype: object;
    new (): object;
    // Include other properties or methods here as per your usage
  };

  // If you use the default export, you will need this line.
  export default MotionPathPlugin;
}
