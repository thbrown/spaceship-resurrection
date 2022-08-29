import { Actor } from "./Actor";

const SPACE_STATION = new Path2D(`M502.467,7.533h-153.6c-5.12,0-8.533,3.413-8.533,8.533v25.6H305.47C301.375,17.533,280.253-1,255-1
c-25.253,0-46.375,18.533-50.47,42.667h-34.863v-25.6c0-5.12-3.413-8.533-8.533-8.533H7.533C2.413,7.533-1,10.947-1,16.067
v68.267c0,5.12,3.413,8.533,8.533,8.533h153.6c5.12,0,8.533-3.413,8.533-8.533v-25.6h34.863
c3.623,21.355,20.581,38.313,41.937,41.937v10.351c-14.679,3.814-25.6,17.216-25.6,33.046v8.693
c-18.838,1.687-33.28,17.207-33.28,36.534v57.173h-17.92v-25.6c0-5.12-3.413-8.533-8.533-8.533H7.533
c-5.12,0-8.533,3.413-8.533,8.533v68.267c0,5.12,3.413,8.533,8.533,8.533h153.6c5.12,0,8.533-3.413,8.533-8.533v-25.6h17.92
v57.173c0,19.327,14.442,34.847,33.28,36.534v8.693c0,15.829,10.921,29.232,25.6,33.046v10.351
c-21.355,3.623-38.313,20.581-41.937,41.937h-34.863v-25.6c0-5.12-3.413-8.533-8.533-8.533H7.533
c-5.12,0-8.533,3.413-8.533,8.533v68.267c0,5.12,3.413,8.533,8.533,8.533h153.6c5.12,0,8.533-3.413,8.533-8.533v-25.6h34.863
C208.625,492.467,229.747,511,255,511c25.253,0,46.375-18.533,50.47-42.667h34.863v25.6c0,5.12,3.413,8.533,8.533,8.533h153.6
c5.12,0,8.533-3.413,8.533-8.533v-68.267c0-5.12-3.413-8.533-8.533-8.533h-153.6c-5.12,0-8.533,3.413-8.533,8.533v25.6H305.47
c-3.623-21.356-20.581-38.313-41.937-41.937v-10.351c14.679-3.814,25.6-17.216,25.6-33.046v-8.629
c19.253-1.289,34.133-17.016,34.133-37.451v-56.32h17.067v25.6c0,5.12,3.413,8.533,8.533,8.533h153.6
c5.12,0,8.533-3.413,8.533-8.533v-68.267c0-5.12-3.413-8.533-8.533-8.533h-153.6c-5.12,0-8.533,3.413-8.533,8.533v25.6h-17.067
v-57.173c0-19.618-14.88-35.31-34.133-36.598v-8.629c0-15.83-10.921-29.232-25.6-33.046V100.67
c21.356-3.623,38.313-20.581,41.937-41.937h34.863v25.6c0,5.12,3.413,8.533,8.533,8.533h153.6c5.12,0,8.533-3.413,8.533-8.533
V16.067C511,10.947,507.587,7.533,502.467,7.533z M152.6,246.467h-34.133V229.4H152.6V246.467z M67.267,246.467V229.4H101.4
v17.067H67.267z M101.4,263.533V280.6H67.267v-17.067H101.4z M50.2,229.4v17.067H16.067V229.4H50.2z M16.067,263.533H50.2V280.6
H16.067V263.533z M118.467,280.6v-17.067H152.6V280.6H118.467z M357.4,263.533h34.133V280.6H357.4V263.533z M442.733,263.533
V280.6H408.6v-17.067H442.733z M408.6,246.467V229.4h34.133v17.067H408.6z M459.8,280.6v-17.067h34.133V280.6H459.8z
 M493.933,246.467H459.8V229.4h34.133V246.467z M391.533,229.4v17.067H357.4V229.4H391.533z M493.933,41.667H459.8V24.6h34.133
V41.667z M408.6,41.667V24.6h34.133v17.067H408.6z M442.733,58.733V75.8H408.6V58.733H442.733z M391.533,24.6v17.067H357.4V24.6
H391.533z M152.6,41.667h-34.133V24.6H152.6V41.667z M67.267,41.667V24.6H101.4v17.067H67.267z M101.4,58.733V75.8H67.267V58.733
H101.4z M50.2,24.6v17.067H16.067V24.6H50.2z M16.067,58.733H50.2V75.8H16.067V58.733z M118.467,75.8V58.733H152.6V75.8H118.467z
 M152.6,451.267h-34.133V434.2H152.6V451.267z M67.267,451.267V434.2H101.4v17.067H67.267z M101.4,468.333V485.4H67.267v-17.067
H101.4z M50.2,434.2v17.067H16.067V434.2H50.2z M16.067,468.333H50.2V485.4H16.067V468.333z M118.467,485.4v-17.067H152.6V485.4
H118.467z M357.4,468.333h34.133V485.4H357.4V468.333z M442.733,468.333V485.4H408.6v-17.067H442.733z M408.6,451.267V434.2
h34.133v17.067H408.6z M459.8,485.4v-17.067h34.133V485.4H459.8z M493.933,451.267H459.8V434.2h34.133V451.267z M391.533,434.2
v17.067H357.4V434.2H391.533z M289.133,459.8c0,18.773-15.36,34.133-34.133,34.133c-18.773,0-34.133-15.36-34.133-34.133
c0-18.773,15.36-34.133,34.133-34.133C273.773,425.667,289.133,441.027,289.133,459.8z M272.067,365.933
c0,9.387-7.68,17.067-17.067,17.067s-17.067-7.68-17.067-17.067V357.4h34.133V365.933z M305.347,189.293v130.56
c0,11.093-8.533,19.627-19.627,19.627h-62.293c-11.093,0-19.627-8.533-19.627-19.627v-130.56
c0-11.093,8.533-19.627,19.627-19.627h5.973h51.2h5.12C296.813,169.667,305.347,178.2,305.347,189.293z M272.067,144.067v8.533
h-34.133v-8.533c0-9.387,7.68-17.067,17.067-17.067S272.067,134.68,272.067,144.067z M255,84.333
c-18.773,0-34.133-15.36-34.133-34.133S236.227,16.067,255,16.067c18.773,0,34.133,15.36,34.133,34.133
S273.773,84.333,255,84.333z M357.4,58.733h34.133V75.8H357.4V58.733z M459.8,75.8V58.733h34.133V75.8H459.8z`);

export class SpaceStation extends Actor {
  constructor(x,y, ship) {
    super();
    this.x = x;
    this.y = y;
    this.h = 126;
    this.w = 126;
    this.ship = ship;
  };

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x + this.w/2, this.y + this.h/2, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.translate(this.x, this.y);
    ctx.scale(.25, .25);
    ctx.fillStyle = "white";
    ctx.fill(SPACE_STATION);
  }

  update() {}
}