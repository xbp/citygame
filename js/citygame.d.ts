/// <reference path="../lib/pixi.d.ts" />
/// <reference path="../lib/tween.js.d.ts" />
/// <reference path="ui.d.ts" />
/// <reference path="loader.d.ts" />
/// <reference path="player.d.ts" />
/// <reference path="systems.d.ts" />
/// <reference path="utility.d.ts" />
declare var cg: any;
declare var arrayLogic: any;
declare var container: any;
declare var SCREEN_WIDTH: number, SCREEN_HEIGHT: number, TILE_WIDTH: number, TILE_HEIGHT: number, TILES: number, WORLD_WIDTH: number, WORLD_HEIGHT: number, ZOOM_LEVELS: number[];
declare class Sprite extends PIXI.Sprite {
    public type: string;
    public content: Content;
    constructor(template: any);
}
declare class GroundSprite extends Sprite {
    public cell: Cell;
    constructor(type: any, cell: any);
}
declare class ContentSprite extends Sprite {
    public content: Content;
    constructor(type: any, content: any);
}
declare class Content {
    public type: string;
    public baseType: string;
    public categoryType: string;
    public id: number;
    public sprite: Sprite;
    public cell: Cell;
    public flags: string[];
    constructor(cell: Cell, type: any, data?: any);
    public init(type: any): void;
    public applyData(data: any): void;
}
interface neighborCells {
    n: Cell;
    e: Cell;
    s: Cell;
    w: Cell;
    ne: Cell;
    nw: Cell;
    se: Cell;
    sw: Cell;
}
declare class Cell {
    public type: string;
    public sprite: Sprite;
    public content: Content;
    public gridPos: number[];
    public flags: string[];
    constructor(gridPos: any, type: any);
    public init(type: string): void;
    public getScreenPos(container: any): number[];
    public getNeighbors(diagonal?: boolean): neighborCells;
    public getArea(size: number, anchor?: string): any;
    public replace(type: string): void;
    public changeContent(type: string, update?: boolean, data?: any): void;
    public checkBuildable(type: any, checkContent?: boolean): boolean;
    public addPlant(): void;
    public updateCell(): void;
    public addContent(type: any, data?: any): Content;
    public removeContent(): void;
}
declare class Board {
    public width: number;
    public height: number;
    public cells: Cell[][];
    constructor(width?: number, height?: number);
    public init(): void;
    public makeMap(data?: any): void;
    public getCell(arr: number[]): Cell;
    public getCells(arr: number[]): Cell[];
}
declare class WorldRenderer {
    public layers: any;
    public renderTexture: PIXI.RenderTexture;
    public worldSprite: PIXI.Sprite;
    public zoomLevel: number;
    public listener: PIXI.EventTarget;
    constructor(width: any, height: any);
    public addEventListeners(listener: any): void;
    public initContainers(width: any, height: any): void;
    public initLayers(): void;
    public changeZoomLevel(level: any): void;
    public render(): void;
}
declare class Game {
    public board: Board;
    public tools: any;
    public activeTool: Tool;
    public mouseEventHandler: MouseEventHandler;
    public highlighter: Highlighter;
    public stage: PIXI.Stage;
    public renderer: any;
    public layers: any;
    public uiDrawer: UIDrawer;
    public systemsManager: SystemsManager;
    public worldRenderer: WorldRenderer;
    public eventListener: PIXI.EventTarget;
    constructor();
    public init(): void;
    public initContainers(): void;
    public initLayers(): void;
    public initTools(): void;
    public bindElements(): void;
    public bindRenderer(): void;
    public updateWorld(): void;
    public resize(): void;
    public changeTool(tool: any): void;
    public saveBoard(): void;
    public loadBoard(): void;
    public render(): void;
    public resetLayers(): void;
}
declare class SortedDisplayObjectContainer extends PIXI.DisplayObjectContainer {
    public container: PIXI.DisplayObjectContainer;
    public _sortingIndexes: number[];
    constructor(layers: number);
    public init(): void;
    public incrementIndexes(start: number): void;
    public decrementIndexes(start: number): void;
    public _addChildAt(element: PIXI.DisplayObject, index: number): void;
    public _removeChildAt(element: PIXI.DisplayObject, index: number): void;
}
declare class Scroller {
    public container: PIXI.DisplayObjectContainer;
    public width: number;
    public height: number;
    public bounds: any;
    public startPos: number[];
    public startClick: number[];
    public currZoom: number;
    public zoomField: any;
    constructor(container: PIXI.DisplayObjectContainer, bound: any);
    public startScroll(mousePos: any): void;
    public end(): void;
    public setBounds(): void;
    public getDelta(currPos: any): number[];
    public move(currPos: any): void;
    public zoom(zoomAmount: number): void;
    public deltaZoom(delta: any, scale: any): void;
    public clampEdges(): void;
}
declare class MouseEventHandler {
    public startPoint: number[];
    public currPoint: number[];
    public startCell: number[];
    public currCell: number[];
    public hoverCell: number[];
    public currAction: string;
    public scroller: Scroller;
    constructor();
    public mouseDown(event: any, targetType: string): void;
    public mouseMove(event: any, targetType: string): void;
    public mouseUp(event: any, targetType: string): void;
    public startScroll(event: any): void;
    public startZoom(event: any): void;
    public stageMove(event: any): void;
    public stageEnd(event: any): void;
    public startCellAction(event: any): void;
    public worldMove(event: any): void;
    public worldEnd(event: any): void;
    public hover(event: any): void;
}
declare class UIDrawer {
    public layer: PIXI.DisplayObjectContainer;
    public fonts: any;
    public styles: any;
    public active: UIObject;
    constructor();
    public init(): void;
    public removeActive(): void;
    public makeCellTooltip(event: any, cell: Cell, container: PIXI.DisplayObjectContainer): UIObject;
    public makeCellPopup(cell: Cell, container: PIXI.DisplayObjectContainer): void;
    public makeFadeyPopup(pos: number[], drift: number[], lifeTime: number, content: any, easing?: (k: number) => number): void;
    public clearLayer(): void;
}
declare class Highlighter {
    public currHighlighted: Sprite[];
    public tintSprites(sprites: Sprite[], color: number): void;
    public clearSprites(): void;
    public tintCells(cells: Cell[], color: number): void;
}
interface Tool {
    selectType: any;
    tintColor: number;
    activate(target: Cell[]): any;
}
declare class WaterTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class GrassTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class SandTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class SnowTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class RemoveTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class PlantTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class HouseTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare class RoadTool implements Tool {
    public selectType: any;
    public tintColor: number;
    constructor();
    public activate(target: any): void;
}
declare function getRoadConnections(target: Cell, depth: number): any;
declare function rectSelect(a: number[], b: number[]): number[];
declare function manhattanSelect(a: any, b: any): number[];
declare function arrayToPolygon(points: any): PIXI.Polygon;
declare function arrayToPoint(point: any): PIXI.Point;
declare function pineapple(): void;
declare var game: Game;
declare var loader: Loader;
